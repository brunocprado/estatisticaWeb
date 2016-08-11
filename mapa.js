var mapOptions = {
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center: new google.maps.LatLng(-22.9108558, -43.5884176)
};
var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
var geocoder = new google.maps.Geocoder();
var heatmap;
$.getJSON('carregaPosicoes.php', function(r){
	console.log(r);
	for(i=0;i<r.length;i++){
		busca(r[i],i);
	}
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: dados,
		radius: 20,
		map: map
	});
});
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
var dados = [];
function busca(r,i) {
	dados[i] = new google.maps.LatLng(r[0], r[1]);
	// new google.maps.Marker({
		// position: latlng,
		// map: map
	// });	
}
