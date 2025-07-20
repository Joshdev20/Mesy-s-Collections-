let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = () => {
    return cart;
};

export const addToCart = (productId, quantity = 1) => {
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }

    saveCart();
    updateCartCount();
};

export const updateCartCount = () => {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
};

export const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
};

export const updateQuantity = (productId, quantity) => {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity = quantity;
    }
    saveCart();
    updateCartCount();
};
