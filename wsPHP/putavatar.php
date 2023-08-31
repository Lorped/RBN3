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



$token=$_POST['token'];

/*
$id=$_GET['id'];
$token=$_GET['token'];
*/

$MasterAdmin=0;
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


$target_path = "/web/htdocs/www.roma-by-night.it/home/RBN3/assets/imgs/";
$filename=urlencode ( basename( $_FILES['fileKey']['name']) );

$ext = pathinfo($filename, PATHINFO_EXTENSION);

$newfile=$target_path.$Userid.'.'.$ext;

/*
header("HTTP/1.1 200 OK");
$xx=getcwd();
$out=['rc' => $rc, 'old' => $_FILES['fileKey']['tmp_name'], 'pwd' => $xx  ];
echo json_encode ($out, JSON_UNESCAPED_UNICODE);
die();
*/

$rc=move_uploaded_file($_FILES['fileKey']['tmp_name'], $newfile);

$target_path = "imgs/";
$newfile=$target_path.$Userid.'.'.$ext;


$MySql="UPDATE Personaggio SET URLImg = '$newfile' WHERE Userid = '$Userid' ";
$Result=mysqli_query($db, $MySql);

header("HTTP/1.1 200 OK");
$out=[];

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
