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

$Userid=$_GET['id'];

//$Userid= 1;

$out=[];

// 1 = cancellato dal Mittente
// 2 = cancellato dal Destinatario
// 3 = cancellato da entrambi

$MySql= "SELECT DISTINCT  (IDX) , CONCAT(Nome,' ', Cognome) as NomeCognome , UrlImg FROM 
		(	SELECT IDDestinatario IDX , Ora FROM `Sms` WHERE IDMittente = $Userid AND Cancellato = 0
			UNION ALL
			SELECT IDMittente IDX , Ora FROM `Sms` WHERE IDDestinatario = $Userid AND Cancellato NOT IN ( 2, 3 )
			order by Ora DESC ) AS T
		LEFT JOIN Personaggio ON IDX = Userid ";

$Result=mysql_query($MySql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$idx = $res['IDX'];
	$MySql2 = "SELECT COUNT(*) as Nuovi FROM `Sms` WHERE IDMittente = $idx AND IDDestinatario = $Userid AND Nuovo = 'S' ";
	$Result2 = mysql_query($MySql2);
	$res2 = mysql_fetch_array($Result2);

	$MySql3 = "SELECT MAX(Ora) as Ultimo FROM `Sms` WHERE (IDMittente = $idx AND IDDestinatario = $Userid) OR (IDDestinatario = $idx AND IDMittente = $Userid) ";
	$Result3 = mysql_query($MySql3);
	$res3 = mysql_fetch_array($Result3);
	
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