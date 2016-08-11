<?php 

	require "conexao.php";
	
	$i=0;
	
	//$resultado = mysql_query('SELECT nome,nm_logrado,nu_numero,nu_cep FROM dados da,bairros ba WHERE da.cod_bairro = ba.cod_bairro AND nome <> "" AND nm_logrado <> "" LIMIT 10') or die(mysql_error());
	$resultado = mysql_query('SELECT nu_cep,nu_notific FROM novo WHERE nu_cep <> "" AND nm_logrado IS NULL') or die(mysql_error());
	
	while($linha = mysql_fetch_array($resultado)){ 
		$r[$i][0] = $linha['nu_notific'];
		$r[$i++][1] = $linha['nu_cep'];
	}

	
	echo (json_encode($r));
?>
