
export async function getToken(email: string) {

    const host = process.env.BACKEND_HOST

    const response = await fetch(`${host}/auth/getToken`, {
        body: JSON.stringify({
            email: email
        }),
        method: 'post',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()

}