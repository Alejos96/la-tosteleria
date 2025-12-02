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
      $('#gallery').html('<div class="col-12">Error cargando productos.</div>');
      console.error('Error cargando JSON', err);
    });
}

function renderProducts(products){
  const $gallery = $('#gallery');
  $gallery.empty();
  products.forEach(function(p){
    const card = `
      <div class="col-12 col-sm-6 col-md-4">
        <div class="card card-rustic">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">${p.descripcion}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted">${p.precio}</span>
              <button class="btn btn-sm btn-rustic">Pedir</button>
            </div>
          </div>
        </div>
      </div>
    `;
    $gallery.append(card);
  });
}