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

$email = $request->email;
$password = $request->password;

//$email = "julien@home.com";
//$password = "kli0loth"; 

$email=addslashes($email);
$password=addslashes($password);


if (isset($postdata) && $email != "" && $password !="" ) {
    
	$MySql = "SELECT * FROM Personaggio WHERE Email='$email' AND Pass='$password' ";
	$Result = mysql_query($MySql);
	
	if ( $res = mysql_fetch_array($Result)   ) {
		$Userid=$res['Userid'];
		$Nome=$res['Nome'];
		$Cognome=$res['Cognome'];
		$Email=$res['Email'];
		$NomeCognome=$Nome.' '.$Cognome;
		
		$payload = [      
			"Userid" => "$Userid",
			"NomeCognome" => "$NomeCognome",
			"Email" => "$Email"
		];
		
		$token=CreaJWT($payload);
		
		$out = [
			"Userid" => "$Userid",
			"NomeCognome" => "$NomeCognome",
			"Email" => "$Email",
			"token" => "$token"
		];
		echo json_encode ($out, JSON_UNESCAPED_UNICODE);
		
		//
		//	Do a lot of other stuff !!
		//
		
	
	} else {
		header("HTTP/1.1 401 Unauthorized");
	}
	
} else {
	header("HTTP/1.1 401 Unauthorized");
}
	
	
?>
