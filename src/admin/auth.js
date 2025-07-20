import { auth } from '../firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = '/admin/dashboard.html';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        if (window.location.pathname !== '/admin/dashboard.html') {
            window.location.href = '/admin/dashboard.html';
        }
    } else {
        if (window.location.pathname === '/admin/dashboard.html') {
            window.location.href = '/admin/';
        }
    }
});
