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
$request = json_decode($postdata) -> myobj;


$newPG = $request -> newPG;


$listaBackground = $request -> listaBackground;
$listaDiscipline = $request -> listaDiscipline;
$listaAttributi = $request -> listaAttributi;
$listaSkill = $request -> listaSkill;
$necroPG = $request -> necroPG;
$taumPG = $request -> taumPG;
$px = $request -> px;

$generazionebg=0;




forEach ($listaBackground as $bg ) {

	if ( $bg->IDbackground == 5) { // Generazione
		$generazionebg = $bg -> LivelloBG;
	}
}

$gen=0;
$gen=13-(int)$generazionebg;
$ps=10+(int)$generazionebg;

/*
$taumaturgo = 0;
if ( IDclan == 7 ) {
	$taumaturgo = 1;
}
*/



$nome=mysql_real_escape_string($newPG->Nome);
$cognome=mysql_real_escape_string($newPG->Cognome);
$email=mysql_real_escape_string($newPG->Email);
$pass=mysql_real_escape_string($newPG->Pass);

$MySql="INSERT INTO Personaggio ( Nome, Cognome, Email, Pass, DataIscrizione,
	IDNatura, IDCarattere,  IDclan, Sesso, Eta, EtaA,
 Generazione, PS, PSmax,
 FdV, FdVmax,
 IDsentiero, Valsentiero,
 Coscienza, Coraggio, SelfControl
 )
VALUES (
	'$nome' , '$cognome' ,'$email' , '$pass' , NOW() ,
	$newPG->Natura , $newPG->Carattere, $newPG->Clan, '$newPG->Sesso', $newPG->Eta, $newPG->EtaA,
	$gen, $ps, $ps,
	$newPG->FdVmax, $newPG->FdVmax,
	$newPG->DescSentiero, $newPG->Valsentiero,
	$newPG->Coscienza, $newPG->Coraggio, $newPG->SelfControl
)";

mysql_query($MySql);
if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }

$MySql="SELECT Userid FROM Personaggio WHERE Email='$email'";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$Userid=$res['Userid'];


forEach ($listaBackground as $bg ) {
	if ( $bg->LivelloBG != 0 ) {
		$MySql="INSERT INTO Background ( Userid, IDbackground, LivelloBG ) VALUES ('$Userid', $bg->IDbackground, $bg->LivelloBG)";
		mysql_query($MySql);
		if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
	}
}
forEach ($listaSkill as $bg ) {
	if ( $bg->Livello != 0 ) {
		$MySql="INSERT INTO Skill ( Userid, IDskill, Livello ) VALUES ('$Userid', $bg->IDskill, $bg->Livello)";
		mysql_query($MySql);
		if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
	}
}
forEach ($listaAttributi as $bg ) {
		$MySql="INSERT INTO Attributi ( Userid, IDattributo, Livello ) VALUES ('$Userid', $bg->IDattributo, $bg->Livello)";
		mysql_query($MySql);
		if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
}
forEach ($listaDiscipline as $bg ) {
	if ( $bg->LivelloDisc != 0 ) {
		$MySql="INSERT INTO Discipline ( Userid, IDdisciplina, LivelloDisc, DiClan ) VALUES ('$Userid', $bg->IDdisciplina, $bg->LivelloDisc, 'S')";
		mysql_query($MySql);
		if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
	}
}

if ($taumPG->IDtaum != 0) {
	$MySql="INSERT INTO Taumaturgie ( Userid, IDtaum, Livello, Principale ) VALUES ('$Userid', $taumPG->IDtaum, $taumPG->Livello, 'S')";
	mysql_query($MySql);
	if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
}
if ($necroPG->IDnecro != 0) {
	$MySql="INSERT INTO Necromanzie ( Userid, IDnecro, Livello, Principale ) VALUES ('$Userid', $necroPG->IDnecro, $necroPG->Livello, 'S')";
	mysql_query($MySql);
	if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
}

$out = [];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
