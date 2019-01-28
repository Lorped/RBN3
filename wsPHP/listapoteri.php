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
include ('dicepool.inc.php');


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


//$Userid= 1;

$out=[];

$MySql= "SELECT * FROM Discipline
	LEFT JOIN Discipline_main ON Discipline.IDdisciplina = Discipline_main.IDdisciplina
	WHERE Userid = $Userid ORDER BY NomeDisc ASC ";

$Result=mysql_query($MySql);
while ( $res=mysql_fetch_array($Result) ) {

	$NomeDisc = $res['NomeDisc'];
	$IDdisciplina=$res['IDdisciplina'];
	$LivelloDisc=$res['LivelloDisc'];
	$pot=[];

	$MySql2= "SELECT * FROM Poteri
		LEFT JOIN Poteri_main ON Poteri.IDpotere = Poteri_main.IDpotere
		WHERE Userid = $Userid AND IDdisciplina = $IDdisciplina ORDER BY LivPotere ";
	$Result2=mysql_query($MySql2);


	while ( $res2=mysql_fetch_array($Result2) ) {

		$pot[] = dicepool ( $Userid , $res2['IDpotere'] );

	}

	$outx = [
		'NomeDisc' => $NomeDisc,
		'LivelloDisc' => $LivelloDisc,
		'pot' => $pot
	];

	$out[] = $outx;


}


header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
