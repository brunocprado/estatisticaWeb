$.getJSON('carregaCeps.php', function(r){
	console.log(r);
	for(i=0;i<=r.length;i++){
		buscaCep(r[i][0],r[i][1]);
	}
}); //ID e CEP
var SQL = "";
function buscaCep(id,cep) {
	$.getJSON('http://cep.correiocontrol.com.br/' + cep.replace("-","") + '.json', function(c) { 
		console.log(cep + " " + c.logradouro)
	});
}
