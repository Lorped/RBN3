<?php

include ('db.inc.php');

function dicepool ( $Userid, $potere) {


	$MySql = "SELECT * FROM Poteri
		LEFT JOIN Poteri_main ON Poteri_main.IDpotere=Poteri.IDpotere
		LEFT JOIN Discipline_main ON Poteri_main.IDdisciplina=Discipline_main.IDdisciplina
		WHERE Userid = $Userid AND Poteri.IDpotere = $potere ";
	$Result=mysql_query($MySql);

	if ( ! $res=mysql_fetch_array($Result) ) {
		$out=[];
		return $out;
	}

	$NomePotere=$res['NomePotere'];
	$NomeDisc=$res['NomeDisc'];
	$LivelloPotere=$res['LivPotere'];

	$DPvariabili="";

	$DicePool = 0 ;


	if ( $res['Auto'] == 1 ) {
		// AUTO == 1   -> Dichiaro il potere e basta

	} else {


		if ( $res['DPdisc'] != "" ) {
			$dpdisc=$res['DPdisc'];
			$MySql2 = "SELECT * FROM Discipline
				LEFT JOIN Discipline_main ON Discipline.IDdisciplina=Discipline_main.IDdisciplina
				WHERE Discipline.IDdisciplina = $dpdisc and Userid = $Userid";
			$Result2 = mysql_query($MySql2);
			$Res2=mysql_fetch_array($Result2);

			$DPvariabili = $DPvariabili . $Res2['NomeDisc'] . ' + ';
			$DicePool = $DicePool + $Res2['LivelloDisc'];

		}

		if ( $res['DPattr'] != "" ) {
			$dpattr=$res['DPattr'];
			$MySql2 = "SELECT * FROM Attributi
				LEFT JOIN Attributi_main ON Attributi.IDattributo=Attributi_main.IDattributo
				WHERE Attributi.IDattributo = $dpattr and Userid = $Userid";
			$Result2 = mysql_query($MySql2);
			$Res2=mysql_fetch_array($Result2);

			$DPvariabili = $DPvariabili . $Res2['NomeAttributo'] ;
			$DicePool = $DicePool + $Res2['Livello'];

		}

		if ( $res['DPskill'] != "" ) {
			$dpskill=$res['DPskill'];
			$MySql2 = "SELECT * FROM Skill
				LEFT JOIN Skill_main ON Skill.IDskill=Skill_main.IDskill
				WHERE Skill.IDskill = $dpskill and Userid = $Userid";
			$Result2 = mysql_query($MySql2);
			if ( $Res2=mysql_fetch_array($Result2) )  {

				$DPvariabili = $DPvariabili . ' + ' . $Res2['NomeSkill'] ;
				$DicePool = $DicePool + $Res2['Livello'];

			} else {  //non ho lo skill
				$MySql2 = "SELECT * FROM Skill_main WHERE IDskill = $dpskill";
				$Result2 = mysql_query($MySql2);
				$Res2=mysql_fetch_array($Result2);
				$DPvariabili = $DPvariabili . ' + ' . $Res2['NomeSkill'] ;
			}

		}

		$MySql = "SELECT * FROM Personaggio
			LEFT JOIN BloodPotency ON Personaggio.BloodP=BloodPotency.BloodP
			WHERE Userid = $Userid";
		$Result=mysql_query($MySql);
		$res=mysql_fetch_array($Result);

		$BonusD=$res['BonusD'];

		$DicePool = $DicePool + $BonusD;



	}

	$out = [
		'NomePotere' => $NomePotere,
		'NomeDisc' => $NomeDisc,
		'LivelloPotere' => $LivelloPotere,
		'DPvariabili' => $DPvariabili,
		'DicePool' => $DicePool
	];

	return $out;
}
?>