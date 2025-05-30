import ENVIRONMENT from "../constans/environment"
import methods_HTTP from "../constans/methods"


export const loginAuth = async ({ email, password }) => {
    try {
        const res = await fetch(
            `${ENVIRONMENT.URL_API}/api/users/login`,
            {
                method: methods_HTTP.POST,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password
                    }
                )
            }
        )
        const data = await res.json()
        return data
    }
    catch(error){
        console.error(error)
        throw {
            message: 'Ocurrio un error al comunicarnos con el servidor (intentalo mas tarde)' 
        }
    }
}
export const registerAuth = async ({ email, password }) => {
    try {
        const res = await fetch(
            `${ENVIRONMENT.URL_API}/api/users/register`,
            {
                method: methods_HTTP.POST,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password
                    }
                )
            }
        )
        const data = await res.json()
        return data
    }
    catch(error){
        console.error(error)
        throw {
            message: 'Ocurrio un error al comunicarnos con el servidor (intentalo mas tarde)' 
        }
    }
}