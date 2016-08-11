<?php 

	require "conexao.php";
	
	$i=0;
	
	//$resultado = mysql_query('SELECT nome,nm_logrado,nu_numero,nu_cep FROM dados da,bairros ba WHERE da.cod_bairro = ba.cod_bairro AND nome <> "" AND nm_logrado <> "" LIMIT 10') or die(mysql_error());
	$resultado = mysql_query('SELECT lat_oco,lng_oco FROM novo WHERE lat_oco IS NOT NULL') or die(mysql_error());
	
	while($linha = mysql_fetch_array($resultado)){ 
		$r[$i][0] = $linha['lat_oco'];
		$r[$i++][1] = $linha['lng_oco'];
	}

	
	echo (json_encode($r));
?>
