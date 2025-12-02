

var map;
var directionsService;
var directionsRenderer;
var destinationLatLng = { lat: 10.027863216519693, lng: -84.20398087273193 };

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: destinationLatLng,
    zoom: 15,
    mapTypeControl: false,
    streetViewControl: false
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  var marker = new google.maps.Marker({
    position: destinationLatLng,
    map: map,
    title: 'La Tostelería'
  });

  var info = new google.maps.InfoWindow({
    content: '<strong>La Tostelería</strong><br>Panadería tradicional'
  });

  marker.addListener('click', function(){
    info.open(map, marker);
  });
}

var userCurrentLocation = null;

function calcularRuta(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userCurrentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var request = {
        origin: userCurrentLocation,
        destination: destinationLatLng,
        travelMode: 'DRIVING'
      };

      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsRenderer.setDirections(result);
          document.getElementById('btnNavegar').disabled = false;
        } else {
          alert('No se pudo calcular la ruta: ' + status);
        }
      });
    }, function() {
      alert('No se pudo obtener tu ubicación. Por favor, activa el GPS.');
    });
  } else {
    alert('Tu navegador no soporta geolocalización.');
  }
}

function iniciarNavegacion(){
  if(!userCurrentLocation) return;
  
  var destLat = destinationLatLng.lat;
  var destLng = destinationLatLng.lng;
  var originLat = userCurrentLocation.lat;
  var originLng = userCurrentLocation.lng;
  
  // Detectar si es móvil o tablet
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if(isMobile){
    // Para dispositivos móviles, usar el esquema universal que abre la app nativa
    var url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
    window.open(url, '_blank');
  } else {
    // Para desktop, abrir Google Maps en nueva pestaña
    var url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
    window.open(url, '_blank');
  }
}
