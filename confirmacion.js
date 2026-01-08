function handleCredentialResponse(response) {
console.log("ID Token: " + response.credential);

const data = JSON.parse(atob(response.credential.split('.')[1]));
console.log("Usuario:", data);
document.body.innerHTML += `<p>Bienvenido ${data.name} (${data.email})</p>`;

window.location.replace("https://codificadordebool.onrender.com/principal");
}


window.onload = function () {
google.accounts.id.initialize({
    client_id: "214846363884-2qmhqaphakk26e0jusvpig5k2tk3makl.apps.googleusercontent.com",
    callback: handleCredentialResponse
});
google.accounts.id.renderButton(
    document.querySelector(".g_id_signin"),
    { theme: "outline", size: "large" }
);
google.accounts.id.prompt();
};


const form = document.getElementById('loginForm');
const btn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'Ingresando...';

const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value;

try {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
        const destino = data.redirectTo || 'principal';
        window.location.replace("https://codificadordebool.onrender.com/" + destino);
    } else {
        errorMsg.textContent = data.message || 'Credenciales incorrectas';
        errorMsg.style.display = 'block';
    }
} catch (err) {
    errorMsg.textContent = 'Error de conexión. Intenta de nuevo.';
    errorMsg.style.display = 'block';
} finally {
    btn.disabled = false;
    btn.textContent = 'Iniciar sesión';
}
});