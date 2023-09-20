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

include ('db2.inc.php');   // MYSQLI //
include ('token.php');

$Userid=$_GET['id'];


$out=[];
$pxin=0;
$pxout=0;

$MySql="SELECT sum(px) as somma FROM Quest  WHERE Userid='$Userid' AND Status='OK' ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$pxin=$res['somma'];

$MySql="SELECT sum(px) as somma FROM Logpx  WHERE Userid='$Userid' ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$pxout=$res['somma'];

$MySql="SELECT *  FROM Logpx  WHERE Userid='$Userid' ORDER BY IDlog DESC";
$Result = mysqli_query($db, $MySql);
while ($res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
	$out [] =$res;
}

$newout = [
"pxin" => $pxin ,
"pxout" => $pxout ,
"log" => $out
];

header("HTTP/1.1 200 OK");
echo json_encode ($newout, JSON_UNESCAPED_UNICODE);


?>
