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

$Userid=$_GET['id'];

//$Userid= 1;

$out=[];

// 1 = cancellato dal Mittente
// 2 = cancellato dal Destinatario
// 3 = cancellato da entrambi

$MySql= "SELECT DISTINCT  (IDX) , CONCAT(Nome,' ', Cognome) as NomeCognome , UrlImg FROM 
		(	SELECT IDDestinatario IDX , Ora FROM `Sms` WHERE IDMittente = $Userid AND (Cancellato = 0 OR Cancellato = 2)
			UNION ALL
			SELECT IDMittente IDX , Ora FROM `Sms` WHERE IDDestinatario = $Userid AND (Cancellato = 0 OR Cancellato = 1)
			order by Ora DESC ) AS T
		LEFT JOIN Personaggio ON IDX = Userid ";

$Result=mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$idx = $res['IDX'];
	$MySql2 = "SELECT COUNT(*) as Nuovi FROM `Sms` WHERE IDMittente = $idx AND IDDestinatario = $Userid AND Nuovo = 'S' ";
	$Result2 = mysqli_query($db, $MySql2);
	$res2 = mysqli_fetch_array($Result2);

	$MySql3 = "SELECT DATE_FORMAT( MAX(Ora) , '%d %b - %H:%i' ) AS Ultimo  FROM `Sms` WHERE 
		(  (IDMittente = $idx AND IDDestinatario = $Userid) AND (Cancellato = 0 OR Cancellato = 1) )
		OR 
		(  (IDDestinatario = $idx AND IDMittente = $Userid) AND (Cancellato = 0 OR Cancellato = 2) ) ";
	$Result3 = mysqli_query($db, $MySql3);
	$res3 = mysqli_fetch_array($Result3);
	
	$out [] = [ 
		'IDX' => $res['IDX'],
		'NomeCognome' => $res['NomeCognome'],
		'UrlImg' => $res['UrlImg'],
		'Nuovi' => $res2['Nuovi'],
		'Ultimo' => $res3['Ultimo']
		
	];
}



header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
