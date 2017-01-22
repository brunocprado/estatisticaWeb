$("#arqTabela").change(function(e){
    var arq = e.target.files[0];
    var leitor = new FileReader();
    leitor.onload = function(r) {
//        tabela = $.csv.toObjects(r.target.result);
        tabela = $.csv.toArrays(r.target.result);
        console.log(tabela);
        for(i=0;i<tabela.length;i++){
            posicoes.push(new google.maps.LatLng(tabela[i][0], tabela[i][1]));
        }
        adicionaMarcadores();
        geraMapaCalor();
    };
    leitor.readAsText(arq); 
});


var clusterMarcadores = new MarkerClusterer(mapa, [],{imagePath: './img/marcadores/m'});
function adicionaMarcadores() { //TODO:só adicionar qnd for usar (1a vez)
    var temp = null;
    if($("#checkMarcadores").is(":checked")){
         temp = mapa;
    }
    for(i=0;i<posicoes.length;i++){
        //var conteudo = "Idade,Renda,";
        var marcador = new google.maps.Marker({
            position: posicoes[marcadores.length]
//            map: temp
        });	
        var janela = new google.maps.InfoWindow({
           content: "aaa"
        });
        marcador.addListener("click",function(){
            janela.open(mapa,this); 
        });
        marcadores.push(marcador);
    }
    if(temp != null) { clusterMarcadores.addMarkers(marcadores); }
}
function mudaMarcadores(){
    if($("#checkMarcadores").is(":checked")){
         clusterMarcadores.addMarkers(marcadores);
    } else { clusterMarcadores.clearMarkers(); }
}