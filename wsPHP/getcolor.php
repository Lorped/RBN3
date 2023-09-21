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
 
include ('db2.inc.php'); //MYSQLI //
include ('token.php');

$id=$_GET['id'];

$out = [];
$Mysql= "SELECT *, Setta, SettaImg FROM `Zone`  
	LEFT JOIN Sette ON Zone.IDSetta = Sette.IDSetta";
$Result = mysqli_query($db, $Mysql);

while ( $res = mysqli_fetch_array($Result) ) {
	switch ($res['IDSetta']) {
		case "1":
			$color = $res['IDcontrollo'] == 'T' ? "#0570b0" : "#74a9cf";
			$color = $res['IDcontrollo'] == 'T' ? "#59191F" : "#701D24";  //prova rosso scuro
			break;
		case "2":
			$color = $res['IDcontrollo'] == 'T' ? "#d7301f" : "#fc8d59";
			$color = $res['IDcontrollo'] == 'T' ? "#47243C" : "#844C82";  //viola
			break;
		case "3":
			$color = $res['IDcontrollo'] == 'T' ? "#238b45" : "#74c476";
			$color = $res['IDcontrollo'] == 'T' ? "#00414B" : "#006a7a";  //ottanio
			break;
		case "0":
		default:
		  $color = "#fef0d9";
		  $color = "#193153";  // indigo

	  }
	$out [] = [
		"IDzona" => $res['IDzona'] ,
		"color" => $color , 
		"Nome" => $res['Nome'] ,
		"Descrizione" => $res['Descrizione'],
		"Setta" => $res['Setta'] ,
		"SettaImg" => $res['SettaImg'],
		"IDcontrollo" => $res['IDcontrollo']
	];
};




echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
