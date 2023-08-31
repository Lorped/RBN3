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
// include ('newmesg.inc.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$contatto=$request->contatto;


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

$out=[];

// 1 = cancellato dal Mittente
// 2 = cancellato dal Destinatario
// 3 = cancellato da entrambi

$MySql= "SELECT ID, IDMittente, IDDestinatario,  Testo, DATE_FORMAT( Ora , '%d %b - %H:%i'  ) AS Ora , Ora as Oraraw FROM `Sms` WHERE ( ( IDMittente = $Userid AND IDDestinatario = $contatto ) AND ( Cancellato = 0 OR Cancellato = 2 ) ) OR
									( ( IDMittente = $contatto AND IDDestinatario = $Userid ) AND ( Cancellato = 0 OR Cancellato = 1  ) )
			order by Oraraw ASC , ID ASC ";

$Result=mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
		
	$out [] = $res;
}


/* NON SONO PIU' NUONI */


$MySql= "UPDATE `Sms` SET Nuovo = 'N' WHERE IDMittente = $contatto AND IDDestinatario = $Userid  ";
$Result=mysqli_query($db, $MySql);




header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
