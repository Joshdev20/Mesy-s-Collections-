import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Product from './pages/Product.js';

const headerContainer = document.getElementById('header');
const footerContainer = document.getElementById('footer');
const mainContainer = document.getElementById('main');

headerContainer.innerHTML = Header();
footerContainer.innerHTML = Footer();
mainContainer.innerHTML = Product();
