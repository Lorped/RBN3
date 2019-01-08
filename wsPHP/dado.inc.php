<?php

function dado ( $neri , $rossi, $difficolta ) {


	$BlackFailure=0;
	$BlackSuccess=0;
	$BlackTens=0;

	$visualblack='';

	for ( $i = 0 ; $i < $neri ; $i++) {

		$x = mt_rand (1, 10);
		if ($x < 6 ) {
			$BlackFailure++;
			$visualblack .= '.';
		} elseif ($x > 5 && $x < 10 ) {
			$BlackSuccess++;
			$visualblack .= 'x';
		} else {
			$BlackSuccess++; $BlackTens++;
			$visualblack .= 'S';
		}
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
			$visualred .= '1';
		} elseif ($x < 6 ) {
			$RedFailure++;
			$visualred .= '.';
		} elseif ($x > 5 && $x < 10 ) {
			$RedSuccess++;
			$visualred .= 'x';
		} else {
			$RedSuccess++; $RedTens++;
			$visualred .= 'S';
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




$xx = dado (6 , 2 , 5);
echo "<p>";
echo $xx['vb'] .  "<span style='color:#ff0000;'>" . $xx['vr'] . "</span>" ;
echo "<p>";
echo "successi = " . $xx['successi'] ."<p> esito = " . $xx['esito'];
