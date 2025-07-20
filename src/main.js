import Header from './components/Header.js';
import Footer from './components/Footer.js';

const headerContainer = document.getElementById('header');
const footerContainer = document.getElementById('footer');
const mainContainer = document.getElementById('main');

headerContainer.innerHTML = Header();
footerContainer.innerHTML = Footer();

// Basic router
const routes = {
    '/': '<h1>Home Page</h1>',
    '/shop': '<h1>Shop Page</h1>',
    '/cart': '<h1>Cart Page</h1>',
    '/admin': '<h1>Admin Page</h1>'
};

const navigate = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    mainContainer.innerHTML = routes[path] || '<h1>404 Not Found</h1>';
};

window.onpopstate = () => {
    mainContainer.innerHTML = routes[window.location.pathname] || '<h1>404 Not Found</h1>';
};

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[href]')) {
            e.preventDefault();
            navigate(e.target.getAttribute('href'));
        }
    });
    mainContainer.innerHTML = routes[window.location.pathname] || '<h1>404 Not Found</h1>';
});

const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
