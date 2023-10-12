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
		$ultimosangue=$res['ultimosangue'];
		$IDsalute=$res['IDsalute'];
		$ultimofdv=$res['ultimofdv'];


		$payload = [
			"Userid" => "$Userid",
			"NomeCognome" => "$NomeCognome",
			"Email" => "$Email",
			"MasterAdmin" => "$MasterAdmin",
			"Sesso" => "$Sesso"
		];

		$token=CreaJWT($payload);



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

		// SISTEMO i PUNTI SANGUE
		if ( $PSmax == $PS )   {
			$MySql = "UPDATE Personaggio SET ultimosangue=NOW() WHERE Userid=$Userid ";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) { 
				die ( mysqli_errno($db).": ".mysqli_error($db) );
			}
		} else {
			$giornidiff = floor((time() - strtotime($ultimosangue) ) / (24 * 60 * 60));  //giorni per sangue
			$PS=$PS+$giornidiff;
	
			/* *** VENTRUE
			if ( $Esclusione == "S" ) {
				if ( rand(1,10) == 1  ) {
					$PS=$PS-2*ceil($giornidiff/2);
					if ($PS<1) {
						$qps=1;
					}
				}
			}
			*******/
			if ($PS >= $PSmax ) {
				$PS=$PSmax;
				$MySql = "UPDATE Personaggio SET PS='$PS' , ultimosangue = NOW() WHERE Userid=$Userid ";	
			} else {
				$MySql = "UPDATE Personaggio SET PS='$PS' , ultimosangue = DATE_ADD( ultimosangue, INTERVAL $giornidiff DAY ) WHERE Userid=$Userid ";	
			}			
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) { 
				die ( mysqli_errno($db).": ".mysqli_error($db) );
			}
		}
	
		if ($IDsalute < 0) { // torpore - MU - I PS NON AUMENTANO
			$MySql = "UPDATE Personaggio SET PS=0 , ultimosangue = NOW() WHERE Userid=$Userid ";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) { 
				die ( mysqli_errno($db).": ".mysqli_error($db) );
			}
		}

		// E FDV
		if ( $FdV == $FdVmax ) {
			$MySql = "UPDATE Personaggio SET ultimofdv=NOW() WHERE Userid=$quserid ";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) { 
				die ( mysqli_errno($db).": ".mysqli_error($db) );
			}
		} else {
			$settimanadiff = floor((time() - strtotime($ultimofdv) ) / (7* 24 * 60 * 60));

			if ($settimanadiff >= 1) {
				$FdV=$FdV+$settimanadiff;
				if ($FdV >= $FdVvmax ) {
					$FdV=$FdVvmax;
					$MySql = "UPDATE Personaggio SET FdV='$FdV' , ultimofdv = NOW() WHERE Userid=$Userid ";
				} else {
					$ggdif=7*$settimanadiff;
					$MySql = "UPDATE Personaggio SET FdV='$FdV' , ultimofdv = DATE_ADD( ultimofdv, INTERVAL $ggdif DAY ) WHERE Userid=$Userid ";	
				}

				mysqli_query($db, $MySql);
				if (mysqli_errno($db)) { 
					die ( mysqli_errno($db).": ".mysqli_error($db) );
				}
			}
		}

		// FINE OPERAZIONI LOGIN ORA MANDO FUORI IL TUTTO

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

	} else {
		header("HTTP/1.1 401 Unauthorized");
	}

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
