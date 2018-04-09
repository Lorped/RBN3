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
$loc=$request->loc;
$last=$request->last;



$MasterAdmin=0;
$Userid=-1;
if ( CheckJWT ($token) ) {
	$payload=GetJWT($token);
	$Userid= $payload['Userid'];
	$MasterAdmin= $payload['MasterAdmin'];
}


$out=[];


$MySql = "SELECT count(*) FROM Chat WHERE Stanza = '$loc' ";
$Result = mysql_query($MySql);
$rs=mysql_fetch_row($Result);

if ( $rs['0'] == 0 ) { 
		
	$status = 0 ; // vuota o svuotata
		
		
} else {

	if ($last == 0 ) {

		$status = -1 ;	//gestione reverse
			
		$MySql = "SELECT * FROM Chat WHERE Stanza = '$loc' ";
		if ( $MasterAdmin != 3) {
			$MySql .=  " AND (IDDestinatario IS NULL OR IDDestinatario = '$Userid' OR IDDestinatario = '0' OR IDMittente = '$Userid') ";
		}
		$MySql .= " ORDER BY ID ASC LIMIT 0, 30 ";
		
			
	} else {
	
		$status = 1 ;	//gestione normale

		$MySql = "SELECT * FROM Chat WHERE Stanza = '$loc' ";
		if ( $MasterAdmin != 3 ) {
			$MySql .=  "AND ( IDDestinatario IS NULL OR IDDestinatario = '$Userid' OR IDDestinatario = '0' OR IDMittente = '$Userid' ) ";
		}
		$MySql .= " AND ID > '$last' ORDER BY ID ASC";
		
			
	}

	$Result = mysql_query($MySql);
	while ($res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
		if ($res['ID'] > $last) {	
			$last = $res['ID'];
		}
		$out [] =$res;	
		
	}
}

$newout = [
	"Statuschat" => $status ,
	"Listachat" => $out ,
	"Last" => $last 
];

echo json_encode ($newout, JSON_UNESCAPED_UNICODE);


?>
