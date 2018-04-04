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

$Dove=$_GET['dove'];
if ($Dove=="") { $Dove=0; }

$out = [];
$Mysql= "SELECT * , (DATE_ADD(Presenti.startoff, INTERVAL 1200 MINUTE) > NOW()) as offgame  FROM Presenti WHERE DATE_ADD(UltimoRefresh, INTERVAL 10 MINUTE) > NOW() AND Inv IS NULL AND Stanza=$Dove ORDER BY NomeCognome DESC ";
$Result = mysql_query($Mysql);
while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
	$out [] =$res;
}

$output = json_encode ($out, JSON_UNESCAPED_UNICODE);
echo $output;

?>
