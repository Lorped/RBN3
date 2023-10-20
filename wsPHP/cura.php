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

$stanza=$request->stanza;


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





$MySql = "SELECT IDsalute, aggravati, daurto, PS ,  UsoPS FROM Personaggio 
	LEFT join Generazioni ON Personaggio.Generazione = Generazioni.Generazione
	WHERE Userid = $Userid";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result,MYSQLI_ASSOC);

$IDsalute = $res['IDsalute'];

if ( $IDsalute < 0 ) {
	$out = [];
	header("HTTP/1.1 200 OK");
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die();  // nessuna cura da torpore o peggio
}

$PS = $res['PS'];
$UsoPS = $res['UsoPS'];

if ( $PS > $UsoPS ) {
	$disponibili = $UsoPS;
} else {
	$disponibili = $PS -1 ;
}

$daurto = $res['daurto'];
$aggravati = $res['aggravati'];
$letali = 7 - $IDsalute - $daurto - $aggravati;

// curo i danni da urto

$esito = $NomeCognome . " usa la Potenza del Sangue per curare ";

$newidsalute = $IDsalute ;

if ( $daurto > 0 ) {
	if (  $daurto <= 2*$disponibili) {

		
		$newidsalute = $newidsalute + $daurto ;
		$newdaurto = 0 ;
		$usati = ceil ( $daurto/2  ) ;
		$daurtocurati = $daurto;
		$disponibili = $disponibili - $usati;

		
	} else {
		
		$usati = $disponibili;
		$disponibili = 0;
		$newdaurto = $daurto - 2* $usati;
		$newidsalute = $newidsalute + 2* $usati;
		$daurtocurati = $daurto - $newdaurto;


	}

	$esito = $esito . $daurtocurati  . " danni da urto" ;
	
}

if ( $letali > 0 && $disponibili > 0 ) {

	if ( $letali <= $disponibili) {
		$newidsalute = $newidsalute + $letali ;
		$newletali = 0 ;
		$usati = $usati + $letali;
		$letalicurati = $letali;
		$disponibili = $disponibili - $letali;

	} else {
		$letalicurati = $disponibili;
		$newletali = $letali - $letalicurati;
		$usati = $usati + $disponibili;
		$disponibili = 0;
		$newidsalute = $newidsalute + $letalicurati;
		
	}

	if ( $daurtocurati > 0 ) {
		$esito = $esito . " e ";	
	}
	$esito = $esito . $letalicurati  . " danni letali" ;
}
 


$MySql = "UPDATE Personaggio SET IDsalute = $newidsalute , daurto = $newdaurto , PS = PS - $usati WHERE Userid = $Userid";
mysqli_query($db, $MySql);

$esito = $esito . ">>". $MySql . "<<";

$MySql="INSERT INTO Chat ( Stanza, IDMittente, Mittente, IDDestinatario, Destinatario, Sesso , Tipo, Testo, Locazione )
VALUES ($stanza, $Userid, '$NomeCognome' , 0, '' , '$Sesso', '+', '$esito', '' )";
mysqli_query($db, $MySql);

$out = [
    'esito' => $esito,
	'usati' => $usati
    ];



header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);





?>