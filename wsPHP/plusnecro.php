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

include ('db2.inc.php');  //MYSQLI //
include ('token.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$attr=$request->y;
$nomeattr=$request->z;

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

$pxin=0;
$pxout=0;
$px=0;

$MySql="SELECT sum(px) as somma FROM Quest  WHERE Userid='$Userid' AND Status='OK' ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$pxin=$res['somma'];

$MySql="SELECT sum(px) as somma FROM Logpx  WHERE Userid='$Userid' ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$pxout=$res['somma'];

$px=$pxin-$pxout;



$MySql="SELECT Livello FROM Necromanzie	WHERE Userid='$Userid' AND Principale = 'S' ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$Tmaxlev=$res['Livello'];

$MySql="SELECT Livello FROM Necromanzie	WHERE Userid='$Userid' AND IDtaum = '$attr' ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
$Livello=$res['Livello'];


if ( (($Tmaxlev == 5 && $Livello <5 )||($Tmaxlev < 5 && $Livello+1 < $Tmaxlev  ))&& $px >= $Livello*4  ) {

	$MySql="UPDATE Necromanzie SET Livello=Livello+1 WHERE IDtaum='$attr' AND Userid='$Userid' ";
	$Result=mysqli_query($db, $MySql);

	$pxspesi=4*$Livello;
	$Dati="[Necromanzia] ".$nomeattr." ".$Livello." => ".($Livello+1);
	$MySql="INSERT INTO Logpx (Data, Userid, Px, Dati ) VALUES ( NOW() , '$Userid', '$pxspesi', '$Dati') ";
	$Result=mysqli_query($db, $MySql);

}

$out = [];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
