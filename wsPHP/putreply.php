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

include ('db2.inc.php');
include ('token.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$testo=$request->testo;
$id=$request->id;

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


$out=[];

$MySql="SELECT * FROM Thread  WHERE IDmessaggio='$id' ";
$Result=mysqli_query($db,$MySql);
$res=mysqli_fetch_array($Result);

$chiuso=$res['Chiuso'];
$idsottob=$res['IDsottobacheca'];

$MySql="SELECT * FROM Sottobacheche  WHERE IDsottob='$idsottob' ";
$Result=mysqli_query($db,$MySql);
$res=mysqli_fetch_array($Result);

if ( $res['LivelloPost'] > $MasterAdmin || $chiuso == 1) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
} 

$testo=mysqli_real_escape_string($db, $testo);

$MySql = "INSERT INTO Thread  ( IDsottobacheca, Utente, IDutente,  Testo, OP) VALUES
		( '$idsottob' , '$NomeCognome' , '$Userid',  '$testo' , '$id' )";
mysqli_query($db, $MySql);
if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }

$MySql = "UPDATE Sottobacheche SET UltimoInserimento = NOW() WHERE IDsottob='$idsottob' ";
mysqli_query($db, $MySql);
if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }

$MySql = "UPDATE Thread SET DataReplyEdit  = NOW() WHERE IDmessaggio='$id' ";
mysqli_query($db, $MySql);

header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
