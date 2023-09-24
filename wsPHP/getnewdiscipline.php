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

include ('db2.inc.php'); //MYSQLI//
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


$out=[];

$MySql="SELECT Taumaturgo FROM Personaggio WHERE Userid = '$Userid' ";
$Result=mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result,MYSQLI_ASSOC);

$taumaturgo = $res ['Taumaturgo'];

if ( $taumaturgo == 1 ){
	$MySql = "SELECT
	Discipline_main.IDdisciplina , NomeDisc, DiClan
	FROM Discipline_main
	LEFT JOIN Discipline ON Discipline_main.IDdisciplina = Discipline.IDdisciplina AND Userid = '$id'
	WHERE  LivelloDisc IS NULL AND (Acquisibile = 1  OR Discipline_main.IDdisciplina = 15) ";
} else {
	$MySql = "SELECT
		Discipline_main.IDdisciplina , NomeDisc, DiClan
		FROM Discipline_main
		LEFT JOIN Discipline ON Discipline_main.IDdisciplina = Discipline.IDdisciplina AND Userid = '$id'
		WHERE  LivelloDisc IS NULL AND Acquisibile = 1";

}



$Result=mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
	$testdisc=$res['IDdisciplina'];
	$MySql2="SELECT * FROM Personaggio LEFT JOIN Clan ON Personaggio.IDclan=Clan.IDclan
		WHERE Userid='$id' AND ( Disc1 = '$testdisc' OR Disc2 = '$testdisc' OR Disc3 = '$testdisc' ) ";
	$Result2=mysqli_query($db, $MySql2);
	if ( $res2=mysqli_fetch_array($Result2) ) {
		$res['DiClan'] = 'S';
	} else {
		$res['DiClan'] = 'N';
	}
	$out[]=$res;
}


header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
