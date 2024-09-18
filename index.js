

const container = document.querySelector('.routs');
console.log(container);

let globalData;

async function serviceCountry() {
  const resp = await fetch(`https://66ea8ceb55ad32cda4795eb2.mockapi.io/place`);

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.json();
}

serviceCountry()
  .then(data => {
    console.log(data);
    globalData = data;
  })
  .catch(err => console.log(err));

setTimeout(() => {
  console.log(globalData);
  
  function createMarkup() {
    return globalData.map(({ name, avatar, id }) => {
      return `<li class="rout-list">
        <h3 class="rout-item">${name}</h3>
        <img class="rout-img" src="${avatar}" alt="${id}">
      </li>`;
    }).join('');
  }
  
  container.insertAdjacentHTML('beforeend', createMarkup());
}, 1000);



