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
include ('dicepool.inc.php');
include ('dado.inc.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;

$ID = $request->ID;
$IDdisciplina = $request->IDdisciplina;
$IDtaum = $request->IDtaum;
$target = $request->target;
$nometarget = $request->nometarget;
$usofdv = $request -> usofdv;



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

$esito = $NomeCognome . " usa ";

if ( $IDdisciplina ) {
	$MySql= "SELECT LivelloDisc FROM Discipline WHERE Userid = $Userid AND IDdisciplina = $IDdisciplina ";
	$Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);
    $LivelloDisc = $res['LivelloDisc'];
	if ( $LivelloDisc == '' ) {
		die();
	}
    
    $MySql= "SELECT * FROM Discipline_main WHERE IDdisciplina = $IDdisciplina ";
    $Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);
    $esito = $esito . $res['NomeDisc'];

} elseif ( $IDtaum ) {
	$MySql= "SELECT LivelloTaum FROM Taumaturgie WHERE Userid = $Userid AND IDtaum = $IDtaum ";
	$Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);
    $LivelloTaum = $res['LivelloTaum'];
	if ( $LivelloTaum == ' ') {
		die();
	}
    $MySql= "SELECT * FROM Taumaturgie_main WHERE IDtaum = $IDtaum ";
    $Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);
    $esito = $esito . $res['NomeTaum'];
} else {
	die();
}

if ( $IDdisciplina ) {
	$MySql= "SELECT * FROM Poteri WHERE ID = $ID ";
	$Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);

    $LivelloPotere = $res['LivelloPotere'];
    $NomePotere = $res['NomePotere'];
    $IDattributo = $res['IDattributo'];
    $IDskill = $res['IDskill'];
    $Meriti = $res['Meriti'];
    $Difficolta = $res['Difficolta'];
    $Auto = $res['Auto'];
    $Target= $res['Target'];
    $DVIDattributo = $res['DVIDattributo'];
    $DVIDskill = $res['DVIDskill'];
    $DVMeriti = $res['DVMeriti'];
    $UsoSangue = $res['UsoSangue'];
    $UsoFdv= $res['UsoFdv'];
    $Resistito= $res['Resistito'];

    if ($LivelloPotere != 0 ) {
        $esito = $esito . '.' . $LivelloPotere . ' - ' . $NomePotere ;
    } else {
        $esito = $esito . '.' . $LivelloDisc;
    }
} elseif ( $IDtaum ) {
    $MySql= "SELECT * FROM Poteri_Taum WHERE ID = $ID ";
	$Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);

    $LivelloPotere = $res['LivelloPotere'];
    $NomePotere = $res['NomePotere'];
    $IDattributo = '';
    $IDskill = '';
    $Meriti = $res['Meriti'];
    $Difficolta = $res['Difficolta'];
    $Auto = 'N';
    $Target= $res['Target'];
    $DVIDattributo = '';
    $DVIDskill = '';
    $DVMeriti = $res['DVMeriti'];
    $UsoSangue = $res['UsoSangue'];
    $UsoFdv= $res['UsoFdv'];
    $Resistito= $res['Resistito'];
    if ($LivelloPotere != 0 ) {
        $esito = $esito . '.' . $LivelloPotere . ' - ' . $NomePotere ;
    } else {
        $esito = $esito . '.' . $LivelloTaum;
    }
}

if ( $Auto != 'S') {

    $dp = 0 ;

    $dp = dicepool ($Userid , $IDattributo, $IDskill, $Meriti);

    //$esito = $esito . "DEBUG DP=" . $dp;
    //$esito = $esito . "DEBUG Difficolta=" . $Difficolta;

    if ( $Target == 'N') {

        $tirodado = dado ($dp , $Difficolta,  $usofdv);

        $esito = $esito .   $tirodado['esito'] ;
    } else {

        if ( $target == 0) {  //PNG
            $diff = dicepool_png ( $DVIDattributo, $DVIDskill, $DVMeriti);
            $esito = $esito . " contro PNG";
        } else {
            $diff = dicepool ( $target , $DVIDattributo, $DVIDskill, $DVMeriti);
            $esito = $esito . " contro " . $nometarget;
        }

        
        //$esito = $esito . "DEBUG1 Diff=" . $diff;

        if ( $IDdisciplina == 6 && $target != 0 ) { //dominazione su PG
            $MySqlx ="SELECT Generazione from Personaggio WHERE Userid = $Userid";
            $Resultx = mysqli_query($db, $MySqlx);
            $resx=mysqli_fetch_array($Resultx);
            $g1= $resx['Generazione'];
            $MySqlx ="SELECT Generazione from Personaggio WHERE Userid = $target";
            $Resultx = mysqli_query($db, $MySqlx);
            $resx=mysqli_fetch_array($Resultx);
            $g2= $resx['Generazione'];

            if ( $g1 > $g2) {
                //$esito = $esito . "DEBUG2 g1=" . $g1 . " G2= ". $g2;
                $esito = $esito . ' non ottenendo nessun successo' ;
            } else {
                $tirodado = dado ($dp , $diff, $usofdv);
                //$esito = $esito . "DEBUG3 Diff=" . $diff;
                $esito = $esito .  $tirodado['esito'] ;
            }
        } else {
            $tirodado = dado ($dp , $diff, $usofdv);
            //$esito = $esito . "DEBUG4 Diff=" . $diff;
            $esito = $esito .   $tirodado['esito'] ;
        }

        if ( $Resistito == 'S') {

        }

    }

}


$out = [
    'esito' => $esito
    ];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
