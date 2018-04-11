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

// $email = "julien@home.com";
// $password = "kli0loth";

$email=mysql_real_escape_string($email);
$password=mysql_real_escape_string($password);


if (isset($postdata) && $email != "" && $password !="" ) {

	$MySql = "SELECT * FROM Personaggio WHERE Email='$email' AND Pass='$password' ";
	$Result = mysql_query($MySql);

	if ( $res = mysql_fetch_array($Result)   ) {
		$Userid=$res['Userid'];
		$Nome=$res['Nome'];
		$Cognome=$res['Cognome'];
		$Email=$res['Email'];
		$NomeCognome=$Nome.' '.$Cognome;
		$Sesso=$res['Sesso'];
		$MasterAdmin=$res['MasterAdmin'];

		$payload = [
			"Userid" => "$Userid",
			"NomeCognome" => "$NomeCognome",
			"Email" => "$Email",
			"MasterAdmin" => "$MasterAdmin",
			"Sesso" => "$Sesso"
		];

		$token=CreaJWT($payload);

		$out = [
			"Userid" => "$Userid",
			"NomeCognome" => "$NomeCognome",
			"Email" => "$Email",
			"MasterAdmin" => "$MasterAdmin",
			"Sesso" => "$Sesso",
			"token" => "$token"
		];
		echo json_encode ($out, JSON_UNESCAPED_UNICODE);

		//
		//	Do a lot of other stuff !!
		//
		// Inserisco/Aggiorno in presenti
		$MySql = "SELECT * FROM Presenti WHERE Userid = $Userid";
		$Results = mysql_query($MySql);
		if (mysql_num_rows($Results) == 0) {
			$MySql = "INSERT INTO Presenti (Userid, NomeCognome, Stanza, OraEntrata, OraUscita, UltimoRefresh, Sesso, startoff,  Inv) VALUES ( $Userid, '$NomeCognome', 0,  NOW(), '2037-12-31 00:00:00', NOW(),'$Sesso' , '1970-01-01 00:00:00',  NULL)";
		} else {
			$MySql = "UPDATE Presenti SET Stanza = 0, OraEntrata=NOW(), UltimoRefresh = NOW(), OraUscita = '2037-12-31 00:00:00' , startoff='1970-01-01 00:00:00', NomeCognome='$NomeCognome' , Sesso='$Sesso', Inv=NULL WHERE Userid = $Userid ";

		}
		mysql_query($MySql);
		if (mysql_errno()) { die ( mysql_errno().": ".mysql_error() ); }

		// FINE OPERAZIONI LOGIN

	} else {
		header("HTTP/1.1 401 Unauthorized");
	}

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
