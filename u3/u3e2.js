// T4. Trabajo con API
// U3. Peticiones DELETE con Fetch
// Enunciado disponible en u3e2.md / Enunciat disponible a u3e2.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:
export class ReqRes {
    // -------------------------------------------------------------------
    // Propiedades estáticas (Acumuladas de ejercicios anteriores)
    // -------------------------------------------------------------------
    static API_URL = 'https://reqres.in/api'; // Definido en 4.2.1
    static ENDPOINT_REGISTER = '/register';
    static ENDPOINT_LOGIN = '/login';
    static ENDPOINT_USERS = '/users';
    static ENDPOINT_USER = '/users/{id}';     // Definido en 4.3.1

    constructor() {
        this.session = {
            token: null,
            email: null,
            userId: null
        };
    }

    // ===================================================================
    // NUEVO MÉTODO DEL EJERCICIO 4.3.2: DELETE
    // ===================================================================

    /**
     * B. Método deleteUser
     * Elimina un usuario por su ID.
     */
    deleteUser(id) {
        // 1) Validación: debe existir y ser un entero positivo.
        // Convertimos a número por si viene como string ("5") para validar el valor.
        const idNumber = Number(id);

        if (!id || isNaN(idNumber) || !Number.isInteger(idNumber) || idNumber <= 0) {
            return Promise.resolve({
                error: 'User id is missing or is not valid'
            });
        }

        // 2) Petición DELETE
        // Sustituimos el {id} en el endpoint
        const endpoint = ReqRes.ENDPOINT_USER.replace('{id}', id);
        const url = `${ReqRes.API_URL}${endpoint}`;

        return fetch(url, {
            method: 'DELETE',
            headers: {
                // Aunque DELETE no suele llevar body, es buena práctica mantener headers estándar
                'Content-Type': 'application/json' 
            }
        });
    }

    // ===================================================================
    // MÉTODOS PREVIOS (Ejercicio 4.3.1 - PUT / PATCH)
    // ===================================================================

    updateFullUser(id, email, firstName, lastName, avatarUrl) {
        if (!id || !email || !firstName || !lastName || !avatarUrl) {
            return Promise.resolve({ error: 'Some user fields are missing' });
        }
        const endpoint = ReqRes.ENDPOINT_USER.replace('{id}', id);
        const url = `${ReqRes.API_URL}${endpoint}`;
        const data = { email, first_name: firstName, last_name: lastName, avatarUrl };

        return fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    updateUserName(id, firstName, lastName) {
        if (!id || !firstName || !lastName) {
            return Promise.resolve({ error: 'Some user fields are missing' });
        }
        const endpoint = ReqRes.ENDPOINT_USER.replace('{id}', id);
        const url = `${ReqRes.API_URL}${endpoint}`;
        const data = { first_name: firstName, last_name: lastName };

        return fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    // ===================================================================
    // MÉTODOS PREVIOS (Ejercicio 4.2.1 - GET / POST / AUTH)
    // ===================================================================

    register(email, pwd) {
        if (!email) return Promise.resolve({ error: 'Missing email or username' });
        if (!pwd) return Promise.resolve({ error: 'Missing password' });

        this.session.email = email;
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_REGISTER}`;

        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pwd })
        });
    }

    onRegister(data) {
        if (!data || data.error) return `ERROR_REGISTER. ${data ? data.error : 'Unknown error'}`;
        this.session.userId = data.id;
        this.session.token = data.token;
    }

    login(email, pwd) {
        if (!email) return Promise.resolve({ error: 'Missing email or username' });
        if (!pwd) return Promise.resolve({ error: 'Missing password' });

        this.session.email = email;
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_LOGIN}`;

        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pwd })
        });
    }

    onLogin(data) {
        if (!data || data.error) return `ERROR_LOGIN. ${data ? data.error : 'Unknown error'}`;
        this.session.token = data.token;
    }

    getUserList(page = 1, perPage = 6) {
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${page}&per_page=${perPage}`;
        return fetch(url);
    }
}