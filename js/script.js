// Global script for La Tostelería
// - Navigation hover effects
// - Load products.json and render gallery (used in galeria.html)

$(document).ready(function(){
  // Nav hover subtle effect handled by CSS; here add small JS enhancement
  $('.nav-link').hover(function(){
    $(this).addClass('shadow-sm');
  }, function(){
    $(this).removeClass('shadow-sm');
  });

  // If on gallery page, load products
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