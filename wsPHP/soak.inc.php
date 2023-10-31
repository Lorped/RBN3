<?php

function soak ($id, $danno, $tipo) {
	if ($id == -1 ) {
		return soak_PNG_V ($danno, $tipo);
	} else if ($id == 0 ) {
		return soak_PNG_H ($danno, $tipo);
	} else {
		return soak_PG ($id, $danno, $tipo);
	}
}

function soak_PG($id, $danno, $tipo) {

	include ('db2.inc.php'); //MYSQLI //


	$MySql = "SELECT IDsalute, daurto, aggravati FROM Personaggio WHERE Userid = $id";
	$Result = mysqli_query( $db, $MySql);
	$res= mysqli_fetch_array($Result);
	$IDsalute = $res['IDsalute'];
	$daurto = $res['daurto'];
	$aggravati = $res['aggravati'];

	$letali = 7 - $IDsalute - $daurto - $aggravati;


	$MySql = "SELECT Livello FROM Attributi WHERE Userid = $id AND IDattributo = 3 ";  //COSTITUZIONE
	$Result = mysqli_query( $db, $MySql);
	$res= mysqli_fetch_array($Result);
	$costituzione = $res['Livello'];

	$MySql = "SELECT LivelloDisc FROM Discipline WHERE Userid = $id AND IDdisciplina = 13 ";  //ROBUSTEZZA
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
		
		$assorbiti = 0 ;
		for ( $i = 0 ; $i < $costituzione+$robustezza ; $i++) {
			if ( mt_rand (1,10) > 5 ) {
				$assorbiti++;
			}
		}
		$danno = $danno - $assorbiti;
		if ($danno <0 ) {
			$danno = 0 ;
		}

		$danno = floor($danno/2);

		if ( $danno > 0 ) {
			$olddaurto = $daurto;

			$IDsalute = $IDsalute - $danno;

			if ($IDsalute < 0 ) {
				$IDsalute = 0;   // NO MORTE ULTIMA / TORPORE  PER DANNI DA URTO
			}

			$newdaurto = (7-$IDsalute)-$letali - $aggravati;

			$MySql = "UPDATE Personaggio SET IDsalute = $IDsalute , daurto = $newdaurto WHERE Userid = $id";
			mysqli_query($db, $MySql);

			$dannieffettivi = $newdaurto - $olddaurto;
			return $dannieffettivi;
		} else {
			return 0;
		}
		

	} else if ( $tipo == 'L') {
		
		$assorbiti = 0 ;
		for ( $i = 0 ; $i < $costituzione+$robustezza ; $i++) {
			if ( mt_rand (1,10) > 5 ) {
				$assorbiti++;
			}
		}
		$danno = $danno - $assorbiti;
		if ($danno <0 ) {
			$danno = 0 ;
		}

		if ( $danno > 0 ) {
			$oldletali = $letali;
			$IDsalute = $IDsalute - $danno;
			

			if ($IDsalute < -1 ) {
				$IDsalute = -1;   // NO MORTE ULTIMA PER DANNI LETALI
			}

			$newletali = (7-$IDsalute)-$daurto - $aggravati;

			$MySql = "UPDATE Personaggio SET IDsalute = $IDsalute  WHERE Userid = $id";
			mysqli_query($db, $MySql);

			$dannieffettivi = $newletali - $oldletali;
			return $dannieffettivi;
		} else {
			return 0;
		}
		

	} else if ( $tipo == 'A') {
		
		$assorbiti= 0;
		for ( $i = 0 ; $i < $robustezza ; $i++) {
			if ( mt_rand (1,10) >5 ) {
				$assorbiti++;
			}
		}
		$danno = $danno - $assorbiti;
		if ($danno <0) {
			$danno = 0 ;
		}


		if ( $danno > 0 ) {
			$oldaggravati = $aggravati;
			$IDsalute = $IDsalute - $danno;

			if ($IDsalute < -2 ) {
				$IDsalute == -2;   // OPPSS.....
			}

			$newaggravati = (7-$IDsalute)-$daurto - $letali;

			$MySql = "UPDATE Personaggio SET IDsalute = $IDsalute , aggravati = $dannieffettivi WHERE Userid = $id";
			mysqli_query($db, $MySql);

			$dannieffettivi = $newaggravati - $oldaggravati;
			return $dannieffettivi;
		} else {
			return 0;
		}
	}


}


function soak_PNG_H( $danno, $tipo) {
	
	$costituzione = 2;
	$robustezza = 0 ;
	
	if ( $tipo == 'U') {
		
		$assorbiti = 0 ;
		for ( $i = 0 ; $i < $costituzione+$robustezza ; $i++) {
			if ( mt_rand (1,10) > 5 ) {
				$assorbiti++;
			}
		}
		$danno = $danno - $assorbiti;
		if ($danno <0 ) {
			$danno = 0 ;
		}

		return $danno ;
		
	} else if ( $tipo == 'L') {
		
		return $danno;
		
	} else if ( $tipo == 'A') {
		
		return $danno;
	}

}

function soak_PNG_V ( $danno, $tipo) {
	
	$costituzione = 3;

	$robustezza = 1;

	if ( $tipo == 'U') {
		
		$assorbiti = 0 ;
		for ( $i = 0 ; $i < $costituzione+$robustezza ; $i++) {
			if ( mt_rand (1,10) > 5 ) {
				$assorbiti++;
			}
		}
		$danno = $danno - $assorbiti;
		if ($danno <0 ) {
			$danno = 0 ;
		}

		$danno = floor($danno/2);
		return $danno;
		

	} else if ( $tipo == 'L') {
		
		$assorbiti = 0 ;
		for ( $i = 0 ; $i < $costituzione+$robustezza ; $i++) {
			if ( mt_rand (1,10) > 5 ) {
				$assorbiti++;
			}
		}
		$danno = $danno - $assorbiti;
		if ($danno <0 ) {
			$danno = 0 ;
		}

		return $danno;		

	} else if ( $tipo == 'A') {
		
		$assorbiti= 0;
		for ( $i = 0 ; $i < $robustezza ; $i++) {
			if ( mt_rand (1,10) >5 ) {
				$assorbiti++;
			}
		}
		$danno = $danno - $assorbiti;
		if ($danno <0) {
			$danno = 0 ;
		}

		return $danno;	

	}


}

?>
