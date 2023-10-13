<?php

function soak($id, $danno, $tipo) {
	include ('db2.inc.php'); //MYSQLI //


	$MySql = "SELECT IDsalute, daurto FROM Personaggio WHERE Userid = $id";
	$Result = mysqli_query( $db, $MySql);
	$res= mysqli_fetch_array($Result);
	$IDsalute = $res['IDsalute'];
	$daurto = $res['daurto'];
	$aggravati = $res['aggravati'];

	$letali = 7 - $IDsalute - $daurto - $aggravati;


	$MySql = "SELECT Livello FROM Personaggio WHERE Userid = $id AND IDattributo = 3 ";  //COSTITUZIONE
	$Result = mysqli_query( $db, $MySql);
	$res= mysqli_fetch_array($Result);
	$costituzione = $res['Livello'];

	$MySql = "SELECT Livello FROM Discipline WHERE Userid = $id AND IDattributo = 13 ";  //ROBUSTEZZA
	$Result = mysqli_query( $db, $MySql);
	$res= mysqli_fetch_array($Result);
	$robustezza = $res['LivelloDisc'];

	if ($robustezza == '') {
		$robustezza = 0 ;
	}

	if ( $danno <= 0 ) {
		return 0;   // PERCHE' DOVREI ESSERE QUI ??
	}

	if ( $tipo == 'U') {
		
		for ( $i = 0 ; ($i < $costituzione+$robustezza) && ($danno > 0) ; $i++) {
			if ( mt_rand (1,10) >5 ) {
				$danno--;
			}
		}

		$danno = round($danno, 0, PHP_ROUND_HALF_DOWN);

		if ( $danno > 0 ) {
			$IDsalute = $IDsalute - $danno;

			if ($IDsalute < -1 ) {
				$IDsalute = -1;   // NO MORTE ULTIMA PER DANNI DA URTO
			}

			$dannieffettivi = (7-$IDsalute)-$letali - $aggravati;

			$MySql = "UPDATE Personaggio SET IDsalute = $IDsalute , daurto = $dannieffettivi WHERE Userid = $id";
			mysqli_query($db, $MySql);

			$danni = $dannieffettivi;
		}
		return $danni;

	} else if ( $tipo == 'L') {
		for ( $i = 0 ; ($i < $costituzione+$robustezza) && ($danno > 0) ; $i++) {
			if ( mt_rand (1,10) >5 ) {
				$danno--;
			}
		}

		if ( $danno > 0 ) {
			$IDsalute = $IDsalute - $danno;

			if ($IDsalute < -1 ) {
				$IDsalute = -1;   // NO MORTE ULTIMA PER DANNI LETALI
			}

			$dannieffettivi = (7-$IDsalute)-$daurto - $aggravati;

			$MySql = "UPDATE Personaggio SET IDsalute = $IDsalute  WHERE Userid = $id";
			mysqli_query($db, $MySql);

			$danni = $dannieffettivi;
		}
		return $danni;

	} else if ( $tipo == 'A ') {
		for ( $i = 0 ; ($i < $robustezza) && ($danno > 0) ; $i++) {
			if ( mt_rand (1,10) >5 ) {
				$danno--;
			}
		}
		if ( $danno > 0 ) {
			$IDsalute = $IDsalute - $danno;

			if ($IDsalute < -2 ) {
				$IDsalute == -2;   // OPPSS.....
			}

			$dannieffettivi = (7-$IDsalute)-$daurto - $letali;

			$MySql = "UPDATE Personaggio SET IDsalute = $IDsalute , aggravati = $dannieffettivi WHERE Userid = $id";
			mysqli_query($db, $MySql);

			$danni = $dannieffettivi;
		}
		return $danni;

	}


}


?>
