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
$tipo=$request->tipo;

$stanza = $request -> stanza;



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

if ( $tipo == 'on') {

    $MySql = "SELECT Oggetto.Nome from Possesso 
        LEFT JOIN Oggetti ON Oggetti.IDoggetto=Possesso.IDoggetto
        WHERE Userid = $Userid and usato ='S' ";
    $Result = mysqli_query($db, $MySql);
    $res = mysqli_fetch_array($Result);
    $nome=$res['Nome'];

    if ( $nome != '' ) {
        $esito = $NomeCognome . " rinfodera ". $nome . " e sfodera ";
    } else {
        $esito = $NomeCognome . " imbraccia ";
    }

    $MySql = "SELECT Nome from Oggetti WHERE IDoggetto = '$id' ";
    $Result = mysqli_query($db, $MySql);
    $res = mysqli_fetch_array($Result);
    $nome=$res['Nome'];
    $esito =$esito . $nome;
    

    $MySql="UPDATE  Possesso SET Usato = 'N' WHERE  Userid = '$Userid' ";
    mysqli_query($db, $MySql);
	$MySql="UPDATE  Possesso SET Usato = 'S' WHERE  Userid = '$Userid' AND IDoggetto = '$id' ";
    mysqli_query($db, $MySql);

    $MySql="INSERT INTO Chat ( Stanza, IDMittente, Mittente, IDDestinatario, Destinatario, Sesso , Tipo, Testo, Locazione )
    VALUES ($stanza, $Userid, '$NomeCognome' , 0, '' , '$Sesso', '+', '$esito', '' )";
     mysqli_query($db, $MySql);
}
if ( $tipo == 'off') {
    $MySql = "SELECT Oggetti.Nome from Possesso 
        LEFT JOIN Oggetti ON Oggetti.IDoggetto=Possesso.IDoggetto
        WHERE Userid = $Userid and Usato ='S' ";
    $Result = mysqli_query($db, $MySql);
    $res = mysqli_fetch_array($Result);
    $nome=$res['Nome'];
    

	$MySql="UPDATE  Possesso SET Usato = 'N' WHERE  Userid = '$Userid' ";
    mysqli_query($db, $MySql);

    $esito = $NomeCognome . " rinfodera ". $nome;
    $MySql="INSERT INTO Chat ( Stanza, IDMittente, Mittente, IDDestinatario, Destinatario, Sesso , Tipo, Testo, Locazione )
    VALUES ($stanza, $Userid, '$NomeCognome' , 0, '' , '$Sesso', '+', '$esito', '' )";
     mysqli_query($db, $MySql);
}



$out = [];




header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
