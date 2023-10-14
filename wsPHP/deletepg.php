<?php

include 'db2.inc.php';

echo "SICUREZZA";
return;

$ID = 0;

$MySql = "DELETE FROM Attributi WHERE Userid = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Background WHERE Userid = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Chat WHERE IDdestinatario = $ID OR IDmittente = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Checkmessaggiclan WHERE Userid = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Checkmessaggiforum WHERE IDutente = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Checkmessaggithread  WHERE IDutente = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Discipline WHERE Userid = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Messaggiclan WHERE IDmittente = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Necromanzie WHERE Userid = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Possesso WHERE Userid = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Personaggio WHERE Userid = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Presenti WHERE Userid = $ID";
mysqli_query($db, $MySql);


$MySql = "DELETE FROM Quest WHERE Userid = $ID";
mysqli_query($db, $MySql);

$MySql = "DELETE FROM Skill WHERE Userid = $ID";
mysqli_query($db, $MySql);


$MySql = "DELETE FROM Sms WHERE IDdestinatario = $ID OR IDmittente = $ID";
mysqli_query($db, $MySql);


$MySql = "DELETE FROM Taumaturgie WHERE Userid = $ID";
mysqli_query($db, $MySql);

echo "FATTO";

?>