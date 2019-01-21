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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;
$potere=$request->potere; // id potere
$target=$request->target; // target - se esiste
$fdv=$request->fdv; // uso Fdv
$surge=$request->surge; // uso blood surge

/*
$id=$_GET['id'];
$token=$_GET['token'];
*/

$MasterAdmin=0;
$Userid=-1;

/************ DEBUG !!!
if ( CheckJWT ($token) ) {
	$xx=GetJWT($token);
	$payload=json_decode($xx);
	$Userid= $payload->Userid;
	$MasterAdmin= $payload->MasterAdmin;
	$NomeCognome= $payload->NomeCognome;
	$Sesso= $payload->Sesso;
} else {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
}


*******************/
$Userid=1;
$NomeCognome="Julien Sorel";
$potere = 12;
$surge = 1;



$MySql = "SELECT * FROM Poteri
	LEFT JOIN Poteri_main ON Poteri_main.IDpotere=Poteri.IDpotere
	LEFT JOIN Discipline_main ON Poteri_main.IDdisciplina=Discipline_main.IDdisciplina
	WHERE Userid = $Userid AND Poteri.IDpotere = $potere ";
$Result=mysql_query($MySql);
if ( ! $res=mysql_fetch_array($Result) ) {
	header("HTTP/1.1 401 Unauthorized");
	$out=[];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die ();
};

$esito = $NomeCognome . ' usa ' . $res['NomePotere'] . ' ('.$res['NomeDisc'].'.'.$res['LivPotere'].')';

$livello = $res['LivPotere'];
$DicePool = 0 ;


if ( $res['Auto'] == 1 ) {
	// AUTO == 1   -> Dichiaro il potere e basta
	echo $esito . "<p>" ;
} else {

	$esito = $esito . '[';
	// Determino DicePool base

	if ( $res['DPdisc'] != "" ) {
		$dpdisc=$res['DPdisc'];
		$MySql2 = "SELECT * FROM Discipline
		LEFT JOIN Discipline_main ON Discipline.IDdisciplina=Discipline_main.IDdisciplina
		WHERE Discipline.IDdisciplina = $dpdisc and Userid = $Userid";
		$Result2 = mysql_query($MySql2);
		$Res2=mysql_fetch_array($Result2);

		$esito = $esito . $Res2['NomeDisc'] . ' + ';

		$DicePool = $DicePool + $Res2['LivelloDisc'];

	}

	if ( $res['DPattr'] != "" ) {
		$dpattr=$res['DPattr'];
		$MySql2 = "SELECT * FROM Attributi
		LEFT JOIN Attributi_main ON Attributi.IDattributo=Attributi_main.IDattributo
		WHERE Attributi.IDattributo = $dpattr and Userid = $Userid";
		$Result2 = mysql_query($MySql2);
		$Res2=mysql_fetch_array($Result2);

		$esito = $esito . $Res2['NomeAttributo'] ;

		$DicePool = $DicePool + $Res2['Livello'];

	}

	if ( $res['DPskill'] != "" ) {
		$dpskill=$res['DPskill'];
		$MySql2 = "SELECT * FROM Skill
		LEFT JOIN Skill_main ON Skill.IDskill=Skill_main.IDskill
		WHERE Skill.IDskill = $dpskill and Userid = $Userid";
		$Result2 = mysql_query($MySql2);
		if ( $Res2=mysql_fetch_array($Result2) )  {

			$esito = $esito . ' + ' . $Res2['NomeSkill'] ;
			$DicePool = $DicePool + $Res2['Livello'];

		} else {  //non ho lo skill
			$MySql2 = "SELECT * FROM Skill_main
			WHERE IDskill = $dpskill";
			$Result2 = mysql_query($MySql2);
			$Res2=mysql_fetch_array($Result2);
			$esito = $esito . ' + ' . $Res2['NomeSkill'] ;
		}

	}
	$esito = $esito . '] ';

	echo $esito . "<p>" ;
	echo "dicepool base " . $DicePool;



	$MySql = "SELECT * FROM Personaggio
		LEFT JOIN BloodPotency ON Personaggio.BloodP=BloodPotency.BloodP
		WHERE Userid = $Userid";
	$Result=mysql_query($MySql);
	$res=mysql_fetch_array($Result);

	$BonusD=$res['BonusD'];

	$DicePool = $DicePool + $BonusD;

	echo "<p> dicepool gen " . $DicePool;

	if ($surge == 1 ) {
		$Surge=$res['Surge'];
		$DicePool = $DicePool + $Surge;

	}
	echo "<p> dicepool surge " . $DicePool;


}



header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
