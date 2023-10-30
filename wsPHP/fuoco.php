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

$stanza = $request->stanza;
$target = $request->target;
$nometarget = $request->nometarget;

/*  
$zulo = $request -> zulo;
$marauder = $request -> marauder;
*/ 

$usofdv -> $request -> usofdv;


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

$MySql = "SELECT Oggetti.* from Possesso
    LEFT JOIN Oggetti ON Oggetti.IDoggetto=Possesso.IDoggetto
    WHERE Userid = $Userid AND Usato = 'S' ";
$Result = mysqli_query($db, $MySql) ;
$res = mysqli_fetch_array($Result, MYSQLI_ASSOC);

$nomearma = $res ['Nome'];
$danno = $res ['Danno'];
$bonus = $res ['BonusTiro'];
$rate = $res ['Rate'];
$tipooggetto= $res ['IDtipoOggetto'];
$raffica = $res ['Raffica'];

if ( $tipooggetto != 3 ) {
    return ;   // PERCHE' SONO QUI ??
}



$MySql = "SELECT ModSalute From Personaggio
    LEFT JOIN Livelli_salute ON Livelli_salute.IDsalute = Personaggio.IDsalute
    WHERE Userid = $Userid";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result, MYSQLI_ASSOC);

$ModSalute = $res['ModSalute'];


$dp = dicepool( $Userid ,  2, 12 , '') ;

    // $esito = " DP base = " . $dp;

/** CONTO EFFETTO VELOCITA PERCHE' IN FORMA PASSIVA  */

$MySql = "SELECT LivelloDisc FROM Discipline 
    WHERE IDdisciplina = 16 AND Userid = $Userid";
$Result = mysqli_query($db, $MySql);
$res = mysqli_fetch_array($Result, MYSQLI_ASSOC);
$velocita = $res['LivelloDisc'];

$dp = $dp + $velocita;

    // $esito = $esito . " velocita DP = " . $dp;


/* NON CREDO CHE POSSANO ADOPERARE ARMI !!! */
/*
if ( $zulo == true || $marauder == true ) {
    $dp = $dp + 3;
}
*/

$dp = $dp + $bonus;

    // $esito = $esito . " bonus tiro DP = " . $dp;


if ( $usofdv == false ) {
    $dp = $dp + $ModSalute;
    if ($dp < 0 && $ModSalute != -99 ) {
        $dp = 1 ;
    }
    // $esito = $esito . " NO-FDV MODSALTE DP = " . $dp;
}

$effettivi = 0 ;

for ( $colpo = 0 ; $colpo < $rate ; $colpo++ ) {

    $risultato = dado( $dp , 6 );

    $successi = $risultato['risultato'];

    // $esito = $esito . " successi = " . $successi;

    if ( $successi > 0 ) { 
        $extra = 0;
        if ( $successi > 1 ) { 
            $extra = $successi -1 ;
        }
        // $esito = $esito . " extra = " . $extra;

    
        $dp_per_danni = $danno + $extra;

        $risultato2 = dado( $dp_per_danni , 6 );
        $danni = $risultato2 ['risultato'];

        // $esito = $esito . " danni = " . $danni;

        if ( $target == 0 ) {
            $effettivi = $effettivi + soak($target, $danni, 'L');
            $tipo = "letale";
            $tipo2 = "letali";
        } else {
            $effettivi = $effettivi + soak($target, $danni, 'U');
            $tipo = "da urto";
            $tipo2 = "da urto";
        }
        

        // $esito = $esito . " effettivi dopo colpo " . $colpo . " = ". $effettivi;
    }
}






$esito =  $NomeCognome . " spara ". $rate . " colpi con " . $nomearma . " contro " . $nometarget ;

if ( $effettivi == 0 ) {
    $esito = $esito . " che non subisce nessun danno";
} else if ( $effettivi == 1 ) {
    $esito = $esito . " che subisce 1 danno " . $tipo;
} else {
    $esito = $esito . " che subisce " . $effettivi . " danni " . $tipo2;
}

if ( $target > 0 ) {  // PG
    $MySql = "SELECT IDsalute From Personaggio WHERE Userid = $target";
    $Result = mysqli_query($db, $MySql);
    $res = mysqli_fetch_array($Result, MYSQLI_ASSOC);
    $ids=$res['IDsalute'];

    if ( $ids == 0 ) {
        $esito = $esito . " - " . $nometarget . " è INCAPACITATO";
    }
    if ( $ids == -1 ) {
        $esito = $esito . " - " . $nometarget . " è IN TORPORE";
    }
    if ( $ids == -2 ) {
        $esito = $esito . " - " . $nometarget . " è MORTO";
    }
}


$ModSalute = $res['ModSalute'];



 $MySql="INSERT INTO Chat ( Stanza, IDMittente, Mittente, IDDestinatario, Destinatario, Sesso , Tipo, Testo, Locazione )
VALUES ($stanza, $Userid, '$NomeCognome' , 0, '' , '$Sesso', '+', '$esito', '' )";
 mysqli_query($db, $MySql);

$out = [
    'esito' => $esito
    ];

header("HTTP/1.1 200 OK");

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
