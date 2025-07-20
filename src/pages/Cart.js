import { getCart, removeFromCart, updateQuantity } from '../utils/cart.js';
import { db } from '../firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const Cart = async () => {
    const cartItems = getCart();

    if (cartItems.length === 0) {
        return '<h1>Your cart is empty</h1>';
    }

    let cartList = '';
    let subtotal = 0;

    for (const item of cartItems) {
        const productRef = doc(db, 'products', item.id);
        const productSnap = await getDoc(productRef);
        const product = productSnap.data();

        cartList += `
            <div class="flex items-center justify-between border-b py-4">
                <div class="flex items-center">
                    <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded">
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold">${product.name}</h3>
                        <p class="text-gray-600">$${product.price}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <input type="number" min="1" value="${item.quantity}" data-product-id="${item.id}" class="quantity-input w-16 text-center border rounded">
                    <button data-product-id="${item.id}" class="remove-from-cart-btn ml-4 text-red-500 hover:text-red-700">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        subtotal += product.price * item.quantity;
    }

    return `
        <div class="container mx-auto mt-8">
            <h1 class="text-3xl font-bold mb-8">Your Cart</h1>
            <div>
                ${cartList}
            </div>
            <div class="text-right mt-8">
                <p class="text-2xl font-bold">Subtotal: $${subtotal.toFixed(2)}</p>
                <button class="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Checkout
                </button>
            </div>
        </div>
    `;
};

export default Cart;
