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

include ('db2.inc.php');   //MYSQLI//
include ('token.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;




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



$MySql = "SELECT * from Bacheche WHERE LivAccesso <= $MasterAdmin";

$Result = mysqli_query($db, $MySql);

while ( $res = mysqli_fetch_array($Result) ) {

	$IDbacheca = $res['IDbacheca'];

	$sottob = [];

	$MySql2 = "SELECT * , DATE_FORMAT(UltimoInserimento,'%d %b - %H:%i') as UI from Sottobacheche WHERE IDbacheca = $IDbacheca";
	$Result2 = mysqli_query($db, $MySql2);
	while ($res2 = mysqli_fetch_array($Result2, MYSQLI_ASSOC)) {
		
		$sottobx=$res2['IDsottob'];

		$MySql3 = "SELECT count(*) as c FROM Thread WHERE IDsottobacheca = $sottobx AND OP = 0";
		$Result3 = mysqli_query($db, $MySql3);
		$res3 = mysqli_fetch_array($Result3);
		$numth = $res3['c'];

		// CALCOLO NUOVI
		$MySql4= "SELECT * from Checkmessaggiforum WHERE IDsottob = '$sottobx' AND IDutente = '$Userid' ";
		$Result4 = mysqli_query($db, $MySql4);
		$res4 = mysqli_fetch_array($Result4);
		$DataUltima = $res4['DataUltima'];
		if ( $DataUltima == '') {
			$DataUltima = "1970-01-01 00:00:00";
		}

		$MySql5 = "SELECT count(*) as c from Thread WHERE IDsottobacheca = '$sottobx' AND OP = 0 AND Data > '$DataUltima' ";
		$Result5 = mysqli_query($db, $MySql5);
		$res5 = mysqli_fetch_array($Result5);

		$nuoviThreadPost = $res5['c'] ;
		//

		$newsottob = [
			'IDsottob' => $res2['IDsottob'],
			'IDbacheca' => $res2['IDbacheca'],
			'Nome' => $res2['Nome'],
			'LivelloPost' => $res2['LivelloPost'],
			'UltimoInserimento' => $res2['UI'],
			'NumThread' => $numth,
			'Nuovi' => $nuoviThreadPost
		];

		$sottob[] = $newsottob;
	}

	$newb = [
		'IDbacheca' => $res['IDbacheca'],
		'Nome' => $res['Nome'],
		'LivAccesso' => $res['LivAccesso'],
		'icon' => $res['icon'],
		'Sottobacheche' => $sottob
	];

	$out [] = $newb;


}




header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
