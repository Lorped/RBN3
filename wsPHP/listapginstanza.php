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

include ('db2.inc.php');   // MYSQLI //
include ('token.php');

$Dove=$_GET['dove'];
if ($Dove=="") { $Dove=0; }
$but=$_GET['but'];
if ($but=="") { $but=0; }

$out = [];
$Mysql= "SELECT Presenti.* , Personaggio.URLImg , (DATE_ADD(Presenti.startoff, INTERVAL 1200 MINUTE) > NOW()) as offgame  FROM Presenti 
	LEFT JOIN Personaggio ON Personaggio.Userid = Presenti.Userid
	WHERE DATE_ADD(UltimoRefresh, INTERVAL 10 MINUTE) > NOW() AND Inv IS NULL AND Stanza=$Dove AND Presenti.Userid <> $but ORDER BY NomeCognome DESC ";
$Result = mysqli_query($db, $Mysql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$out [] =$res;
}

$output = json_encode ($out, JSON_UNESCAPED_UNICODE);
echo $output;

?>
