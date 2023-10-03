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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = $request->email;
$password = $request->password;


$email=mysqli_real_escape_string($db, $email);
$password=mysqli_real_escape_string($db, $password);


if (isset($postdata) && $email != "" && $password !="" ) {

	$MySql = "SELECT * FROM Personaggio WHERE Email='$email' AND Pass='$password' ";
	$Result = mysqli_query($db, $MySql);

	if ( $res = mysqli_fetch_array($Result)   ) {
		$Userid=$res['Userid'];
		$Nome=$res['Nome'];
		$Cognome=$res['Cognome'];
		$Email=$res['Email'];
		$NomeCognome=$Nome.' '.$Cognome;
		$Sesso=$res['Sesso'];
		$MasterAdmin=$res['MasterAdmin'];
		$PS=$res['PS'];
		$PSmax=$res['PSmax'];
		$FdV=$res['FdV'];
		$FdVmax=$res['FdVmax'];


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
			"PS" => "$PS",
			"PSmax" => "$PSmax",
			"FdV" => "$FdV",
			"FdVmax" => "$FdVmax",
			"token" => "$token"
		];
		echo json_encode ($out, JSON_UNESCAPED_UNICODE);

		//
		//	Do a lot of other stuff !!
		//
		// Inserisco/Aggiorno in presenti
		$NomeCognome=mysqli_real_escape_string($db, $NomeCognome);

		$MySql = "SELECT * FROM Presenti WHERE Userid = $Userid";
		$Results = mysqli_query($db, $MySql);
		if (mysqli_num_rows($Results) == 0) {
			$MySql = "INSERT INTO Presenti (Userid, NomeCognome, Stanza, OraEntrata, UltimoRefresh, Sesso, startoff,  Inv, ongame) VALUES ( $Userid, '$NomeCognome', 0,  NOW(), NOW(),'$Sesso' , '1970-01-01 00:00:00',  NULL, 'S')";
		} else {
			$MySql = "UPDATE Presenti SET Stanza = 0, OraEntrata=NOW(), UltimoRefresh = NOW(), startoff='1970-01-01 00:00:00', NomeCognome='$NomeCognome' , Sesso='$Sesso', Inv=NULL , ongame='S' WHERE Userid = $Userid ";

		}
		mysqli_query($db, $MySql);
		if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db) ); }

		// FINE OPERAZIONI LOGIN

	} else {
		header("HTTP/1.1 401 Unauthorized");
	}

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
