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
include ('token.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$clanid=$request->clanid;



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




$MySql = "SELECT IDclan FROM Personaggio WHERE Userid = $Userid";
$Result=mysql_query($MySql);
$res = mysql_fetch_array($Result);
$myclanid = $res['IDclan'];


if ( $clanid == '') {
	$clanid = $myclanid;
}

if ( $clanid != $myclanid && ($MasterAdmin !=3 && $MasterAdmin !=2) ) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
} 

$MySql="SELECT * FROM Checkmessaggiclan WHERE Userid = $Userid and IDclan = $clanid";
$Result=mysql_query($MySql);
$res = mysql_fetch_array($Result);



$Ora=$res['UltimaData'];

if ( $Ora=='') {
	$Ora='1999-01-01';
}


$MySql="SELECT COUNT(*) as n FROM Messaggiclan WHERE IDclan = $clanid AND Ora > '$Ora' ";
$Result=mysql_query($MySql);
$res = mysql_fetch_array($Result) ;
$num = $res['n'];



$MySql= "SELECT DATE_FORMAT( MAX(Ora) , '%d %b - %H:%i' ) AS Ultimo FROM Messaggiclan WHERE IDclan = $clanid";
$Result=mysql_query($MySql);
$res = mysql_fetch_array($Result) ;
$ultimo = $res['Ultimo'];

$MySql= "SELECT * FROM Clan WHERE IDclan = $clanid";
$Result=mysql_query($MySql);
$res = mysql_fetch_array($Result) ;
$NomeClan = $res['NomeClan'];
$ClanImg = $res['ClanImg'];


$out = [
	"IDclan" => $myclanid,
	"numero" => $num,
	"ultimo" => $ultimo,
	'NomeClan' => $NomeClan,
	'ClanImg' => $ClanImg
];
	



header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
