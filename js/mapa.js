

var map;
var directionsService;
var directionsRenderer;
var destinationLatLng = { lat: 10.027863216519693, lng: -84.20398087273193 };

function initMap(){
  // Configura el mapa centrado en la ubicación del negocio
  map = new google.maps.Map(document.getElementById('map'), {
    center: destinationLatLng,
    zoom: 15,
    mapTypeControl: false,
    streetViewControl: false
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Marcador del negocio
  var marker = new google.maps.Marker({
    position: destinationLatLng,
    map: map,
    title: 'La Tostelería'
  });

  // Texto emergente con datos básicos
  var info = new google.maps.InfoWindow({
    content: '<strong>La Tostelería</strong><br>Panadería tradicional'
  });

  marker.addListener('click', function(){
    info.open(map, marker);
  });
}

var userCurrentLocation = null;

function calcularRuta(){
  // Solicita geolocalización y traza la ruta en el mapa
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
  // Abre Google Maps con navegación desde la ubicación actual
  if(!userCurrentLocation) return;
  
  var destLat = destinationLatLng.lat;
  var destLng = destinationLatLng.lng;
  var originLat = userCurrentLocation.lat;
  var originLng = userCurrentLocation.lng;
  
  // Detectar si es móvil o tablet
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if(isMobile){
    // En móvil, abre la app nativa de mapas
    var url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
    window.open(url, '_blank');
  } else {
    // En desktop, abre Google Maps en nueva pestaña
    var url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
    window.open(url, '_blank');
  }
}
