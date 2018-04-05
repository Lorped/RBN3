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

$Dove=$_GET['dove'];
$token=$_GET['token'];

if ( CheckJWT($token)  ) {
	$Userid=GetJWT($token).Userid;
} else {
	$Userid=-1;
}


$out="";

$Mysql="SELECT Padre, Entra FROM Mappa WHERE ID = $Dove";
$Results=mysql_query($Mysql);
$res=mysql_fetch_array($Results);

$Padre=$res['Padre'];
$Entra=$res['Entra'];


$Mysql="SELECT 'Padre' as Tipo , Breve , ID, NomeMappa FROM Mappa WHERE  ID = $Padre ";
$Results=mysql_query($Mysql);
while ( $res = mysql_fetch_array($Results,MYSQL_ASSOC)   ) {

	$out [] =$res;
}


$Mysql="SELECT 'Entra' as Tipo , Breve , ID, NomeMappa FROM Mappa WHERE  Entra = $Dove ";
$Results=mysql_query($Mysql);
while ( $res=mysql_fetch_row($Results,MYSQL_ASSOC) ) {

	$out [] =$res;

}


$aUserid="!".$Userid."!";
$Mysql="SELECT 'Std' as Tipo  , Breve, ID, NomeMappa FROM Mappa WHERE  Padre=$Dove and ID !=$Dove and ( Segreta != 'S'  or (Segreta = 'S'  and LOCATE('$aUserid', Invitati) != 0) ) ";
$Results=mysql_query($Mysql);
while ( $res=mysql_fetch_row($Results,MYSQL_ASSOC) ) {

	$out [] =$res;

}



if ( $Entra != 0 ) {
	$Mysql="SELECT 'Entra' as Tipo , Breve, ID, NomeMappa FROM Mappa WHERE  ID = $Entra";
	$Results=mysql_query($Mysql);
	while ( $res=mysql_fetch_row($Results,MYSQL_ASSOC) ) {

		$out [] =$res;

	}
}


echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
