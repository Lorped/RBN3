<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
}

include ('db2.inc.php');  //MYSQLI //
include ('token.php');


$clan=[];


$MySql="SELECT IDclan, NomeClan FROM Clan  WHERE Open = 1 ";
$Result=mysqli_query($db,$MySql);
while ( $res=mysqli_fetch_array($Result, MYSQLI_ASSOC) ) {
	$clan[] = $res;
}

$archetipi=[];

$MySql="SELECT * FROM Archetipi   ";
$Result=mysqli_query($db,$MySql);
while ( $res=mysqli_fetch_array($Result, MYSQLI_ASSOC) ) {
	$archetipi[] = $res;
}

$attributi=[];

$MySql="SELECT * , '1' as Livello FROM Attributi_main   ";
$Result=mysqli_query($db, $MySql);
while ( $res=mysqli_fetch_array($Result, MYSQLI_ASSOC) ) {
	$attributi[] = $res;
}

$out = [
"clan" => $clan ,
"archetipi" => $archetipi ,
"attributi" => $attributi
];

header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
