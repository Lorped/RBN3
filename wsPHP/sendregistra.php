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

// SETTA BASE //

switch ($newPG->Clan ){
	case 1: // toreador
	case 2: // ventrue
	case 3:	// Nosferatu
	case 6: // malkavian
	case 7:	// tremere
		$IDsetta = 1; //cama
		break;

	case 8: // lasombra
	case 9:	// tzimisce
	case 14: // ahrimanhe
		$IDsetta = 2;
		break;

	case 4:	// brujah
	case 5: // gangrel
		$IDsetta = 3; //anarch
		break;
	
	case 10: // assamiti
	case 11: // giovanni
	case 12: // ravnos
	case 13: // setiti
		$IDsetta = 4; //indip
		break;
	
	default:
		$IDsetta = 1; //cama

}


$nome=mysqli_real_escape_string($db, $newPG->Nome);
$cognome=mysqli_real_escape_string($db, $newPG->Cognome);
$email=mysqli_real_escape_string($db, $newPG->Email);
$pass=mysqli_real_escape_string($db, $newPG->Pass);

$MySql="INSERT INTO Personaggio ( Nome, Cognome, Email, Pass, DataIscrizione,
	IDNatura, IDCarattere,  IDclan, Sesso, Eta, EtaA,
 Generazione, PS, PSmax,
 FdV, FdVmax,
 IDsentiero, Valsentiero,
 Coscienza, Coraggio, SelfControl , IDsetta
 )
VALUES (
	'$nome' , '$cognome' ,'$email' , '$pass' , NOW() ,
	$newPG->Natura , $newPG->Carattere, $newPG->Clan, '$newPG->Sesso', $newPG->Eta, $newPG->EtaA,
	$gen, $ps, $ps,
	$newPG->FdVmax, $newPG->FdVmax,
	$newPG->DescSentiero, $newPG->Valsentiero,
	$newPG->Coscienza, $newPG->Coraggio, $newPG->SelfControl , $IDsetta
)";

mysqli_query($db, $MySql);
if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }

$MySql="SELECT Userid FROM Personaggio WHERE Email='$email'";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$Userid=$res['Userid'];


forEach ($listaBackground as $bg ) {
	if ( $bg->LivelloBG != 0 ) {
		$MySql="INSERT INTO Background ( Userid, IDbackground, LivelloBG ) VALUES ('$Userid', $bg->IDbackground, $bg->LivelloBG)";
		mysqli_query($db, $MySql);
		if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
	}
}
forEach ($listaSkill as $bg ) {
	if ( $bg->Livello != 0 ) {
		$MySql="INSERT INTO Skill ( Userid, IDskill, Livello ) VALUES ('$Userid', $bg->IDskill, $bg->Livello)";
		mysqli_query($db, $MySql);
		if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
	}
}
forEach ($listaAttributi as $bg ) {
		$MySql="INSERT INTO Attributi ( Userid, IDattributo, Livello ) VALUES ('$Userid', $bg->IDattributo, $bg->Livello)";
		mysqli_query($db, $MySql);
		if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
}
forEach ($listaDiscipline as $bg ) {
	if ( $bg->LivelloDisc != 0 ) {
		$MySql="INSERT INTO Discipline ( Userid, IDdisciplina, LivelloDisc, DiClan ) VALUES ('$Userid', $bg->IDdisciplina, $bg->LivelloDisc, 'S')";
		mysqli_query($db, $MySql);
		if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
	}
}

if ($taumPG->IDtaum != 0) {
	$MySql="INSERT INTO Taumaturgie ( Userid, IDtaum, Livello, Principale ) VALUES ('$Userid', $taumPG->IDtaum, $taumPG->Livello, 'S')";
	mysqli_query($db, $MySql);
	if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
}
if ($necroPG->IDnecro != 0) {
	$MySql="INSERT INTO Necromanzie ( Userid, IDnecro, Livello, Principale ) VALUES ('$Userid', $necroPG->IDnecro, $necroPG->Livello, 'S')";
	mysqli_query($db, $MySql);
	if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
}

if ($px > 0) {
	$MySql = "INSERT INTO Quest (Userid, Px, Quest, DataOpen, DataClose, Status) VALUES ($Userid , $px , 'PX da creazione Personaggio', NOW(), NOW(), 'OK' )";
	mysqli_query($db, $MySql);
}

$out = [];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
