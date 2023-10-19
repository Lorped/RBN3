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
 
include ('db2.inc.php');  // MYSQLI //
include ('token.php');
include ('dado.inc.php');
include ('dicepool.inc.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;

$IDattributo=$request->IDattributo;
$IDskill=$request->IDskill;
$difficolta=$request->difficolta;

$stanza = $request -> stanza;



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

/*
$Userid = 1 ;
$IDattributo = 2 ;
$IDskill = 1 ;
$difficolta = 6; 
$stanza = 23 ;
*/


$dp = 0;




$dp = dicepool($Userid, $IDattributo, $IDskill, '');



if ( $IDattributo == 2) {  //DESTREZZA
    $MySql="SELECT LivelloDisc FROM Discipline WHERE IDdisciplina = 16 AND Userid =$Userid"; 
    $Request=mysqli_query($db, $MySql);
    $res=mysqli_fetch_array($Request);
    $vel = $res['LivelloDisc']; 
    $dp = $dp + $vel;
}



$esito = $NomeCognome . " effettua un check su ";

$MySql= "SELECT * FROM Attributi_main WHERE IDattributo = $IDattributo ";
$Result = mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);

$esito = $esito . $res['NomeAttributo'];



if ( $IDskill != 0) {
    $MySql= "SELECT * FROM Skill_main WHERE IDskill = $IDskill ";
    $Result = mysqli_query($db, $MySql);
    $res=mysqli_fetch_array($Result);
    $esito = $esito . " e " . $res['NomeSkill'];
}

$esito = $esito . " a difficoltà ". $difficolta;



$ee = dado($dp, $difficolta, false);
$esito = $esito .  $ee['esito'];



$MySql="INSERT INTO Chat ( Stanza, IDMittente, Mittente, IDDestinatario, Destinatario, Sesso , Tipo, Testo, Locazione )
VALUES ($stanza, $Userid, '$NomeCognome' , 0, '' , '$Sesso', '+', '$esito', '' )";
mysqli_query($db, $MySql);

$out = [
    'esito' => $esito
    ];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);





?>