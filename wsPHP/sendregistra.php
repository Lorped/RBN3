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
$request = json_decode($postdata)->myobj;


$newPG = $request->newPG;



$listaBackground = $request->listaBackground;
$listaDiscipline = $request->listaDiscipline;
$listaSkill = $request->listaSkill;
$necroPG = $request->necroPG;
$taumPG = $request->taumPG;

$generazionebg=0;




forEach ($listaBackground as $bg ) {

	if ( $bg->IDbackground == 5) { // Generazione
		$generazionebg=$bg->LivelloBG;
	}
}

$gen=0;
$gen=13-(int)$generazionebg;
$ps=10+(int)$generazionebg;



$MySql="INSERT INTO Personaggio ( Nome, Cognome, Email, Pass, DataIscrizione,
 IDNatura, IDCarattere,  IDclan, Sesso, Eta, EtaA,
 Generazione, PS, PSmax,
 FdV, FdVmax,
 IDsentiero, Valsentiero,
 Coscienza, Coraggio, SelfControl
 )
VALUES (
	'$newPG->Nome' , '$newPG->Cognome' ,'$newPG->Email' , '$newPG->Pass' , NOW() ,
	$newPG->Natura , $newPG->Carattere, $newPG->Clan, '$newPG->Sesso', $newPG->Eta, $newPG->EtaA,
	$gen, $ps, $ps,
	$newPG->FdVmax, $newPG->FdVmax,
	$newPG->DescSentiero, $newPG->Valsentiero,
	$newPG->Coscienza, $newPG->Coraggio, $newPG->SelfControl
)";

mysql_query($MySql);
if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }


$out = [];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
