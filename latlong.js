var mapOptions = {
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center: new google.maps.LatLng(-22.9108558, -43.5884176)
};
var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
var geocoder = new google.maps.Geocoder();
var r = 0;
var qtErros = 0;
$.getJSON('carregaEnderecos.php', function(re){
    console.log(re);
	r = re;
	busca(0);
});
function busca(i) {
    //console.log(r);
	$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+r[i][1] + ", " + r[i][2] +" - " + r[i][0] + ", Rio de Janeiro - RJ"+'&sensor=false', null, function (data) {
//		console.log(data);
//		var p = data.results[0].geometry.location;
//		var latlng = new google.maps.LatLng(p.lat, p.lng);
//		$.post("cadastraPosicao.php",{'lat':p.lat,'lng':p.lng,'id':r[i][3]},function(t){	//Centroide
//			//console.log("CENTROIDE");
//            
//            busca(i+1);	
//		});
//        
        if(data.status == "OK") {
			var p = data.results[0].geometry.location;
			var latlng = new google.maps.LatLng(p.lat, p.lng);
			$.post("cadastraPosicao.php",{'lat':p.lat,'lng':p.lng,'id':r[i][3]},function(t){ //Encontrou endereco
				busca(i+1);	
			});
		} else { 
			console.log("N ACHOU");
			qtErros++; 
			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+r[i][0] + ", Rio de Janeiro - RJ"+'&sensor=false', null, function (data) {
				//console.log(data);
				var p = data.results[0].geometry.location;
				var latlng = new google.maps.LatLng(p.lat, p.lng);
				$.post("cadastraPosicao.php",{'lat':p.lat,'lng':p.lng,'id':r[i][3]},function(t){	//Centroide
					console.log("CENTROIDE");
                    busca(i+1);	
				});
			});		
		}	
        
        
	});	
    
}// Logradouro, número - bairro, Rio de Janeiro - RJ
