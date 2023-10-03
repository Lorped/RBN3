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

include ('db2.inc.php');   //MYSQLI //
include ('token.php');
//include ('dicepool.inc.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;




$MasterAdmin=0;
$Userid=-1;


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

/*
$Userid= 1;
*/

$out=[];

$MySql= "SELECT * FROM Discipline
	LEFT JOIN Discipline_main ON Discipline.IDdisciplina = Discipline_main.IDdisciplina
	WHERE Userid = $Userid ORDER BY NomeDisc ASC ";

$Result=mysqli_query($db,$MySql);
while ( $res=mysqli_fetch_array($Result, MYSQLI_ASSOC) ) {

	$NomeDisc = $res['NomeDisc'];
	$IDdisciplina=$res['IDdisciplina'];
	$LivelloDisc=$res['LivelloDisc'];
	$IcoDisc=$res['IcoDisc'];
	$pot=[];

	$MySql2= "SELECT Poteri.* , Attributi_main.NomeAttributo, Skill_main.NomeSkill , DV.NomeAttributo as DVNomeAttributo, SV.NomeSkill as DVNomeSkill , 
		0  as TotaleDP ,
		'' as NomeMerito ,
		'' as DVNomeMerito 
		FROM Poteri
		LEFT JOIN Attributi_main on Poteri.IDattributo = Attributi_main.IDattributo
		LEFT JOIN Skill_main on Poteri.IDskill = Skill_main.IDskill
		LEFT JOIN Attributi_main as DV on Poteri.DVIDattributo = DV.IDattributo
		LEFT JOIN Skill_main as SV on Poteri.DVIDskill = SV.IDskill
		WHERE IDdisciplina = $IDdisciplina AND LivelloPotere <= $LivelloDisc ORDER BY LivelloPotere ";
	$Result2=mysqli_query($db, $MySql2);


	while ( $res2=mysqli_fetch_array($Result2, MYSQLI_ASSOC) ) {

		switch ($res2['Meriti']) {
			case 'F':
				$res2['NomeMerito']='FdV';
				break;
			case 'C':
				$res2['NomeMerito']='Coraggio';
				break;
			case 'S':
				$res2['NomeMerito']='Self Control';
				break;
			case 'K':
				$res2['NomeMerito']='Coscienza';
				break;
			case 'U':
				$res2['DVNomeMerito']='Umanita';
				break;											
			default:
				break;
		}
		switch ($res2['DVMeriti']) {
			case 'F':
				$res2['DVNomeMerito']='FdV';
				break;
			case 'C':
				$res2['DVNomeMerito']='Coraggio';
				break;
			case 'S':
				$res2['DVNomeMerito']='Self Control';
				break;
			case 'K':
				$res2['DVNomeMerito']='Coscienza';
				break;
			case 'U':
				$res2['DVNomeMerito']='Umanita';
				break;								
			default:
				break;
		}

		//$pot = dicepool ( $Userid , $res2 );
		$dp = 7;

		$res2['TotaleDP'] = $dp;

		$pot[] = $res2;
	}

	

	$out[] = [
		'NomeDisc' => $NomeDisc,
		'LivelloDisc' => $LivelloDisc,
		'IcoDisc' => $IcoDisc,
		'pot' => $pot
	];


}


header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
