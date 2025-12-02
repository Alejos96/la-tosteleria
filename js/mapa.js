// mapa.js
// Google Maps initialization for La Tostelería
// Replace coordinates with the real location if available.

function initMap(){
  // Example coordinates: Guatemala City
  var latLng = { lat: 14.634915, lng: -90.506882 };
  var map = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: 14,
    mapTypeControl: false,
    streetViewControl: false
  });

  var marker = new google.maps.Marker({
    position: latLng,
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
