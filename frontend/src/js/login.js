export function loginError(data){

    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
    errorMessageElement.innerText = 'Usuario o contraseña incorrectos';
    }
    const inputElement = document.getElementById('inputvalidate');
    if (inputElement) {
        inputElement.classList.add('is-invalid');
    }
    setTimeout(() => {
    location.reload();
    }, 2000);
           
}