<?php

function dado ( $dicepool, $difficolta, $fdv = false) {



	$successi = 0;
	$fc = 0;



	for ( $i = 0 ; $i < $dicepool ; $i++) {

		$x = mt_rand (1, 10);
		if ($x >= $difficolta ) {
			$successi++;
		} elseif ($x == 1 ) {
			$fc++;
		}
	}

	if ( $fdv == false ) {
		if ( $fc >= $successi ) {
			$risutato = 0;
			$esito = " non ottenendo nessun successo";
		}
		if ( $fc > 0 && $successi == 0 ) {
			$risutato = -1;
			$esito = " ottenendo un fallimento critico!";
		}
		if ( $successi > $fc) {
			$risultato = $successi - $fc ;

			$esito =  " ottenendo " . $risultato." successi";

			if ($risultato == 1) {
				$esito = " ottenendo 1 successo";
			}	
		}
	} else {  // CORREZIONE per USO FDV
		if ( $fc >= $successi ) {
			$risutato = 1;
			$esito = "  ottenendo 1  successo";
		}

		if ( $successi > $fc) {
			$risultato = $successi - $fc  + 1;

			$esito =  " ottenendo " . $risultato." successi";

			if ($risultato == 1) {
				$esito = " ottenendo 1 successo";
			}	
		}
	}
	$out = [
		'risultato' => $risultato,
		'esito' => $esito
	];

	return $out;

}


function dado_v5 ( $neri , $rossi, $difficolta, $fdv ) {

	$BlackFailure=0;
	$BlackSuccess=0;
	$BlackTens=0;

	$visualblack='';

	for ( $i = 0 ; $i < $neri ; $i++) {

		$x = mt_rand (1, 10);
		if ($x < 6 ) {
			$BlackFailure++;
		} elseif ($x > 5 && $x < 10 ) {
			$BlackSuccess++;
		} else {
			$BlackSuccess++;
			$BlackTens++;
		}
	}

	if ( $fdv == 1 ) {   // uso Fdv e ritiro gli insuccessi
		for ( $i = 0 ; $i < $BlackFailure ; $i++) {
			$x = mt_rand (1, 10);
			if ($x < 6 ) {
				// non cambia nulla
			} elseif ($x > 5 && $x < 10 ) {
				$BlackSuccess++;
				$BlackFailure--;
			} else {
				$BlackSuccess++;
				$BlackTens++;
				$BlackFailure--;
			}
		}
	}

	for ( $i= 0; $i < $BlackFailure ; $i++) {
		$visualblack=$visualblack.'a';
	}
	for ( $i= 0; $i < $BlackSuccess-$BlackTens ; $i++) {
		$visualblack=$visualblack.'d';
	}
	for ( $i= 0; $i < $BlackTens ; $i++) {
		$visualblack=$visualblack.'e';
	}


	$RedCritFailure=0;
	$RedFailure=0;
	$RedSuccess=0;
	$RedTens=0;

	$visualred='';

	for ( $i = 0 ; $i < $rossi ; $i++) {
		$x = mt_rand ( 1, 10);
		if ($x == 1 ) {
			$RedCritFailure++;
			$visualred .= 'b';
		} elseif ($x < 6 ) {
			$RedFailure++;
			$visualred .= 'a';
		} elseif ($x > 5 && $x < 10 ) {
			$RedSuccess++;
			$visualred .= 'd';
		} else {
			$RedSuccess++; $RedTens++;
			$visualred .= 'c';
		}
	}

	$doppidieci= floor ( ($BlackTens + $RedTens) / 2);

	$successi = $BlackSuccess + $RedSuccess + 2* $doppidieci;



	if ( $successi < $difficolta ) {
		$esito='Fallimento';
		if ($RedCritFailure > 0 ) {
			$esito = "Fallimento bestiale";
		}
	} else {
		$esito='Successo';
		if ($doppidieci > 0 && $RedTens > 0 ) {
			$esito = "Successo caotico";
		}
	}

	$out = [
		'successi' => $successi,
		'esito' => $esito,
		'vb'  => $visualblack,
		'vr'  => $visualred
	];

	return $out;

}


?>
