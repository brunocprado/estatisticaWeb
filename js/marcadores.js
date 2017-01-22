var marcadores = [];
var colunas = [];
var csvComLabel = true;

$("#arqTabela").change(function(e){
    var arq = e.target.files[0];
    var leitor = new FileReader();
    leitor.onload = function(r) {
        tabela = $.csv.toArrays(r.target.result);
        if(csvComLabel){       
            colunas = [];
            for(var c=0;c<tabela[0].length;c++){
                colunas.push(tabela[0][c]);
            }  
            tabela = tabela.splice(1,tabela.length);
        }
        for(i=0;i<tabela.length;i++){
            posicoes.push(new google.maps.LatLng(tabela[i][0], tabela[i][1]));
        }
        adicionaMarcadores();
        geraMapaCalor();
        criaTabela();   
    };
    leitor.readAsText(arq); 
});

function criaTabela(){
    $("#containerTabela").html("");
    var tmp = [];
    for(var i=0;i<colunas.length;i++){
        tmp[i] = {title: colunas[i]};
    }
    console.log(tmp);
    $('#containerTabela').DataTable( {
        data: tabela,
        colReorder: true,
        language: {
            url: "lib/datatables-ptbr.json"
        },
        columns: tmp,
    });
}

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