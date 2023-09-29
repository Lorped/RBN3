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
$destinatario = $request->destinatario;
$quantita = $request->quantita;



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


$MySql="SELECT * FROM Possesso  WHERE  Userid = '$Userid' AND IDoggetto = '$id'  ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result,MYSQLI_ASSOC);
$IDtipoOggetto = $res['IDtipoOggetto'];
$qtyorig = $res['Quantita'];

if ( $qtyorig == '' || $qtyorig > $quantita) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
}

// vedo se già posseduto
$MySql="SELECT * FROM Possesso  WHERE  Userid = '$destinatario' AND IDoggetto = '$id'  ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result,MYSQLI_ASSOC);
$qtyold = $res['quantita'];

if ( $qtyold == '') {
	$MySql = "INSERT INTO Possesso ( Userid, IDtipoOggetto, IDoggetto, Quantita, Indossato, Usato) VALUES
		( '$destinatario' , '$IDtipoOggetto' , '$id' , '$quantita', 'N' , 'N' ) ";
	mysqli_query($db, $MySql);
} else {
	$MySql = " UPDATE Possesso SET Quantita = Quantita + $quantita   WHERE  Userid = '$destinatario' AND IDoggetto = '$id'  ";
	mysqli_query($db, $MySql);
}

if ( $qtyorig > $quantita) {
	$MySql = " UPDATE Possesso SET Quantita = Quantita - $quantita   WHERE  Userid = '$Userid' AND IDoggetto = '$id'  ";
	mysqli_query($db, $MySql);
} else {
	$MySql = " DELETE FROM Possesso  WHERE  Userid = '$Userid' AND IDoggetto = '$id'  ";
	mysqli_query($db, $MySql);
}


$MySql = "SELECT Nome FROM Oggetti WHERE IDoggetto = '$id' ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result,MYSQLI_ASSOC);
$nome= $res['Nome'];


$testo="Hai ricevuto: ".$quantita. " ".$nome." .\nFanne buon uso.";
$testo=mysqli_real_escape_string($db, $testo);

$MySql="INSERT INTO `Sms` (IDMittente, IDDestinatario, Testo) VALUES ('$Userid', '$destinatario', '$testo')";
mysqli_query($db, $MySql);




$out = [];





header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
