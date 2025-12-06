// Script global para La Tostelería
// - Efecto hover en la navegación
// - Carga productos desde productos.json y pinta la galería (galeria.html)

$(document).ready(function(){
  // Pequeño realce al hover de los links
  $('.nav-link').hover(function(){
    $(this).addClass('shadow-sm');
  }, function(){
    $(this).removeClass('shadow-sm');
  });

  // Si estamos en la galería, cargar productos
  if($('#gallery').length){
    loadProducts();
  }
});

function loadProducts(){
  $.getJSON('assets/data/productos.json')
    .done(function(data){
      renderProducts(data);
    })
    .fail(function(err){
      console.error('Error loading products:', err);
      $('#gallery').html('<div class="alert alert-warning">No se pudieron cargar los productos.</div>');
    });
}

function renderProducts(products){
  const $gallery = $('#gallery');
  $gallery.empty();
  products.forEach(function(p){
    const card = `
      <div class="col">
        <div class="card card-rustic h-100">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">${p.descripcion}</p>
            <p class="fw-bold text-brown">${p.precio}</p>
          </div>
        </div>
      </div>
    `;
    $gallery.append(card);
  });
}