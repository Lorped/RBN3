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

include ('db2.inc.php');   //MYSQLI//
include ('token.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$id=$request->id;

/*
$id=$_GET['id'];
$token=$_GET['token'];
*/

$MasterAdmin=0;
$Userid=-1;




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

$MySql = "SELECT * from Thread WHERE IDmessaggio = $id";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result);

$IDsottob = $res['IDsottobacheca'];
$Nomemessaggio = $res['Nome'];


$MySql = "SELECT * from Sottobacheche WHERE IDsottob = $IDsottob";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result);

$IDbacheca = $res ['IDbacheca'];
$Nomebacheca = $res ['Nome'];

$MySql = "SELECT * from Bacheche WHERE IDbacheca = $IDbacheca";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_row($Result);
if ($res['LivAccesso']>$MasterAdmin) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
}

$out_content = [];


$MySql = "SELECT * , DATE_FORMAT(Data,'%d %b - %H:%i') as DT  from Thread WHERE IDmessaggio = $id OR OP = $id ORDER BY Data ASC";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result, MYSQLI_ASSOC) ) {

	$out_content [] = $res;

}

$out = [
	"NomeM" => $Nomemessaggio ,
	"NomeB" => $Nomebacheca ,
	"content" => $out_content
];

$MySql= "SELECT * from Checkmessaggithread WHERE IDmessaggio = '$id' AND IDutente = '$Userid' ";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result);
$DataUltima = $res['DataUltima'];
if ( $DataUltima == '') {
	$MySql2 = "INSERT INTO Checkmessaggithread (IDmessaggio , IDutente) VALUES ( '$id' , '$Userid' ) ";
	mysqli_query($db, $MySql2);
	if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db) ); }
} else {
	$MySql2 = "UPDATE Checkmessaggithread SET DataUltima = NOW() WHERE IDmessaggio = '$id' AND IDutente = '$Userid'  ";
	mysqli_query($db, $MySql2);
	if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db) ); }
}


header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
