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


$Userid= 1;

$out=[];

$MySql= "SELECT * FROM Discipline
	LEFT JOIN Discipline_main ON Discipline.IDdisciplina = Discipline_main.IDdisciplina
	WHERE Userid = $Userid ORDER BY NomeDisc ASC ";

$disc=[];
$Result=mysql_query($MySql);
while ( $res=mysql_fetch_array($Result) ) {

	$NomeDisc = $res['NomeDisc'];
	$IDdisciplina=$res['IDdisciplina'];
	$LivelloDisc=$res['LivelloDisc'];
	$numpresi = 0 ;

	$MySql2= "SELECT count(*) as c FROM Poteri
		WHERE Userid = $Userid AND IDpotere IN ( SELECT IDpotere FROM Poteri_main WHERE IDdisciplina = $IDdisciplina)  ";
	$Result2=mysql_query($MySql2);
	$res2=mysql_fetch_array($Result2);
	$numpresi = $res2['c'] ;


	$MySql2= "SELECT * FROM Poteri_main
		WHERE IDdisciplina = $IDdisciplina ORDER BY LivPotere ";
	$Result2=mysql_query($MySql2);

	$pot=[];


	while ( $res2=mysql_fetch_array($Result2) ) {

		$IDpotere = $res2['IDpotere'];
		$NomePotere = $res2['NomePotere'];
		$LivPotere = $res2['LivPotere'];
		$IDAmalgama = $res2['IDAmalgama'];
		$accessibile = 1 ;
		$bloccato = 0 ;

		if ($LivPotere > $LivelloDisc ) {
			$accessibile = 0;
		}

		if ($IDAmalgama) {
			$LivAmalgama = $res2['LivAmalgama'];
			$MySql3="SELECT * FROM Discipline WHERE IDdisciplina = $IDAmalgama
				AND LivelloDisc >= $LivAmalgama AND Userid = $Userid";

			$Result3=mysql_query($MySql3);
			if ($res3=mysql_fetch_array($Result3) ) {
				// ok
			} else {
				$accessibile = 0 ;
				$bloccato = 1 ;
			}
		}

		$preso = 0 ;
		$MySql4="SELECT * from Poteri WHERE IDpotere = $IDpotere AND Userid = $Userid";
		$Result4=mysql_query($MySql4);
		if ($res4=mysql_fetch_array($Result4) ) {
			$preso = 1 ;
			$accessibile = 0 ;
		}

		if ( $numpresi == $LivelloDisc ) {
			$accessibile = 0 ;
		}

		$potx = [
			'IDpotere' => $IDpotere,
			'NomePotere' => $NomePotere,
			'LivPotere' => $LivPotere,
			'preso'	=> $preso,
			'accessibile' => $accessibile,
			'bloccato' => $bloccato
		];

		$pot[] = $potx;
	}

	$discx = [
		'NomeDisc' => $NomeDisc,
		'LivelloDisc' => $LivelloDisc,
		'numpresi' => $numpresi,
		'pot' => $pot
	];

	$disc[] = $discx;
}


header("HTTP/1.1 200 OK");

echo json_encode ($disc, JSON_UNESCAPED_UNICODE);
?>
