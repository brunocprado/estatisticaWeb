var opcoesMapa = {
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center: new google.maps.LatLng(-22.9108558, -43.5884176)
};
var mapa = new google.maps.Map(document.getElementById('mapa'), opcoesMapa);

var geocoder = new google.maps.Geocoder();
var data;
var compactador = new COMPACTADOR();

var tabela;
var posicoes = [];
var mapaCalor;

$(function() {   
    document.getElementById('container').addEventListener('dragenter',mostraDrag,false);
    var dropContainer = document.getElementById('drop-silhouette');
    dropContainer.addEventListener('dragover', mostraDrag, false);
    dropContainer.addEventListener('drop', handleDrop, false);
    dropContainer.addEventListener('dragleave', escondeDrag, false);
});

$(".menu.selecionavel").click(function(e){
    $(".menu").not(this).removeClass("ativo");
    $(this).addClass("ativo");
    
    $("[ativo=true]").attr("ativo",false);
    $("#" + $(this).attr("div")).attr("ativo",true);
    
    if($(this).attr("div") != "mapa") { $("#menuMapa").hide(); } else { $("#menuMapa").show(); }
});

$("#menuInicio").click(function(e){
    $("#arqTabela").trigger("click");
});
$("#menuMalha").click(function(e){
    $("#arqMalha").trigger("click");
});


//=====| Menu Mapa |=====//
$("#checkMarcadores").change(function(e){ 
    if($(this).is(":checked")){
        mudaMarcadores();
    } else {
        mudaMarcadores();
    }    
});
$("#checkMalha").change(function(e){ 
    if($(this).is(":checked")){
        //mudaMarcadores(mapa);
    } else {
       // mudaMarcadores(null);
    }    
});
$("#checkDensidade").change(function(e){ 
    if(mapaCalor != null) { mapaCalor.setMap(mapaCalor.getMap() ? null : mapa); }
});
//======================//


//========| Mapa Calor |========//
function geraMapaCalor(){
    var temp = null;
    if($("#checkDensidade").is(":checked")){
         temp = mapa;
    }
    mapaCalor = new google.maps.visualization.HeatmapLayer({
		data: posicoes,
		radius: 20,
		map: temp
	});
}
//=============================//


var tmp;

function carregaGeoJSON(conteudo){	
    eval("var myData = "+data.toString()+";");

    var myShapesComp = myData.shapes;
    console.log(myShapesComp);
    loadedBounds[0] = {NORTE: myData.bounds.NORTE, SUL: myData.bounds.SUL, LESTE: myData.bounds.LESTE, OESTE: myData.bounds.OESTE};

    fitBounds();

    for (var codarea in myShapesComp)
    {
        var myShapes = compactador.descompacta(myShapesComp[codarea]);

        var aux1 = new google.maps.MVCArray();
        for (var i=0; i<myShapes.length; i++)
        {
            var aux2 = new google.maps.MVCArray();
            if (i==0)
            {
                for (var j=0; j<myShapes[i].length; j++)
                    aux2.push(new google.maps.LatLng(myShapes[i][j][0], myShapes[i][j][1]));
            }
            else// inverte para fazer buracos
            {
                for (var j=myShapes[i].length-1; j>=0; j--)
                    aux2.push(new google.maps.LatLng(myShapes[i][j][0], myShapes[i][j][1]));
            }
            // baca para não desenhar os pelinhos...
            if (aux2.getLength() > 10 || aux2.getAt(0).toString() != aux2.getAt(aux2.getLength() - 1).toString())
                aux1.push(aux2)
        }
        tmp = new google.maps.Polygon({
            map:			mapa,
            clickable:		true,
            fillColor:		"#eee",
            fillOpacity:	1,
            strokeColor:	"#555",
            strokeWeight:	0.5,
            strokeOpacity:	1,
            paths:			aux1,
            id:				codarea
        });
        google.maps.event.addListener(tmp, 'click', function() {
            popUpDashboard(this.id);
        });
    }
}
var loadedBounds = [];
function fitBounds(){
    console.log(loadedBounds);
	var mapBounds = new google.maps.LatLngBounds();
//	for (var i in munsAtivos)
//	{
		mapBounds.extend(new google.maps.LatLng(loadedBounds[0].SUL, loadedBounds[0].OESTE));
		mapBounds.extend(new google.maps.LatLng(loadedBounds[0].NORTE, loadedBounds[0].LESTE));
//	}
	mapa.fitBounds(mapBounds);
}


function popUpDashboard(id){
    alert(id);
//	$('div#popDasboard').remove();
//	
//	var w = 900;
//	var h = 600;
//	$('body').prepend('<div id="popDasboard" title="Clique para fechar a janela."><p class="fechar" title="Fechar janela." style="margin-top:' + ($(window).height()>h ? Math.round(($(window).height()-h)*0.5) : 0) +'px;">Fechar [x]&nbsp;&nbsp;</p><div class="menu"><iframe src="dashboard.html?cod='+id+'" width="'+w+'" height="'+h+'" border="0" style="margin-top:0; margin-left:' + ($(window).width()>w ? Math.round(($(window).width()-w)*0.5) : 0) +'px;"></iframe></div><div>');
//	
//	$('div#popDasboard').click(function(){
//		$(this).remove();
//	});
}


function mudaGradiente(){
	var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function mostraDrag(e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById('drop-silhouette').style.display = 'block';
    //document.getElementById('menuMapa').style.display = 'none';
    return false;
}
function escondeDrag(e) {
    document.getElementById('drop-silhouette').style.display = 'none';
    document.getElementById('menuMapa').style.display = 'block';
}
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    escondeDrag(e);

    var arquivos = e.dataTransfer.files;
//MOSTRA LOADING
    if (arquivos.length) {
        for (var i=0;i<arquivos.length;i++) {
            var leitor = new FileReader();
            leitor.nome = arquivos[i].name;
            leitor.onload = function(e) {
                //VERIFICA TIPO
                if(e.target.nome.endsWith(".shp")){
                    var shapefile = new Shapefile({
                        shp: arquivos[0]
                    }, function(data){
                        mapa.data.addGeoJson(data.geojson);
                    });
                    
                } else if(e.target.nome.endsWith(".csv")) {
                    
                } else {
                    //carregaGeoJSON(e.target.result);
                }
            };
            //reader.onerror = function(e) {
             //   console.error('reading failed');
            //};
            leitor.readAsText(arquivos[i]);
        }
    }
}