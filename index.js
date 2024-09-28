import { createMarkup, addClassActive } from "./handle.js";

const input = document.querySelector('.input');
const container = document.querySelector('.routs');
input.addEventListener('input', handelSearch);
addClassActive();

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

