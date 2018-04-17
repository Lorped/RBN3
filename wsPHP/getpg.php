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


/* $postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$id=$request->id;
*/

$id=$_GET['id'];
$token=$_GET['token'];

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
	$MySql = "SELECT Nome, Cognome, DataIscrizione, URLImg FROM Personaggio WHERE Userid='$id'";
	$Result=mysql_query($MySql);
	$res = mysql_fetch_array($Result,MYSQL_ASSOC);

	$out = [
		'full' => $full,
		'pg' => $res
	];
}

if ( $full ) {
	$MySql = "SELECT * ,
	 	a1.Archetipo as Natura ,
		a2.Archetipo as Carattere FROM Personaggio
		LEFT JOIN Sentieri ON Personaggio.IDsentiero = Sentieri.IDsentiero
		LEFT JOIN Clan ON Personaggio.IDclan = Clan.IDclan
		LEFT JOIN Archetipi AS a1 ON Personaggio.IDnatura = a1.IDarchetipo
		LEFT JOIN Archetipi AS a2 ON Personaggio.IDcarattere = a2.IDarchetipo
		WHERE Userid='$id'";
	$Result=mysql_query($MySql);
	$pg = mysql_fetch_array($Result,MYSQL_ASSOC);


	$MySql = "SELECT *  FROM Attributi
		LEFT JOIN Attributi_main ON Attributi.IDattributo = Attributi_main.IDattributo
		WHERE Userid='$id' ";
	$Result=mysql_query($MySql);
	$attr=[];
	while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC) ) {
		$attr[]=$res;
	}



	$MySql = "SELECT *  FROM Discipline
		LEFT JOIN Discipline_main ON Discipline.IDdisciplina = Discipline_main.IDdisciplina
		WHERE Userid='$id'";
	$Result=mysql_query($MySql);
	$discipline=[];
	while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC) ) {
		$discipline[]=$res;
	}

	$MySql = "SELECT *  FROM Skill_main
		LEFT JOIN Skill ON Skill_main.IDskill = Skill.IDskill and Skill.Userid='$id'";
	$Result=mysql_query($MySql);
	$skill=[];
	while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC) ) {
		$skill[]=$res;
	}


	$out = [
		'full' => $full,
		'pg' => $pg ,
		'attr' => $attr,
		'discipline' => $discipline,
		'skill' => $skill
	];
}


header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
