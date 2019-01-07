<?php

function dado ( $neri , $rossi, $difficolta ) {


	$BlackFailure=0;
	$BlackSuccess=0;
	$BlackTens=0;

	for ( $i = 1 ; $i < $neri ; $i++) {
		$x = mt_rand ( 1, 10);
		if ($x < 6 ) { $BlackFailure++;   print ". "; }

		if ($x > 5 && $x != 10 ) { $BlackSuccess++;  print "x "; }

		if ($x == 10 ) { $BlackSuccess++; $BlackTens++; print "S "; }
	}


	$RedCritFailure=0;
	$RedFailure=0;
	$RedSuccess=0;
	$RedTens=0;

	for ( $i = 1 ; $i < $rossi ; $i++) {
		$x = mt_rand ( 1, 10);
		if ($x == 1 ) { $RedCritFailure++; print "<span style='color:#ff0000;'>1 </span>";}
		if ($x < 6 ) { $RedFailure++; print "<span style='color:#ff0000'>. </span>";}
		if ($x > 5 && $x != 10 ) { $RedSuccess++; print "<span style='color:#ff0000'>x </span>"; }
		if ($x == 10 ) { $RedSuccess++; $RedTens++; print "<span style='color:#ff0000'>S </span>";}
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

		if ($doppidieci > 0) {
			$esito = "Successo critico";
			if ($RedTens > 0 ) {
				$esito = "Successo critico caotico";
			}
		}

	}

	$out = [
		'successi' => $successi,
		'esito' => $esito
	];

	return $out;

}

$xx= dado (8 , 2 , 4);
echo "<p>";
echo "successi = " . $xx['successi'] ."<p> esito = " . $xx['esito'];
