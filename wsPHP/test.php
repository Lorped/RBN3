<?php

include ('token.php');

$payload = [
			"Userid" => "1",
			"NomeCognome" => "J S",
			"Email" => "xx",
			"MasterAdmin" => "3",
			"Sesso" => "M"
		];
		
$token=CreaJWT($payload);

print $token . "<br>";

if ( CheckJWT ($token) ) {
	print "OK" ;
} else {
	print "KO" ;
}
print "<br>";

$xx=GetJWT($token);

print json_decode($xx)->NomeCognome;

?>
