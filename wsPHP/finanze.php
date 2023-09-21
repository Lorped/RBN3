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

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;



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

$out = [];
$balance = [];

$livrisorse = 0 ;
$periodico = 0;
$cash = 0 ;

// RISORSE cash
$MySql = "SELECT Soldi FROM Personaggio WHERE Userid = '$Userid' ";  
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$cash = $res['Soldi'];

// RISORSE
$MySql = "SELECT * FROM Background WHERE Userid = '$Userid' and IDbackground = 10";  
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
if ( $res['LivelloBG'] != '') {

	$livrisorse = $res['LivelloBG'];

	$MySql2 = "SELECT * from Risorse where livello = '$livrisorse'";
	$Result2 = mysqli_query($db, $MySql2);
	$res2 = mysqli_fetch_array($Result2);
	$periodico = $res2['periodico'];
}

$MySql = "SELECT * FROM `Background` 
	LEFT JOIN Finanza ON Background.IDbackground = Finanza.IDbackground
	LEFT JOIN Background_main ON Background.IDbackground = Background_main.IDbackground
	WHERE Userid = '$Userid' ";
$Result = mysqli_query($db, $MySql);
while ($res = mysqli_fetch_array($Result)) {

	if ($res['valore'] != '') {
		$bal = [
			'nome' => $res['NomeBackground'],
			'livello' => $res['LivelloBG'],
			'mensile' => $res['valore'] * pow( 2 , $res['LivelloBG'] ),		
		];

		$balance [] = $bal;
	}

}

$out = [
	'cash' => $cash,
	'risorse' => $livrisorse,
	'entrate' => $periodico,
	'mybalance' => $balance
];





header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
