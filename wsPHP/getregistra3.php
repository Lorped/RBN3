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

include ('db.inc.php');
include ('token.php');

$IDclan=$_GET['IDclan'];

$bg=[];


$MySql="SELECT * , '0' as LivelloBG FROM Background_main WHERE iniziale = 0 ORDER BY NomeBackground";
$Result=mysql_query($MySql);
while ( $res=mysql_fetch_array($Result, MYSQL_ASSOC) ) {
	$bg[] = $res;
}

$MySql="SELECT Disc1, Disc2, Disc3 FROM Clan WHERE IDclan = '$IDclan' ";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$disc1=$res['Disc1'];
$disc2=$res['Disc2'];
$disc3=$res['Disc3'];

$disc = [];

$MySql="SELECT *, '0' as LivelloDisc FROM Discipline_main WHERE IDdisciplina IN ( '$disc1', '$disc2', '$disc3') ";
$Result=mysql_query($MySql);
while ( $res=mysql_fetch_array($Result, MYSQL_ASSOC) ) {
	$disc[] = $res;
}

$taum=[];
$necro=[];

/***
if ( $IDclan == 7 ) { // Tremere
	$MySql="SELECT *, '0' as Livello FROM Taumaturgie_main  ";
	$Result=mysql_query($MySql);
	while ( $res=mysql_fetch_array($Result, MYSQL_ASSOC) ) {
		$taum[] = $res;
	}
}
***/
if ( $IDclan == 11 ) { // Giovanni
	$MySql="SELECT *, '0' as Livello FROM Necromanzie_main  ";
	$Result=mysql_query($MySql);
	while ( $res=mysql_fetch_array($Result, MYSQL_ASSOC) ) {
		$necro[] = $res;
	}
}


$sent = [];

$MySql="SELECT *  FROM Sentieri  ";
$Result=mysql_query($MySql);
while ( $res=mysql_fetch_array($Result, MYSQL_ASSOC) ) {
	$sent[] = $res;
}


$out = [
	"bg" => $bg,
	"disc" => $disc,
	'taum' => $taum,
	'necro' => $necro,
	'sent' => $sent
];

header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
