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
$testo=$request->testo;
$IDdestinatario=$request->destinatario;
$stanza=$request->stanza;
$tipo=$request->tipo;
$locazione=$request->locazione;




$testo=mysql_real_escape_string($testo);
$locazione=mysql_real_escape_string($locazione);

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

if ( ($tipo=="M" && $MasterAdmin <1)  || ($tipo=="A" && $MasterAdmin <2) ) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
}

$destinatario="";
if ( $IDdestinatario != "0" ) {
	$MySql="SELECT CONCAT(Nome,' ', Cognome) as NomeCognome FROM Personaggio WHERE Userid='$IDdestinatario' ";
	$Result=mysql_query($MySql);
	$res=mysql_fetch_array($Result);
	$destinatario=$res['NomeCognome'];

}

$NomeCognome=mysql_real_escape_string($NomeCognome);
$destinatario=mysql_real_escape_string($destinatario);



$MySql="INSERT INTO Chat ( Stanza, IDMittente, Mittente, IDDestinatario, Destinatario, Sesso , Tipo, Testo, Locazione )
VALUES ($stanza, $Userid, '$NomeCognome' , $IDdestinatario, '$destinatario', '$Sesso', '$tipo', '$testo','$locazione')";

$Result = mysql_query($MySql);
if (mysql_errno()) { die ( mysql_errno().": ".mysql_error() ); }

$MySql = "UPDATE Presenti SET UltimoRefresh = NOW() WHERE Userid = $Userid ";
$Result = mysql_query($MySql);
if (mysql_errno()) { die ( mysql_errno().": ".mysql_error() ); }

header("HTTP/1.1 200 OK");

$out=[];
echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
