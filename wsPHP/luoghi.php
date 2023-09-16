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

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$Dove=$request->Dove;

if ( CheckJWT($token)  ) {
	$xx=GetJWT($token);
	$payload=json_decode($xx);
	$Userid= $payload->Userid;
	$MasterAdmin= $payload->MasterAdmin;
} else {
	$Userid=-1;
	header("HTTP/1.1 401 Unauthorized");
	die ();
}


$out="";

$Mysql="SELECT Padre, Entra FROM Mappa WHERE ID = $Dove";
$Results=mysqli_query($db, $Mysql);
$res=mysqli_fetch_array($Results);

$Padre=$res['Padre'];
$Entra=$res['Entra'];


$Mysql="SELECT 'Padre' as Tipo , Breve , ID, NomeMappa FROM Mappa WHERE  ID = $Padre ";
$Results=mysqli_query($db, $Mysql);
while ( $res = mysqli_fetch_array($Results,MYSQLI_ASSOC)   ) {

	$out [] =$res;
}


$Mysql="SELECT 'Entra' as Tipo , Breve , ID, NomeMappa FROM Mappa WHERE  Entra = $Dove ";
$Results=mysqli_query($db, $Mysql);
while ( $res=mysqli_fetch_array($Results,MYSQLI_ASSOC) ) {

	$out [] =$res;

}


$aUserid="!".$Userid."!";
if ( $MasterAdmin == 0 ) {
	$Mysql="SELECT 'Std' as Tipo  , Breve, ID, NomeMappa FROM Mappa WHERE  Padre=$Dove and ID !=$Dove and ( Segreta != 'S'  or (Segreta = 'S'  and LOCATE('$aUserid', Invitati) != 0) ) ";
} else {
	$Mysql="SELECT 'Std' as Tipo  , Breve, ID, NomeMappa FROM Mappa WHERE  Padre=$Dove and ID !=$Dove  ";
}
$Results=mysqli_query($db, $Mysql);

while ( $res=mysqli_fetch_array($Results,MYSQLI_ASSOC) ) {

	$out [] =$res;

}



if ( $Entra != 0 ) {
	$Mysql="SELECT 'Entra' as Tipo , Breve, ID, NomeMappa FROM Mappa WHERE  ID = $Entra";
	$Results=mysqli_query($db, $Mysql);
	while ( $res=mysqli_fetch_array($Results,MYSQLI_ASSOC) ) {

		$out [] =$res;

	}
}


echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
