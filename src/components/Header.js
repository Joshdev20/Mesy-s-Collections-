const Header = () => {
    return `
        <nav class="bg-white shadow-lg">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between">
                    <div class="flex space-x-4">
                        <div>
                            <a href="/" class="flex items-center py-4 px-2">
                                <span class="font-bold text-gray-700 text-lg">Mesy’s Collections</span>
                            </a>
                        </div>
                        <div class="hidden md:flex items-center space-x-1">
                            <a href="/" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Home</a>
                            <a href="/shop" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Shop</a>
                        </div>
                    </div>
                    <div class="hidden md:flex items-center space-x-3">
                        <a href="/cart" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-count">0</span>
                        </a>
                        <a href="/admin" class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
                            Admin
                        </a>
                    </div>
                    <div class="md:hidden flex items-center">
                        <button class="outline-none mobile-menu-button">
                            <svg class="w-6 h-6 text-gray-500 hover:text-green-500"
                                x-show="!showMenu"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                            <path d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="hidden mobile-menu">
                <a href="/" class="block py-2 px-4 text-sm bg-white hover:bg-gray-200">Home</a>
                <a href="/shop" class="block py-2 px-4 text-sm bg-white hover:bg-gray-200">Shop</a>
            </div>
        </nav>
    `;
};

export default Header;
