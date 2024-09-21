

const container = document.querySelector('.routs');
console.log(container);
  fetch("https://66ea8ceb55ad32cda4795eb2.mockapi.io/place")
  .then((resp) => {
    console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.statusText || "Примисово прокидаємо в catch");
    }
    return resp.json();
  })
    .then((data) => {
      console.log(data)
       container.insertAdjacentHTML('beforeend', createMarkup(data));
    })
  .catch((err) => console.log(err));

  
  function createMarkup(globalData) {
    return globalData.map(({ name, avatar, id, link, createdAt }) => {
      return `<li class="rout-list">
        <img class="rout-img" src="${avatar}" alt="${id}">
        <h3 class="rout-item">${name}</h3>
        <p class="text">${createdAt}</p>
        <a href="${link}" class="text">Oficial link</a>
      </li>`;
    }).join('');
  }
  



