import ProductCard from '../components/ProductCard.js';
import { db } from '../firebase-config.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const Shop = async (searchQuery = '') => {
    let productsCol = collection(db, 'products');
    if (searchQuery) {
        productsCol = query(productsCol, where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
    }
    const productsSnapshot = await getDocs(productsCol);
    const products = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    const productList = products.map(product => ProductCard(product)).join('');

    return `
        <div class="container mx-auto mt-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold">Shop</h1>
                <input type="text" id="search-bar" placeholder="Search for products..." class="px-4 py-2 border rounded-lg">
            </div>
            <div id="product-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${productList}
            </div>
        </div>
    `;
};

export default Shop;
