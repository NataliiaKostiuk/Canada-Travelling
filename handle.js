 export function createMarkup(globalData) {
  return globalData.map(({ name, avatar, id, link, createdAt, weather }) => {
    const { avgtemp_c, condition: { icon, text } } = weather || {}; 
    return `<li class="rout-list" data-id="${id}">
        <img class="rout-img" src="${avatar}" alt="${id}"/>
      <h3 class="rout-item">${name}</h3>
      <p class="text">${createdAt}</p>
      <div class="wrap-weather">
      <a class="rout-link" href="${link}" target="_blank">Official link</a>
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
 
export function addClassActive() {
    const navLinks = document.querySelectorAll('.item-link');
const currentPath = window.location.pathname;
for (const link of navLinks) {
    if (link.href.includes(currentPath)) {
        link.classList.add("active-page");
        break;
    }
}
}