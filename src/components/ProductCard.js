const ProductCard = (product) => {
    return `
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <a href="/product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
            </a>
            <div class="p-4">
                <a href="/product.html?id=${product.id}">
                    <h3 class="text-lg font-semibold">${product.name}</h3>
                </a>
                <p class="text-gray-600">$${product.price}</p>
                <button data-product-id="${product.id}" class="add-to-cart-btn mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
};

export default ProductCard;
