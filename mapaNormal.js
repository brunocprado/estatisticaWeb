var mapOptions = {
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center: new google.maps.LatLng(-22.9108558, -43.5884176)
};
var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
var geocoder = new google.maps.Geocoder();
$.getJSON('carregaPosicoes.php', function(r){
	console.log(r);
	for(i=0;i<r.length;i++){
		busca(r[i]);
	}
});
function busca(r) {
	var latlng = new google.maps.LatLng(r[0], r[1]);
	new google.maps.Marker({
		position: latlng,
		map: map
	});	
}
