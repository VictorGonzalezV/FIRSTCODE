const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// inicio de sesion 


const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        // Realizar una solicitud GET a JSON Server para obtener los usuarios
        const response = await fetch('http://localhost:3000/usuarios');
        const usuarios = await response.json();

        // Buscar un usuario con el correo y contraseña proporcionados
        const validUser = usuarios.find(user => user.correo === email && user.contraseña === password);
        if (!validUser) {
            return alert('Usuario y/o contraseña incorrectos!');
        }
        
        // Verificar el tipo de usuario
        if (validUser.rol === "empresa") {
            // Usuario tipo empresa
            alert(`Bienvenido ${validUser.nombre} (Empresa)`);
            // Redireccionar al usuario al perfil de empresa
            window.location.href = '/HTML/perfil-empresa.html';
        } else if (validUser.rol === "desarrollador") {
            // Usuario tipo desarrollador
            alert(`Bienvenido ${validUser.nombre} (Desarrollador)`);
            // Redireccionar al usuario al perfil de desarrollador
            window.location.href = '/HTML/perfil.html';
        } else {
            // Tipo de usuario desconocido
            alert('Error: Tipo de usuario desconocido');
        }

        // Guardar los datos del usuario en localStorage
        localStorage.setItem('login_success', JSON.stringify(validUser));

    } catch (error) {
        console.error('Error:', error);
        alert('Error al comunicarse con el servidor');
    }
});

//  registrarse 

const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const correo = document.querySelector('#correo').value;
    const contraseña = document.querySelector('#contraseña').value;
    const rol = document.querySelector('#rol').value; 

    // Expresión regular para validar el formato de un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verificar si el correo electrónico tiene el formato correcto
    if (!emailRegex.test(correo)) {
        return alert('Por favor ingresa un correo electrónico válido');
    }

    try {
        // Realizar una solicitud GET para obtener todos los usuarios
        const response = await fetch('http://localhost:3000/usuarios');
        const usuarios = await response.json();

        // Verificar si el correo electrónico ya está registrado
        const isUserRegistered = usuarios.find(user => user.correo === correo);
        if (isUserRegistered) {
            return alert('El correo electrónico ya está registrado');
        }

        // Crear un objeto con los datos del nuevo usuario
        const newUser = {
            rol: rol,
            fotoPerfil: "",
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contraseña: contraseña,
            telefono:"",
            ciudad:"",
            pais:"",
            sobremi:"",
            experiencias:[
                {
                    empresa: "",
                    añoInicio:"",
                    añoFinal:"",
                    funcion:[]
                }
            ],
            proyecto: [
                {
                  imgProyecto: "",
                  nombreProyecto: "",
                  añoProyecto: "",
                  descripcion: ""
                }
              ],
              "habilidades": [
                {
                  imghabilidad: "",
                  nombreHerramienta: ""
                }
            ]
        };

        // Realizar una solicitud POST para enviar los datos del nuevo usuario al servidor JSON
        const responseRegistro = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (responseRegistro.ok) {
            // Registro exitoso, redireccionar al inicio de sesión
            alert('Registro exitoso!');
            window.location.href = 'login.html';
        } else {
            // Si hay un error, mostrar mensaje de error
            alert('Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al comunicarse con el servidor');
    }
});

