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

include ('db2.inc.php');   // MYSQLI //
include ('token.php');




$MySql="SELECT main , main2, description, icon, temp , DATE_FORMAT(sunrise, '%H:%i') as sunrise, DATE_FORMAT(sunset,'%H:%i') as sunset  FROM Meteo WHERE DATE_ADD(Tempo, INTERVAL 60 MINUTE) > NOW()  ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result,MYSQLI_ASSOC);

if ( mysqli_num_rows($Result) == 0 ) {
	// OLD
	$Url = "https://api.openweathermap.org/data/2.5/weather?q=Roma,IT&appid=dace55e43d30c124e29bc999a04871d3&units=metric&lang=it";
	$json = file_get_contents($Url);
	$out = json_decode($json);
	
	//print_r($out);

	$main = $out->weather[0]->main;

	switch ( $main ) {
		case 'Thunderstorm' :
			$main2 = "Temporale";
			break;
		case 'Drizzle' :
			$main2 = "Pioggerella";
			break;
		case 'Rain' :
			$main2 = "Pioggia";
			break;
		case 'Atmosphere' :
			$main2 = "Nebbia";
			break;
		case 'Clear' :
			$main2 = "Sereno";
			break;
		case 'Cloud' :
			$main2 = "Nuvolo";
			break;
		default:
			$main2 = $main;
	}

	$description = $out->weather[0]->description;
	$icon = $out->weather[0]->icon;
	$temp = intval ( $out->main->temp );
	$sunrise = $out -> sys -> sunrise;
	$sunset = $out -> sys -> sunset;

	mysqli_query($db, "DELETE FROM Meteo");  /* c'è un solo record!! */

	$MySql = "INSERT INTO Meteo ( main , main2, description, icon, temp , sunrise, sunset ) 
						VALUES ( '$main' , '$main2', '$description', '$icon', $temp , from_unixtime($sunrise), from_unixtime($sunset) )";
	$Result=mysqli_query($db, $MySql);


	  

	$out = [
		"main" => $main,
		"main2" => $main2,
		"description" => $description,
		"icon" => $icon,
		"sunrise" => date('H:i', $sunrise),
		"sunset" => date('H:i', $sunset)
	];


} else {
	$out  = $res;
}


header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
