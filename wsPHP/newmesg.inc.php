<?php

function aggiornanumeromessaggi ( $Userid = NULL) {

    /* AGGIORNAMENT NUM MESSAGGI */
    $MySql= "SELECT COUNT(*) as c FROM  `Sms` WHERE  Nuovo = 'S' AND  IDDestinatario = $Userid  ";
    $Result=mysql_query($MySql);
    $res=mysql_fetch_array($Result);
    $n1=$res['c'];

    $MySql = "SELECT IDclan FROM Personaggio WHERE Userid = $Userid";
    $Result=mysql_query($MySql);
    $res = mysql_fetch_array($Result);
    $myclanid = $res['IDclan'];

    $MySql="SELECT * FROM Checkmessaggiclan WHERE Userid = $Userid and IDclan = $myclanid";
    $Result=mysql_query($MySql);
    $res = mysql_fetch_array($Result);
    $Ora=$res['UltimaData'];
    if ( $Ora=='') {
        $Ora='1999-01-01';
    }
    $MySql="SELECT COUNT(*) as n FROM Messaggiclan WHERE IDclan = $myclanid AND Ora > '$Ora' ";
    $Result=mysql_query($MySql);
    $res = mysql_fetch_array($Result) ;
    $n2 = $res['n'];

    $ntot = $n1 + $n2;

    /* AGGIORNO NUM MESSAGGI */
    $MySql="SELECT COUNT(*) as c from Newmsg where Userid = $Userid";
    $Result=mysql_query($MySql);
    $res=mysql_fetch_array($Result);
    if ($res['c']==0) {
        $MySql = "INSERT INTO Newmsg (Userid, Newmsg) VALUES ($Userid, $ntot)";
    }else {
        $MySql = "UPDATE Newmsg SET Newmsg = $ntot WHERE Userid = $Userid";
    }
    $Result=mysql_query($MySql);



}