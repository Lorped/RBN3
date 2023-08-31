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

include ('db2.inc.php');  // MYSQLI //

$Userid=$_GET['id'];

//$Userid= 1;



$MySql="SELECT  Newmsg from Newmsg where Userid = $Userid";
$Result=mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result, MYSQLI_ASSOC);

if ($res['Newmsg'] == null ) {
	$res['Newmsg'] = 0;
}


$out = $res;

// aggiungo quelli normali //

$MySql= "SELECT COUNT(*) as c FROM  `Sms` WHERE  Nuovo = 'S' AND  IDDestinatario = $Userid  ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$n1=$res['c'];


$out['Newmsg'] +=  $n1 ;




header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
