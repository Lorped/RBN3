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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$id=$request->id;


if ( CheckJWT ($token) ) {
	$xx=GetJWT($token);
	$payload=json_decode($xx);
	$Userid= $payload->Userid;
	$MasterAdmin= $payload->MasterAdmin;
	$NomeCognome= $payload->NomeCognome;
	$Sesso= $payload->Sesso;
} else {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
}

// 1 = cancellato dal Mittente
// 2 = cancellato dal Destinatario
// 3 = cancellato da entrambi


$MySql="SELECT * FROM `Sms` WHERE ID = $id";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);

if ( $res['IDMittente'] == $Userid ) {
	$MySql2 = "UPDATE `Sms` SET Cancellato = Cancellato + 1 WHERE ID = $id";
	$Result2=mysql_query($MySql2);

} elseif ( $res['IDDestinatario'] == $Userid ) {
	$MySql2 = "UPDATE `Sms` SET Cancellato = Cancellato + 2 WHERE ID = $id";
	$Result2=mysql_query($MySql2);
}


if (mysql_errno()) { die ( mysql_errno().": ".mysql_error() ); }
$out = [];



header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
