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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$testo=$request->testo;
$IDdestinatario=$request->destinatario;
$stanza=$request->stanza;
$tipo=$request->tipo;
$locazione=$request->locazione;




$testo=mysqli_real_escape_string($db, $testo);
$locazione=mysqli_real_escape_string($db, $locazione);

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
	$Result=mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);
	$destinatario=$res['NomeCognome'];

}

$NomeCognome=mysqli_real_escape_string($db, $NomeCognome);
$destinatario=mysqli_real_escape_string($db, $destinatario);



$MySql="INSERT INTO Chat ( Stanza, IDMittente, Mittente, IDDestinatario, Destinatario, Sesso , Tipo, Testo, Locazione )
VALUES ($stanza, $Userid, '$NomeCognome' , $IDdestinatario, '$destinatario', '$Sesso', '$tipo', '$testo','$locazione')";

$Result = mysqli_query($db, $MySql);
if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db) ); }

$MySql = "UPDATE Presenti SET UltimoRefresh = NOW() WHERE Userid = $Userid ";
$Result = mysqli_query($db,$MySql);
if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db) ); }

header("HTTP/1.1 200 OK");

$out=[];
echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
