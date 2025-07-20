import { auth, db, storage } from '../firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const logoutBtn = document.getElementById('logout-btn');
const addProductBtn = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const modalTitle = document.getElementById('modal-title');
const productIdField = document.getElementById('product-id');

logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
});

addProductBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Add Product';
    productForm.reset();
    productIdField.value = '';
    productModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    productModal.classList.add('hidden');
});

const renderProducts = async () => {
    const productsCol = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCol);
    const products = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    productList.innerHTML = `
        <table class="min-w-full">
            <thead>
                <tr>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300"></th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded">
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">${product.name}</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">$${product.price}</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                            <button data-id="${product.id}" class="edit-btn text-blue-500 hover:text-blue-700">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button data-id="${product.id}" class="delete-btn text-red-500 hover:text-red-700 ml-4">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
};

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = productIdField.value;
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const imageFile = document.getElementById('product-image').files[0];

    let imageUrl = '';
    if (imageFile) {
        const storageRef = ref(storage, `products/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
    }

    const productData = { name, price, description, image: imageUrl };

    if (id) {
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, productData);
    } else {
        await addDoc(collection(db, 'products'), productData);
    }

    productModal.classList.add('hidden');
    renderProducts();
});

productList.addEventListener('click', async (e) => {
    if (e.target.closest('.edit-btn')) {
        const id = e.target.closest('.edit-btn').dataset.id;
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);
        const product = productSnap.data();

        modalTitle.textContent = 'Edit Product';
        productIdField.value = id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-description').value = product.description;
        productModal.classList.remove('hidden');
    }

    if (e.target.closest('.delete-btn')) {
        const id = e.target.closest('.delete-btn').dataset.id;
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteDoc(doc(db, 'products', id));
            renderProducts();
        }
    }
});

renderProducts();
