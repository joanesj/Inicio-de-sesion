function handleCredentialResponse(response) {
    console.log("ID Token: " + response.credential);

    const data = JSON.parse(atob(response.credential.split('.')[1]));
    console.log("Usuario:", data);
    document.body.innerHTML += `<p>Bienvenido ${data.name} (${data.email})</p>`;
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "214846363884-2qmhqaphakk26e0jusvpig5k2tk3makl.apps.googleusercontent.com",
        callback: handleCredentialResponse
    })  ;
    google.accounts.id.renderButton(
        document.querySelector(".g_id_signin"),
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt(); // Muestra el prompt de login
}
