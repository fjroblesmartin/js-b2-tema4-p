// T4. Trabajo con API
// U2. Peticiones GET y POST con Fetch
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:

export class ReqRes {
    // B. Propiedades estáticas
    static API_URL = 'https://reqres.in/api';
    static ENDPOINT_REGISTER = '/register';
    static ENDPOINT_LOGIN = '/login';
    static ENDPOINT_USERS = '/users';

    constructor() {
        // C. Propiedad session inicializada
        this.session = {
            token: null,
            email: null,
            userId: null
        };
    }

    // D. Método register
    register(email, pwd) {
        // Validaciones previas que devuelven promesas resueltas con error
        if (!email) {
            return Promise.resolve({
                error: 'Missing email or username'
            });
        }
        if (!pwd) {
            return Promise.resolve({
                error: 'Missing password'
            });
        }

        // Guardamos email en sesión
        this.session.email = email;

        // Construcción de la URL y Petición Fetch
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_REGISTER}`;
        
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: pwd // La API de reqres espera "password", aunque el param sea "pwd"
            })
        })
        .then(response => response.json()) // Convertimos la respuesta a JSON para que sea usable
        .catch(error => ({ error: error.message })); // Captura de errores de red
    }

    // E. Método onRegister
    onRegister(data) {
        if (!data || data.error) {
            const errorMsg = data && data.error ? data.error : 'Unknown error';
            return `ERROR_REGISTER. ${errorMsg}`;
        }

        // Si no hay error, actualizamos la sesión
        this.session.userId = data.id;
        this.session.token = data.token;
        
        // Retornamos true o el objeto data para confirmar éxito (opcional, pero buena práctica)
        return true;
    }

    // F. Método login
    login(email, pwd) {
        if (!email) {
            return Promise.resolve({
                error: 'Missing email or username'
            });
        }
        if (!pwd) {
            return Promise.resolve({
                error: 'Missing password'
            });
        }

        this.session.email = email;

        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_LOGIN}`;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: pwd
            })
        })
        .then(response => response.json())
        .catch(error => ({ error: error.message }));
    }

    // G. Método onLogin
    onLogin(data) {
        if (!data || data.error) {
            const errorMsg = data && data.error ? data.error : 'Unknown error';
            return `ERROR_LOGIN. ${errorMsg}`;
        }

        this.session.token = data.token;
        return true;
    }

    // H. Método getUserList
    getUserList(page = 1, perPage = 6) {
        // Construimos la URL con Query Params
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${page}&per_page=${perPage}`;

        // Fetch GET por defecto
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error fetching users:', error));
    }
}