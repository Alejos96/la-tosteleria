# La Tostelería — Documentación Técnica

**Autor:** Manuel Alejandro Soto Rojas  
**Cédula:** 116620142  
**Correo:** msotor@est.utn.ac.cr  
**Curso:** ISW-512 Diseño de Aplicaciones Web  
**Fecha:** Diciembre 2025  
**Emprendimiento:** La Tostelería (repostería artesanal)

---

## Resumen del sitio
- Páginas: Home, Galería, Acerca de, Contacto (todas con navbar/footer unificados, favicon e ícono de clima).
- Diseño: Mobile-First, estilo rústico, Bootstrap 5, colores de marca (#7C1006 fondo, #DCAF7C enlaces).
- Medios: Carrusel de productos reales, video decorativo en Acerca de, audio ambiental de chimenea opcional.
- Funcionalidad: Galería dinámica desde JSON local, formulario con validaciones y cálculo de edad, Google Maps con rutas y navegación, clima en tiempo real vía Open-Meteo.

---

## Características técnicas
- **Clima (API externa Open-Meteo):** `js/weather.js` consume clima actual (sin API key), muestra ícono día/noche y temperatura, refresca cada 5 min en el navbar.
- **Mapa y rutas (Google Maps):** `js/mapa.js` con DirectionsService/Renderer; botón "Cómo llegar" calcula ruta desde geolocalización; botón "Ir" abre app nativa (móvil) o Maps web (desktop).
- **Galería dinámica:** `galeria.html` carga `assets/data/productos.json` vía jQuery (`js/script.js`) y genera cards Bootstrap.
- **Formulario de contacto:** `contacto.html` + `js/validaciones.js`: valida email, nombre, fecha; calcula edad (visible y oculta); rango de ingreso 1-5 con etiquetas; género (radio), grado académico (checkbox), mensaje libre.
- **Audio ambiental:** Botón flotante en todas las páginas; `js/audio-control.js` controla play/pause, volumen 30%, guarda preferencia en localStorage (requiere `assets/audio/chimenea-ambiente.mp3`).
- **Navbar y footer unificados:** Logo, links, clima, redes (Instagram, WhatsApp) y datos del autor.
- **Comentarios en español:** HTML, CSS y JS documentados de forma breve.

---

## Estructura del proyecto
```
la-tosteleria/
├── index.html            # Home (carrusel, mapa, clima, audio)
├── galeria.html          # Galería dinámica desde productos.json
├── contacto.html         # Formulario con validaciones y clima
├── acerca-de.html        # Historia, misión/visión y video decorativo
├── css/
│   └── styles.css        # Estilos Mobile-First y audio-player
├── js/
│   ├── script.js         # Hover nav y carga de productos
│   ├── mapa.js           # Google Maps, rutas y navegación
│   ├── validaciones.js   # Validaciones y cálculo de edad
│   ├── weather.js        # Clima Open-Meteo (día/noche)
│   └── audio-control.js  # Botón flotante de audio
├── assets/
│   ├── img/              # Logo, favicon, imágenes de productos
│   ├── videos/           # Video decorativo
│   ├── audio/            # Audio de chimenea 
│   └── data/
│       └── productos.json# Datos de productos
└── README.md             # Este documento
```

---

## Tecnologías
- HTML5, CSS3, JavaScript (ES6+), jQuery 3.7.0
- Bootstrap 5.3.2 (CDN)
- Google Maps JavaScript API (Maps + Directions)
- Open-Meteo (API externa sin llave)
- Google Fonts: Playfair Display, Open Sans

---

## Instrucciones de uso
### Servidor local 
- Usar LiveServer

### Configurar Google Maps
- Clave actual en `index.html` (script de Maps). Sustituir por tu propia API key si lo deseas.
- Habilitar Maps JavaScript API y Directions API en Google Cloud.

### Audio ambiental
- El botón flotante controla play/pause y recuerda la preferencia del usuario.

### Clima (Open-Meteo)
- Sin necesidad de API key.
- Coordenadas usadas: 10.027863, -84.203981 (ubicación del negocio).
- Se actualiza cada 5 minutos y adapta ícono a día/noche.

### Validaciones del formulario
- Email con RegEx y estado inválido de Bootstrap.
- Nombre obligatorio (trim).
- Fecha de nacimiento calcula edad (visible y oculta).
- Rango de ingreso 1-5 con etiquetas de texto.
- Género (radio), grado académico (checkbox), mensaje libre.

### Galería de productos
- Fuente de datos: `assets/data/productos.json`.
- Carga y render dinámico con jQuery en `galeria.html`.

---

