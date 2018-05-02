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
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$pxin=$res['somma'];

$MySql="SELECT sum(px) as somma FROM Logpx  WHERE Userid='$Userid' ";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$pxout=$res['somma'];

$px=$pxin-$pxout;



$MySql="SELECT MaxStat from Personaggio LEFT JOIN Generazioni ON Personaggio.Generazione = Generazioni.Generazione WHERE Userid='$Userid'";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$MaxStat=$res['MaxStat'];

$MySql="SELECT * FROM Discipline WHERE Userid='$Userid' AND IDdisciplina = '$attr' ";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$DiClan = $res['DiClan'];
$Livello = $res['LivelloDisc'];

if ( $DiClan == 'S' ) {
	$pxspesi=5*$Livello;
} else {
	$pxspesi=7*$Livello;
}

if ( $Livello < $MaxStat && $px >= $pxspesi ) {

	$MySql="UPDATE Discipline SET LivelloDisc=LivelloDisc+1 WHERE IDdisciplina='$attr' AND  Userid='$Userid' ";
	$Result=mysql_query($MySql);

	if ( $attr == 7 && $Livello < 5 ) {  // Necromanzia
		$MySql="UPDATE Necromanzie SET Livello=Livello+1 WHERE Principale='S' AND  Userid='$Userid' ";
		$Result=mysql_query($MySql);
	}
	if ( $attr == 15 && $Livello < 5 ) {  // Taumaturgia
		$MySql="UPDATE Taumaturgie SET Livello=Livello+1 WHERE Principale='S' AND  Userid='$Userid' ";
		$Result=mysql_query($MySql);
	}



	$Dati="[Disciplina] ".$nomeattr." ".$Livello." => ".($Livello+1);
	$MySql="INSERT INTO Logpx (Data, Userid, Px, Dati ) VALUES ( NOW() , '$Userid', '$pxspesi', '$Dati') ";
	$Result=mysql_query($MySql);

}

$out = [];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
