// audio-control.js
// Control de audio ambiental en todo el sitio

document.addEventListener('DOMContentLoaded', function(){
  const audio = document.getElementById('audioAmbiente');
  const toggleBtn = document.getElementById('toggleAudio');
  const audioIcon = document.getElementById('audioIcon');
  
  if(!audio || !toggleBtn || !audioIcon) return;
  
  // Verificar si el usuario ya activó el audio antes (localStorage)
  const audioActivado = localStorage.getItem('audioAmbiente') === 'true';
  
  // Configurar volumen al 30%
  audio.volume = 0.3;
  
  if(audioActivado){
    audio.play().catch(err => {
      console.log('Autoplay bloqueado por el navegador:', err);
      // Si el autoplay falla, mantener el icono en mudo
      audioIcon.textContent = '🔇';
    });
    audioIcon.textContent = '🔊';
  }
  
  // Toggle audio on/off
  toggleBtn.addEventListener('click', function(){
    if(audio.paused){
      audio.play();
      audioIcon.textContent = '🔊';
      localStorage.setItem('audioAmbiente', 'true');
    } else {
      audio.pause();
      audioIcon.textContent = '🔇';
      localStorage.setItem('audioAmbiente', 'false');
    }
  });
});
