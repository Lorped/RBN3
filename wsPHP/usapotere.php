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
include ('soak.inc.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$token=$request->token;

$ID = $request->ID;
$IDdisciplina = $request->IDdisciplina;
$IDtaum = $request->IDtaum;
$IDnecro = $request->IDnecro;
$target = $request->target;
$nometarget = $request->nometarget;
$usofdv = $request -> usofdv;
$stanza = $request -> stanza;



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

//$esito = $NomeCognome . " usa ";
$esito = " usa ";

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
} elseif ( $IDnecro ) {
	$MySql= "SELECT LivelloNecro FROM Necromanzie WHERE Userid = $Userid AND IDnecro = $IDnecro ";
	$Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);
    $LivelloNecro = $res['LivelloNecro'];
	if ( $LivelloNecro == ' ') {
		die();
	}
    $MySql= "SELECT * FROM Necromanzie_main WHERE IDnecro = $IDnecro ";
    $Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);
    $esito = $esito . $res['NomeNecro'];
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
    $UsoFdV= $res['UsoFdV'];
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
} elseif ( $IDnecro ) {
    $MySql= "SELECT * FROM Poteri_Necro WHERE ID = $ID ";
	$Result = mysqli_query($db, $MySql);
	$res=mysqli_fetch_array($Result);

    $LivelloPotere = $res['LivelloPotere'];
    $NomePotere = $res['NomePotere'];
    $IDattributo = $res['IDattributo'];
    $IDskill = $res['IDskill'];
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
        $esito = $esito . '.' . $LivelloNecro;
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

        if ( $Resistito != 'S') {
        
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
        } else  {

            $tirodadoA =  dado ($dp , $Difficolta, $usofdv);

            $dptarget = dicepool ( $target , $DVIDattributo, $DVIDskill, $DVMeriti);

            $tirodadoT =  dado ($dptarget , $Difficolta, false);

            if ($tirodadoT['risultato'] < 0 ) {
                $tirodadoT['risultato'] = 0 ;
            }
            $net = $tirodadoA['risultato'] - $tirodadoT['risultato'];
            if ( $net < 0) {
                $esito = ' ottenendo un fallimento critico';
            } elseif ( $net == 0 ) {
                $esito = ' non ottenendo nessun successo';
            } elseif ( $net == 1 ) {
                $esito = ' ottenendo 1 successo';
            } elseif ( $net > 1 ) {
                $esito = ' ottenendo '.$net.' successi';
            }            

        }

    }

}

// consumo sangue se richiesto
if ( $UsoSangue > 0 ) {
    $MySql = "UPDATE Personaggio SET PS = PS - $UsoSangue , ultimosangue = NOW() WHERE Userid = $Userid";
    mysqli_query($db, $MySql);
}
if ( $UsoFdV > 0 ) {
    $MySql = "UPDATE Personaggio SET FdV = FdV - $UsoFdV , ultimofdv = NOW() WHERE Userid = $Userid";
    mysqli_query($db, $MySql);
}
if ( $usofdv == true && $Auto != 'S' ) {   // NO USO FDV per DP se disciplina Auto 
    $MySql = "UPDATE Personaggio SET FdV = FdV - 1 , ultimofdv = NOW() WHERE Userid = $Userid";
    mysqli_query($db, $MySql);
}


// EFFETTI SPECIALI //
if ( $ID == 25 && $IDdisciplina == 4 ) {  // ORRIDA REALTA
    if ( $tirodado['risultato']> 0 ) {
        if ($tirodado['risultato'] == 1){
            $esito = $esito. ' e causando 1 danno letale';
        } else {
            $esito = $esito. ' e causando '. $tirodado['risultato'] . " danni letali";
        }
        if ( $target != 0 ) {
            $MySql = "SELECT IDsalute from Personaggio WHERE Userid = $target";
            $Result = mysqli_query($db, $MySql);
            $res= mysqli_fetch_array($Result);
            $IDsalute = $res['IDsalute'];
            $newsalute = $IDsalute - $tirodado['risultato'];
            if ($newsalute <0) { 
                $MySql = "UPDATE Personaggio SET IDsalute = 0 WHERE Userid = $target";
                mysqli_query($db, $MySql);
            } else {
                $MySql = "UPDATE Personaggio SET IDsalute = $newsalute WHERE Userid = $target";
                mysqli_query($db, $MySql);
            }
        }
    }
}
if ( $ID== 56 && $IDdisciplina == 12 ) {  // Richiamo di Dagon
    if ( $tirodado['risultato']> 0 ) {
        $danni = soak($target, $tirodado['risultato'] , 'L');
        $esito = $esito. ' e causando '. $danni . " danni letali";
    }
}
if ( $ID== 58 &&  $IDdisciplina == 12 ) {  // Gusto di Morte
    if ( $tirodado['risultato']> 0 ) {
        $danni = soak($target, 2 , 'A');
        $esito = $esito. ' e causando '. $danni . " danni aggravati";
    }
}

$MySql="INSERT INTO Chat ( Stanza, IDMittente, Mittente, IDDestinatario, Destinatario, Sesso , Tipo, Testo, Locazione )
VALUES ($stanza, $Userid, '$NomeCognome' , 0, '' , '$Sesso', '+', '$esito', '' )";
mysqli_query($db, $MySql);

$out = [
    'esito' => $esito
    ];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
