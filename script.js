// Variables globales
const apiUrl = 'https://raw.githubusercontent.com/DUMITRUNSC/ProyectoLenguajeMarcas/main/api.json'; // URL del archivo JSON que contiene los datos de los asteroides
let asteroidData = null; // Almacena los datos de los asteroides
let currentAsteroidIndex = 0; // Índice del asteroide actualmente mostrado

// Obtener los datos de los asteroides del JSON
fetch(apiUrl)
  .then(response => response.json()) // Convertir la respuesta en formato JSON
  .then(data => {
    asteroidData = data; // Almacenar los datos de los asteroides
    const nearEarthObjects = data.near_earth_objects; // Obtener los asteroides cercanos a la Tierra

    // Obtener el asteroide "465633 (2009 JR5)" de la fecha "2015-09-08"
    const asteroidJR5 = nearEarthObjects['2015-09-08'].find(asteroid => asteroid.name === '465633 (2009 JR5)');

    // Mostrar el asteroide "465633 (2009 JR5)" en el contenedor "asteroid-info"
    showAsteroid(asteroidJR5, 'asteroid-info');

    // Obtener el botón "Ver más asteroides vistos" y asignarle el evento click
    const moreAsteroidsBtn = document.getElementById('more-asteroids-btn');
    moreAsteroidsBtn.addEventListener('click', showNextAsteroid);
  });

// Mostrar la información de un asteroide en un contenedor
function showAsteroid(asteroid, containerId) {
  const asteroidInfoContainer = document.getElementById(containerId);
  asteroidInfoContainer.innerHTML = '';

  const card = createAsteroidCard(asteroid); // Crear una tarjeta de asteroide con los datos proporcionados
  asteroidInfoContainer.appendChild(card); // Agregar la tarjeta al contenedor
}

// Mostrar el siguiente asteroide al hacer clic en el botón "Ver más asteroides vistos"
function showNextAsteroid() {
  const nearEarthObjects = asteroidData.near_earth_objects; // Obtener los asteroides cercanos a la Tierra
  const dateToShow = '2015-09-08'; // Fecha de los asteroides a mostrar
  let asteroidsToShow = nearEarthObjects[dateToShow]; // Obtener los asteroides de la fecha especificada

  // Filtrar el asteroide con nombre de la lista
  asteroidsToShow = asteroidsToShow.filter(asteroid => asteroid.name !== '465633 (2009 JR5)');

  currentAsteroidIndex++; // Incrementar el índice del asteroide actual

  if (currentAsteroidIndex >= asteroidsToShow.length) {
    currentAsteroidIndex = 0; // Reiniciar el índice si se alcanza el límite de la lista
  }

  const asteroid = asteroidsToShow[currentAsteroidIndex]; // Obtener el siguiente asteroide a mostrar
  showAsteroid(asteroid, 'more-asteroids-info'); // Mostrar el asteroide en el contenedor "more-asteroids-info"
}

// Crear una tarjeta de asteroide con los detalles proporcionados
function createAsteroidCard(asteroid) {
  const card = document.createElement('div'); // Crear un elemento div para la tarjeta
  card.classList.add('asteroid-card'); // Agregar la clase "asteroid-card" al elemento

  const asteroidName = document.createElement('h2'); // Crear un elemento h2 para el nombre del asteroide
  asteroidName.textContent = asteroid.name; // Establecer el nombre del asteroide como contenido del elemento
  card.appendChild(asteroidName); // Agregar el elemento al elemento de la tarjeta

  const diameter = document.createElement('p'); // Crear un elemento p para el diámetro estimado
  diameter.textContent = `Estimated Diameter: ${asteroid.estimated_diameter.kilometers.estimated_diameter_max} km`; // Establecer el diámetro estimado como contenido del elemento
  card.appendChild(diameter); // Agregar el elemento al elemento de la tarjeta

  const hazardous = document.createElement('p'); // Crear un elemento p para indicar si es potencialmente peligroso
  hazardous.textContent = `Potentially Hazardous: ${asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}`; // Establecer el texto correspondiente según si es potencialmente peligroso o no
  card.appendChild(hazardous); // Agregar el elemento al elemento de la tarjeta

  const closeApproach = asteroid.close_approach_data[0]; // Obtener los datos de aproximación cercana
  const approachDate = document.createElement('p'); // Crear un elemento p para la fecha de aproximación
  approachDate.textContent = `Close Approach Date: ${closeApproach.close_approach_date_full}`; // Establecer la fecha de aproximación como contenido del elemento
  card.appendChild(approachDate); // Agregar el elemento al elemento de la tarjeta

  const velocity = document.createElement('p'); // Crear un elemento p para la velocidad relativa
  velocity.textContent = `Relative Velocity: ${closeApproach.relative_velocity.kilometers_per_hour} km/h`; // Establecer la velocidad relativa como contenido del elemento
  card.appendChild(velocity); // Agregar el elemento al elemento de la tarjeta

  const missDistance = document.createElement('p'); // Crear un elemento p para la distancia de aproximación
  missDistance.textContent = `Miss Distance: ${closeApproach.miss_distance.kilometers} km`; // Establecer la distancia de aproximación como contenido del elemento
  card.appendChild(missDistance); // Agregar el elemento al elemento de la tarjeta

  return card; // Devolver la tarjeta creada
}

