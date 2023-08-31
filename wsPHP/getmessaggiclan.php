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

include ('db2.inc.php');     // MYSQLI //
include ('token.php');
include ('newmesg.inc.php');


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
$Result=mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result);
$myclanid = $res['IDclan'];

if ( $clanid != $myclanid && ($MasterAdmin !=3 && $MasterAdmin !=2) ) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
} 


$out = [];

$MySql="SELECT ID, Messaggiclan.IDclan, IDMittente, Ora , Testo , CONCAT(Nome,' ',Cognome) as Nomemittente , URLImg FROM Messaggiclan 
LEFT JOIN Personaggio on IDMittente = Userid 
WHERE Messaggiclan.IDclan = $clanid";
$Result=mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC) ){
	$out [] =$res;
};



$MySql="SELECT COUNT(*) as n FROM Checkmessaggiclan WHERE Userid = $Userid and IDclan = $clanid";
$Result=mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result);

if ( $res['n'] != 0 ) {
	$MySql="UPDATE  Checkmessaggiclan SET UltimaData = NOW() WHERE Userid = $Userid and IDclan = $clanid";
	$Result=mysqli_query($db, $MySql);
} else {
	$MySql="INSERT INTO  Checkmessaggiclan (Userid, IDclan) VALUES ( $Userid, $clanid )";
	$Result=mysqli_query($db, $MySql);
}

$MySql="SELECT COUNT(*) as c from Newmsg where Userid = $Userid";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
if ($res['c']==0) {
	$MySql = "INSERT INTO Newmsg (Userid, Newmsg) VALUES ($Userid, $ntot)";
}else {
	$MySql = "UPDATE Newmsg SET Newmsg = 0 WHERE Userid = $Userid";
}
$Result=mysqli_query($db, $MySql);







header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
