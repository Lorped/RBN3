<?php
	include "dado.inc.php";
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>test dado</title>



		<style>

		@font-face {
		  font-family: "v5dice";
		  src:url("../v5dice/fonts/v5dice.eot");
		  src:url("../v5dice/fonts/v5dice.eot?#iefix") format("embedded-opentype"),
		    url("../v5dice/fonts/v5dice.woff") format("woff"),
		    url("../v5dice/fonts/v5dice.ttf") format("truetype"),
		    url("../v5dice/fonts/v5dice.svg#v5dice") format("svg");
		  font-weight: normal;
		  font-style: normal;

		}
		</style>

  </head>
  <body>

		Dice pool 10
		<p>
		Sete 2
		<p>
		Difficoltà 5
		<p>
		<?
		$xx = dado (8 , 2 , 5, 0);
		?>
		<span style="font-family:v5dice;"> <?= $xx['vb'] ?>  <span style='color:#ff0000;'> <?= $xx['vr'] ?> </span> </span>

		<p>
		successi = <?= $xx['successi'] ?>
		<p>
		esito = <?= $xx['esito'] ?>

  </body>
</html>
