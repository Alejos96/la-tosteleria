(function(){
  // Badge en el navbar donde se mostrará el clima
  const badge = document.getElementById('weatherBadge');
  if(!badge) return;

  // Coordenadas del negocio y endpoint de Open-Meteo (sin API key)
  const LAT = 10.027863;
  const LON = -84.203981;
  const ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&timezone=auto`;
  const REFRESH_MS = 5 * 60 * 1000; // 5 minutos

  // Convierte el código de clima a un ícono considerando día/noche
  const codeToIcon = (code, isDay)=>{
    const sun = { clear:'☀️', few:'🌤', clouds:'☁️', fog:'🌫', drizzle:'🌦', rain:'🌧', snow:'❄️', showers:'🌦', heavySnow:'🌨', storm:'⛈' };
    const moon = { clear:'🌙', few:'🌙☁️', clouds:'☁️', fog:'🌫', drizzle:'🌧', rain:'🌧', snow:'❄️', showers:'🌧', heavySnow:'🌨', storm:'⛈' };
    const set = isDay ? sun : moon;

    if(code === 0) return set.clear;
    if([1,2].includes(code)) return set.few;
    if([3].includes(code)) return set.clouds;
    if([45,48].includes(code)) return set.fog;
    if([51,53,55,56,57].includes(code)) return set.drizzle;
    if([61,63,65,66,67].includes(code)) return set.rain;
    if([71,73,75,77].includes(code)) return set.snow;
    if([80,81,82].includes(code)) return set.showers;
    if([85,86].includes(code)) return set.heavySnow;
    if([95,96,99].includes(code)) return set.storm;
    return 'ℹ️';
  };

  // Pinta en el badge la temperatura redondeada con su ícono
  const renderWeather = (tempC, code, isDay)=>{
    const icon = codeToIcon(code, isDay);
    const temp = Math.round(tempC);
    badge.textContent = `${icon} ${temp}°C`;
  };

  // Muestra error en caso de fallo
  const renderError = ()=>{
    badge.textContent = '⚠️';
  };

  // Llamada a la API y refresco periódico
  const fetchWeather = ()=>{
    fetch(ENDPOINT)
      .then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
      .then(data => {
        if(!data.current_weather) throw new Error('Sin datos');
        const { temperature, weathercode, is_day } = data.current_weather;
        renderWeather(temperature, weathercode, Boolean(is_day));
      })
      .catch(err => {
        console.error('Error obteniendo clima', err);
        renderError();
      });
  };

  fetchWeather();
  setInterval(fetchWeather, REFRESH_MS);
})();
