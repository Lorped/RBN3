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



$full = FALSE;
if ( $id == $Userid || $MasterAdmin > 0 ) {
	$full = TRUE;
}


if ( ! $full ) {
	$MySql = "SELECT Nome, Cognome, DataIscrizione, URLImg, EtaA, Clan, ClanImg, Setta, SettaImg , ImgLG FROM Personaggio
	LEFT JOIN Clan ON Personaggio.IDclan = Clan.IDclan 
	LEFT JOIN Sette ON Personaggio.IDsetta = Sette.IDsetta WHERE Userid='$id'";
	$Result=mysqli_query($db, $MySql);
	$pg = mysqli_fetch_array($Result,MYSQLI_ASSOC);

	$background=[];
	$attr=[];
	$discipline=[];
	$skill=[];

}

if ( $full ) {
	$MySql = "SELECT
	Userid , Nome , Cognome , Email , Pass ,
	    DataIscrizione ,
			a1.Archetipo as Natura ,
			a2.Archetipo as Carattere ,
	 		Clan , ClanImg ,
	    Sesso , Eta , EtaA , Personaggio.Generazione , PS , PSmax , FdV , FdVmax ,
	    Valsentiero , DescSentiero ,
	    Coscienza , Coraggio , SelfControl , Personaggio.IDsalute  ,
	    daurto , aggravati , URLImg , Soldi ,
			MaxStat ,	UsoPS,
			DescSalute , ModSalute, Setta, SettaImg , ImgLG, Taumaturgo
		FROM Personaggio
			LEFT JOIN Sentieri ON Personaggio.IDsentiero = Sentieri.IDsentiero
			LEFT JOIN Clan ON Personaggio.IDclan = Clan.IDclan
			LEFT JOIN Archetipi AS a1 ON Personaggio.IDnatura = a1.IDarchetipo
			LEFT JOIN Archetipi AS a2 ON Personaggio.IDcarattere = a2.IDarchetipo
			LEFT JOIN Generazioni ON Personaggio.Generazione = Generazioni.Generazione
			LEFT JOIN Livelli_salute ON Personaggio.IDsalute = Livelli_salute.IDsalute
			LEFT JOIN Sette ON Personaggio.IDsetta = Sette.IDsetta
			WHERE Userid='$id'";
	$Result=mysqli_query($db, $MySql);
	$pg = mysqli_fetch_array($Result,MYSQLI_ASSOC);

	$MySql = "SELECT
	Attributi.IDattributo , NomeAttributo , Tipologia , Livello
	  FROM Attributi
		LEFT JOIN Attributi_main ON Attributi.IDattributo = Attributi_main.IDattributo
		WHERE Userid='$id'
		ORDER BY Attributi.IDattributo ASC";
	$Result=mysqli_query($db, $MySql);
	$attr=[];
	while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
		$attr[]=$res;
	}


	$MySql = "SELECT
	Background.IDbackground , NomeBackground , LivelloBG
	 FROM Background
		LEFT JOIN Background_main ON Background.IDbackground = Background_main.IDbackground
		WHERE Userid='$id'";
	$Result=mysqli_query($db, $MySql);
	$background=[];
	while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
		$background[]=$res;
	}



	$MySql = "SELECT
	Discipline.IDdisciplina , NomeDisc , LivelloDisc , DiClan
	 FROM Discipline
		LEFT JOIN Discipline_main ON Discipline.IDdisciplina = Discipline_main.IDdisciplina
		WHERE Userid='$id'
		ORDER BY NomeDisc";
	$Result=mysqli_query($db, $MySql);
	$discipline=[];
	while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
		$discipline[]=$res;
	}

	$MySql = "SELECT
	Skill_main.IDskill , NomeSkill , Tipologia , Livello
	  FROM Skill_main
		LEFT JOIN Skill ON Skill_main.IDskill = Skill.IDskill and Skill.Userid='$id'
		WHERE iniziale=1 OR Livello >0
		ORDER BY Skill_main.IDskill ASC";
	$Result=mysqli_query($db, $MySql);
	$skill=[];
	while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
		$skill[]=$res;
	}



}



	$out = [
		'full' => $full,
		'pg' => $pg ,
		'background' => $background,
		'attr' => $attr,
		'discipline' => $discipline,
		'skill' => $skill
	];


header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
