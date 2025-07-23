const Home = () => {
    return `
        <div class="container mx-auto mt-8">
            <div class="bg-cover bg-center h-96 text-white flex items-center" style="background-image: url('https://via.placeholder.com/1200x400')">
                <div class="text-center w-full">
                    <h1 class="text-5xl font-bold">Welcome to Mesy’s Collections</h1>
                    <p class="text-xl mt-4">Discover the latest trends in fashion</p>
                    <a href="/shop" class="mt-8 inline-block bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600">Shop Now</a>
                </div>
            </div>
        </div>
    `;
};

export default Home;
