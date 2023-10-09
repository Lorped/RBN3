<?php



function dicepool ( $Userid, $IDattributo, $IDskill, $Meriti ) {

	include ('db2.inc.php');   //MYSQLI //

	// CALCOLO DP//
	$dp = 0;

	if ( $IDattributo != '' ) {
		$MySql3 = "SELECT Livello from Attributi WHERE IDattributo = $IDattributo AND Userid = $Userid";
		$Result3 = mysqli_query($db, $MySql3);
		$res3 = mysqli_fetch_array($Result3);
		$dp = $dp + $res3['Livello'];
	}
	if ( $IDskill != '' ) {
		$MySql3 = "SELECT Livello from Skill WHERE IDskill = $IDskill AND Userid = $Userid";
		$Result3 = mysqli_query($db, $MySql3);
		$res3 = mysqli_fetch_array($Result3);
		$dp = $dp + $res3['Livello'];
	}
	if ( $Meriti != '') {
		$MySql3 = "SELECT * from Personaggio WHERE Userid = $Userid";
		$Result3 = mysqli_query($db, $MySql3);
		$res3 = mysqli_fetch_array($Result3);
		switch ($Meriti) {
			case 'F':
				$dp = $dp + $res3 ['FdV'];
				break;
			case 'C':
				$dp = $dp + $res3 ['Coraggio'];
				break;
			case 'S':
				$dp = $dp + $res3 ['SelfControl'];
				break;
			case 'K':
				$dp = $dp + $res3 ['Coscienza'];
				break;
			case 'K':
				$dp = $dp + $res3 ['Valsentiero '];
				break;																						
			default:
				break;
		}
	}

	return $dp;
}

function dicepool_png ( $IDattributo, $IDskill, $Meriti ) {

	// CALCOLO DP//
	$dp = 0;

	if ( $IDattributo != '' ) {
		$dp = $dp + 3 ;
	}
	if ( $IDskill != '' ) {
		$dp = $dp + 3 ;
	}
	if ( $Meriti != '') {
		switch ($Meriti) {
			case 'F':
				$dp = $dp + 4;    // FDV
				break;
			case 'C':
				$dp = $dp + 2;   // CORAGGIO
				break;
			case 'S':
				$dp = $dp + 3;   // SELFCONTROL
				break;
			case 'K':
				$dp = $dp + 3;  // COSCIENZA
				break;
			case 'U':
				$dp = $dp + 7;  // UMANITA
				break;																						
			default:
				break;
		}
	}

	return $dp;
}

?>
