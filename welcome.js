const navLinks = document.querySelectorAll('.item-link');
const currentPath = window.location.pathname;
console.log(currentPath);

for (const link of navLinks) {
    if (link.href.includes(currentPath)) {
        link.classList.add("active-page");
        break;
    }
}