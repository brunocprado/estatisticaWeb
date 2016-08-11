<?php 

	require "conexao.php";
	
	$i=0;
	
	//$resultado = mysql_query('SELECT nome,nm_logrado,nu_numero,nu_cep FROM dados da,bairros ba WHERE da.cod_bairro = ba.cod_bairro AND nome <> "" AND nm_logrado <> "" LIMIT 10') or die(mysql_error());
	$resultado = mysql_query('SELECT nm_bairro,nm_logrado,nu_numero,nu_notific FROM auto WHERE nm_bairro <> "" AND lat=1') or die(mysql_error());
	$t = "[";
	while($linha = mysql_fetch_array($resultado)){ 
		$t .= '{"0":"';
		$t .= utf8_encode($linha['nm_bairro']) .'","1":"';
		$t .= $linha['nm_logrado'].'","3":"';
		$t .= $linha['nu_notific'].'","2":"';
		$t .= $linha['nu_numero'] .'"';
		$t .= "}"; 
		if($i < mysql_num_rows($resultado) -1){ $t .= ","; }
		$i++;
	}
	$t .= "]";
	
	//echo (json_encode($r));
	echo $t;
?>
