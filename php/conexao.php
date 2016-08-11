<?php
	$host = "localhost";
	$database = "ic";
	$usuario = "root";
	$senha = "root";
	$bd = mysql_pconnect($host, $usuario,$senha) or trigger_error(mysql_error(),E_USER_ERROR);
	mysql_select_db($database, $bd);
?>