const input = document.querySelector('.input');
const container = document.querySelector('.routs');
input.addEventListener('input', handelSearch);


let globalData = []; 

async function fetchData() {
  try {
    const resp = await fetch("https://66eed6173ed5bb4d0bf21c25.mockapi.io/canada");
    if (!resp.ok) {
      throw new Error(resp.statusText || "Error");
    }
    const data = await resp.json();
    const forecasts = await Promise.all(data.map(async (obj) => {
      const weather = await serviceSearchWearter(obj.location);
      return { ...obj, weather }; 
    }));
     globalData = forecasts;

    container.insertAdjacentHTML('beforeend', createMarkup(forecasts)); 
    renderSavedHearts();
    container.addEventListener('click', hendlerClick);
  } catch (err) {
    console.log(err);
  }
}

fetchData();

 async function serviceSearchWearter(city) {
  try {
    const BASE_URL = "https://api.weatherapi.com/v1";
    const API_KEY = "bd3aded53f7b40c49d5231513232108";
    const resp = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&lang=en`);

    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    const data = await resp.json();
    return data.forecast.forecastday[0].day;
  } catch (err) {
    console.log(err);
  }
}

function createMarkup(globalData) {
  return globalData.map(({ name, avatar, id, link, createdAt, weather }) => {
    const { avgtemp_c, condition: { icon, text } } = weather || {}; 

    return `<li class="rout-list" data-id="${id}">
      <a href="path-to-large-image1.jpg">
        <img class="rout-img" src="${avatar}" alt="${id}"/>
      </a>
      <h3 class="rout-item">${name}</h3>
      <p class="text">${createdAt}</p>
      <div class="wrap-weather">
      <a class="rout-link" href="${link}" class="link-rout">Official link</a>
      <div class="forecast">
        ${weather ? `
          <img src="${icon}" alt="Weather icon" />
          <p class="degree"> ${avgtemp_c} °C</p>
        ` : '<p>We are working with it!!</p>'}
      </div>
      </div>
      <svg class="svg-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="23">
        <path d="M462.3 62.7C407.5 15.9 326.8 24 275.4 79.5L256 99.1L236.6 79.5C185.2 24 104.5 15.9 49.7 62.7C-16.6 122.4-16.6 227.5 49.7 287.3L233.2 467.5C240.6 474.6 248.3 480 256 480C263.7 480 271.4 474.6 278.8 467.5L462.3 287.3C528.6 227.5 528.6 122.4 462.3 62.7zM256 434.6L72.6 255.3C24.5 209.9 24.5 140.1 72.6 94.7C118.9 52.3 185.6 58.1 231.4 107.7L256 133.6L280.6 107.7C326.4 58.1 393.1 52.3 439.4 94.7C487.5 140.1 487.5 209.9 439.4 255.3L256 434.6z"/>
      </svg>
    </li>`;
  }).join('');
}



function handelSearch() {
  const searchValue = input.value.toLowerCase(); 
  const filteredData = globalData.filter((item) => 
    item.name.toLowerCase().includes(searchValue) );
  container.innerHTML = createMarkup(filteredData); 
}



const PRODUCT_LS_KEY = 'checkout';
  
function renderSavedHearts() {
  const savedCards = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY)) || [];
  const cardElements = document.querySelectorAll('.rout-list');
  cardElements.forEach((cardElement) => {
    const cardId = cardElement.dataset.id;
    const isCardSaved = savedCards.some((card) => card.id === cardId);
    const heartElement = cardElement.querySelector('.svg-heart');

    if (isCardSaved) {
      heartElement.classList.add('svg-heart-red');
    } else {
      heartElement.classList.remove('svg-heart-red');
    }
  });
}


function hendlerClick(evt) {
  if (!evt.target.classList.contains('svg-heart')) {
    return;
  }
  const card = evt.target.closest('.rout-list');
  const cardId = card.dataset.id;
  const currentCard = globalData.find((data) => data.id === String(cardId));      
  let savedCards = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY)) || [];
  const isCardAlreadySaved = savedCards.some((card) => card.id === cardId);
  if (isCardAlreadySaved) {
    savedCards = savedCards.filter((card) => card.id !== cardId);
    evt.target.classList.remove('svg-heart-red');
  } else { 
    savedCards.push(currentCard);
    evt.target.classList.add('svg-heart-red'); 
  }
  localStorage.setItem(PRODUCT_LS_KEY, JSON.stringify(savedCards));
}

