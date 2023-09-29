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
$id=$request->id;



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



$MySql="SELECT * From Oggetti WHERE IDoggetto = '$id' ";  
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result,MYSQLI_ASSOC);
$costo = $res['Costo'];
$tipo = $res['IDtipoOggetto']; 


$MySql="SELECT * From Personaggio WHERE  Userid = '$Userid' ";  
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result,MYSQLI_ASSOC);
$soldi = $res['Soldi']; 

if ( $soldi >= $costo) {
	$MySql="UPDATE Personaggio SET Soldi = Soldi - '$costo' WHERE  Userid = '$Userid' ";  
	mysqli_query($db, $MySql);

	$MySql="SELECT * FROM Possesso  WHERE  Userid = '$Userid' AND IDoggetto = '$id' AND IDtipoOggetto = '$tipo' ";
	$Result=mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result,MYSQLI_ASSOC);
	if ( $res['Quantita'] == '') {
		$MySql = "INSERT INTO Possesso (Userid, IDoggetto, IDtipoOggetto, Quantita) VALUES ( '$Userid', '$id' , '$tipo', 1)";
		mysqli_query($db, $MySql);
	} else {
		$MySql="UPDATE  Possesso SET Quantita = Quantita + 1 WHERE  Userid = '$Userid' AND IDoggetto = '$id' AND IDtipoOggetto = '$tipo' ";
		mysqli_query($db, $MySql);
	}

}



$out = [];





header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
