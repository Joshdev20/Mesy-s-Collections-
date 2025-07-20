import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Shop from './pages/Shop.js';
import Cart from './pages/Cart.js';

const headerContainer = document.getElementById('header');
const footerContainer = document.getElementById('footer');
const mainContainer = document.getElementById('main');

headerContainer.innerHTML = Header();
footerContainer.innerHTML = Footer();

// Basic router
const routes = {
    '/': '<h1>Home Page</h1>',
    '/shop': Shop,
    '/cart': Cart,
    '/admin': '<h1>Admin Page</h1>'
};

const navigate = async (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    const route = routes[path] || routes['/'];
    if (typeof route === 'function') {
        mainContainer.innerHTML = await route();
    } else {
        mainContainer.innerHTML = route;
    }
};

window.onpopstate = async () => {
    const route = routes[window.location.pathname];
    if (typeof route === 'function') {
        mainContainer.innerHTML = await route();
    } else {
        mainContainer.innerHTML = route || '<h1>404 Not Found</h1>';
    }
};

import { addToCart, updateCartCount, removeFromCart, updateQuantity } from './utils/cart.js';

/**
 * Rerenders the cart page if it's the current page.
 */
const rerenderCart = async () => {
    if (window.location.pathname === '/cart') {
        const cartModule = await import('./pages/Cart.js');
        mainContainer.innerHTML = await cartModule.default();
    }
};

/**
 * Initializes the application.
 */
document.addEventListener('DOMContentLoaded', async () => {
    updateCartCount();

    document.body.addEventListener('click', e => {
        const anchor = e.target.closest('a');
        if (anchor && anchor.matches('[href]')) {
            const href = anchor.getAttribute('href');
            if (href.startsWith('/')) {
                e.preventDefault();
                navigate(href);
            }
        }

        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.dataset.productId;
            addToCart(productId);
        }

        if (e.target.classList.contains('remove-from-cart-btn')) {
            const productId = e.target.dataset.productId;
            removeFromCart(productId);
            rerenderCart();
        }
    });

    document.body.addEventListener('keyup', async e => {
        if (e.target.id === 'search-bar') {
            const searchQuery = e.target.value;
            // This is a simplified approach. For a better UX, you would typically debounce this input.
            const productGrid = document.getElementById('product-grid');
            if (productGrid) {
                const shopModule = await import('./pages/Shop.js');
                const shopContent = await shopModule.default(searchQuery);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = shopContent;
                productGrid.innerHTML = tempDiv.querySelector('#product-grid').innerHTML;
            }
        }
    });

    document.body.addEventListener('change', e => {
        if (e.target.classList.contains('quantity-input')) {
            const productId = e.target.dataset.productId;
            const quantity = parseInt(e.target.value);
            updateQuantity(productId, quantity);
            rerenderCart();
        }
    });

    navigate(window.location.pathname);
});

const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
