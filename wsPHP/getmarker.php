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

include ('db2.inc.php'); // MYSQLI //
include ('token.php');

// $Dove=$_GET['dove'];
// $token=$_GET['token'];


$out=[];

$Mysql="SELECT ID, Breve , Descrizione, latit, longit FROM Mappa WHERE (latit <> 0) ";
$Results=mysqli_query($db, $Mysql);

while ( $res = mysqli_fetch_array($Results,MYSQLI_ASSOC)   ) {

	$out [] =$res;
}



echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
