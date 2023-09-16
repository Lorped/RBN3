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

include ('db2.inc.php');   //MYSQLI//
include ('token.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$id=$request->id;

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




$MySql = "SELECT * from Sottobacheche WHERE IDsottob = $id";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result);

$IDbacheca = $res ['IDbacheca'];

$Nomebacheca = $res ['Nome'];
$LivelloPost = $res ['LivelloPost'];


$MySql = "SELECT * from Bacheche WHERE IDbacheca = $IDbacheca";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_row($Result);
if ($res['LivAccesso']>$MasterAdmin) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
}



$MySql4= "SELECT * from Checkmessaggiforum WHERE IDsottob = '$id' AND IDutente = '$Userid' ";
$Result4 = mysqli_query($db, $MySql4);
$res4 = mysqli_fetch_array($Result4);
$DataInSottobacheca = $res4['DataUltima'];
if ( $DataInSottobacheca == '') {
	$DataInSottobacheca = "1970-01-01 00:00:00";
}

$out_content = [];

//prima i pinned//
$MySql = "SELECT * , DATE_FORMAT(Data,'%d %b - %H:%i') as DT , DATE_FORMAT(DataReplyEdit ,'%d %b - %H:%i') as DRT , '' as status , 0 as reply from Thread WHERE IDsottobacheca = '$id' and Pinned = 1 and OP = 0 ORDER BY Data DESC";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result, MYSQLI_ASSOC) ) {

	$IDmessaggio = $res["IDmessaggio"];

	$status = '';
	$MySql3="SELECT * FROM Checkmessaggithread WHERE IDmessaggio = '$IDmessaggio' and IDutente = $Userid";
	$Result3=mysqli_query($db, $MySql3);
	$res3=mysqli_fetch_array($Result3);
	$dataInPost=$res3['DataUltima'];
	if ($dataInPost=='') {
		$dataInPost = '1970-01-01 00:00:00'; 
	}
	if ($DataInSottobacheca < $res['Data']) {
		$status='Nuovo';
	}
	if ($DataInSottobacheca > $res['Data']  && $dataInPost < $res['Data'] ) {
		$status='Non letto';
	}
	if ($dataInPost > $res['Data']  && $dataInPost < $res['DataReplyEdit'] ) {
		$status='Aggiornato';
	}
	$res['status']=$status;

	if ( $res['DataReplyEdit'] > $res['Data']){
		$res["Data"]=$res["DataReplyEdit"];
		$res["DT"]=$res["DRT"];
	}


	$MySql2 = "SELECT  count(*) as reply from Thread WHERE OP = $IDmessaggio ";
	$Result2 = mysqli_query($db, $MySql2);
	$res2 = mysqli_fetch_array($Result2, MYSQLI_ASSOC);

	
	$res['reply']=$res2['reply'];

	$out_content [] = $res;

}

//poi gli altri//
$MySql = "SELECT * , DATE_FORMAT(Data,'%d %b - %H:%i') as DT , DATE_FORMAT(DataReplyEdit ,'%d %b - %H:%i') as DRT , '' as status , 0 as reply from Thread WHERE IDsottobacheca = '$id' and Pinned = 0 and OP = 0 ORDER BY DataReplyEdit DESC";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result, MYSQLI_ASSOC) ) {

	$IDmessaggio = $res["IDmessaggio"];


	$status = '';
	$MySql3="SELECT * FROM Checkmessaggithread WHERE IDmessaggio = '$IDmessaggio' and IDutente = $Userid";
	$Result3=mysqli_query($db, $MySql3);
	$res3=mysqli_fetch_array($Result3);
	$dataInPost=$res3['DataUltima'];

	// die ( "datainsottob " . $DataInSottobacheca . " creazione post " . $res['Data'] . " data in post " . $dataInPost . " ultimo reply " . $res['DataReplyEdit'] );

	if ($dataInPost=='') {
		$dataInPost = '1970-01-01 00:00:00'; 
	}
	if ($DataInSottobacheca < $res['Data']) {
		$status='Nuovo';
	}
	if ($DataInSottobacheca > $res['Data']  && $dataInPost < $res['Data'] ) {
		$status='Non letto';
	}
	if ($dataInPost > $res['Data']  && $dataInPost < $res['DataReplyEdit'] ) {
		$status='Aggiornato';
	}
	$res['status']=$status;

	if ( $res['DataReplyEdit'] > $res['Data']){
		$res["Data"]=$res["DataReplyEdit"];
		$res["DT"]=$res["DRT"];
	}


	$MySql2 = "SELECT  count(*) as reply from Thread WHERE OP = $IDmessaggio ";
	$Result2 = mysqli_query($db, $MySql2);
	$res2 = mysqli_fetch_array($Result2, MYSQLI_ASSOC);

	
	$res['reply']=$res2['reply'];


	$out_content [] = $res;


}

$MySql= "SELECT * from Checkmessaggiforum WHERE IDsottob = '$id' AND IDutente = '$Userid' ";
$Result = mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);
if ( $res['DataUltima'] == '') {
	$MySql= "INSERT INTO Checkmessaggiforum ( IDsottob, IDutente) VALUES ( '$id' , '$Userid' ) ";
	mysqli_query($db, $MySql);
} else {
	$MySql= "UPDATE Checkmessaggiforum SET DataUltima = NOW() WHERE IDsottob = '$id' AND IDutente = '$Userid'  ";
	mysqli_query($db, $MySql);
}




$out = [
	"LivelloPost" => $LivelloPost,
	"Nome" => $Nomebacheca ,
	"content" => $out_content
];


header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
