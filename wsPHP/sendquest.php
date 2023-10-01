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

include ('db2.inc.php');
include ('token.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$quest=$request->quest;
$px=$request->px;
$player=$request->player;

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

if ( $MasterAdmin == 0 ) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
}



$quest = mysqli_real_escape_string($db, $quest);
$NomeCognome = mysqli_real_escape_string($db, $NomeCognome);

$MySql="INSERT INTO Quest ( Quest , MasterOpen , Px, Userid ) VALUES
	('$quest' , '$NomeCognome' , $px , '$player' ) ";
mysqli_query($db,$MySql);

$MySql="SELECT * FROM Quest WHERE Quest = '$quest' AND MasterOpen = '$NomeCognome' AND Px=$px AND Userid= '$player' ";
$Result = mysqli_query($db,$MySql);
$res=mysqli_fetch_array($Result,MYSQLI_ASSOC);
$out = $res;





$testo="Ti è stata assegnata una nuova Quest.\nContattaci per eventuali delucidazioni su come compleatarla.";
$testo=mysqli_real_escape_string($db, $testo);

$MySql="INSERT INTO `Sms` (IDMittente, IDDestinatario, Testo) VALUES ('$Userid', '$player', '$testo')";
mysqli_query($db, $MySql);





header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
