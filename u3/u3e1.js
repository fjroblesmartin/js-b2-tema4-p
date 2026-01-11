// T4. Trabajo con API
// U3. Peticiones PUT / PATCH con Fetch
// Enunciado disponible en u3e1.md / Enunciat disponible a u3e1.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:
export class ReqRes {
    // -------------------------------------------------------------------
    // A. Preparación (Código asumido del ejercicio anterior)
    // -------------------------------------------------------------------
    static BASE_URL = 'https://reqres.in/api';

    // -------------------------------------------------------------------
    // B. Propiedad nuevo endpoint
    // -------------------------------------------------------------------
    static ENDPOINT_USER = '/users/{id}';

    constructor() {
        // Constructor vacío o inicializaciones si fueran necesarias
    }

    // -------------------------------------------------------------------
    // C. Método updateFullUser (PUT)
    // -------------------------------------------------------------------
    updateFullUser(id, email, firstName, lastName, avatarUrl) {
        // 1) Validación de parámetros vacíos
        if (!id || !email || !firstName || !lastName || !avatarUrl) {
            return Promise.resolve({
                error: 'Some user fields are missing'
            });
        }

        // Preparación de la URL: Sustituimos {id} por el valor real
        const endpoint = ReqRes.ENDPOINT_USER.replace('{id}', id);
        const url = `${ReqRes.BASE_URL}${endpoint}`;

        // Construcción del objeto de datos
        // Nota: Mapeamos los argumentos a los nombres de campo que pide el ejercicio
        const data = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            avatarUrl: avatarUrl 
        };

        // 2) Petición fetch con método PUT
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    // -------------------------------------------------------------------
    // D. Método updateUserName (PATCH)
    // -------------------------------------------------------------------
    updateUserName(id, firstName, lastName) {
        // 1) Validación de parámetros vacíos
        if (!id || !firstName || !lastName) {
            return Promise.resolve({
                error: 'Some user fields are missing'
            });
        }

        // Preparación de la URL
        const endpoint = ReqRes.ENDPOINT_USER.replace('{id}', id);
        const url = `${ReqRes.BASE_URL}${endpoint}`;

        // Construcción del objeto de datos (Solo los campos a parchear)
        const data = {
            first_name: firstName,
            last_name: lastName
        };

        // 2) Petición fetch con método PATCH
        return fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}