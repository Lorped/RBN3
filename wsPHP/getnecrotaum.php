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


$Userid=$_GET['id'];

$taum=[];
$Tprincipale=0;
$Tmaxlev=0;
$necro=[];
$Nprincipale=0;
$Nmaxlev=0;

$MySql="SELECT
	Taumaturgie.IDtaum, Livello, Principale, NomeTaum
	FROM Taumaturgie
	LEFT JOIN Taumaturgie_main ON Taumaturgie.IDtaum = Taumaturgie_main.IDtaum
	WHERE Userid = '$Userid'
	ORDER BY Principale DESC";

$Result=mysql_query($MySql);
while ($res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
	$taum [] =$res;
	/* no "principale" per le taumaturgie /*
	/*
	if ($res['Principale'] == "S") {
		$Tprincipale=$res['IDtaum'];
		$Tmaxlev=$res['Livello'];
	}
	*/
}
$MySql="SELECT LivelloDisc FROM Discipline WHERE IDdisciplina= 15 AND Userid = '$Userid'";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$Tmaxlev=$res['LivelloDisc'];


$MySql="SELECT
	Necromanzie.IDnecro, Livello, Principale,  NomeNecro
	FROM Necromanzie
	LEFT JOIN Necromanzie_main ON Necromanzie.IDnecro = Necromanzie_main.IDnecro
	WHERE Userid = '$Userid'
	ORDER BY Principale DESC";

$Result=mysql_query($MySql);
while ($res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
	$necro [] =$res;
	if ($res['Principale'] == "S") {
		$Nprincipale=$res['IDnecro'];
		$Nmaxlev=$res['Livello'];
	}
}


$newout = [
"Tprincipale" => $Tprincipale ,
"Tmaxlev" => $Tmaxlev ,
"taum" => $taum,
"Nprincipale" => $Nprincipale ,
"Nmaxlev" => $Nmaxlev ,
"necro" => $necro
];

header("HTTP/1.1 200 OK");
echo json_encode ($newout, JSON_UNESCAPED_UNICODE);


?>
