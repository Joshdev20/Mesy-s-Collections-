import { db } from '../firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const Product = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        return '<h1>Product not found</h1>';
    }

    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    const product = productSnap.data();

    if (!product) {
        return '<h1>Product not found</h1>';
    }

    return `
        <div class="container mx-auto mt-8">
            <div class="flex flex-col md:flex-row">
                <div class="md:w-1/2">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-auto object-cover rounded-lg">
                </div>
                <div class="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    <h1 class="text-3xl font-bold">${product.name}</h1>
                    <p class="text-gray-600 text-2xl mt-2">$${product.price}</p>
                    <p class="mt-4">${product.description}</p>
                    <button data-product-id="${product.id}" class="add-to-cart-btn mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
};

export default Product;
