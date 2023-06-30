export const getResponse = async (uri: string, method: string, contentType: string, body: string) => {

    const ACCESS_TOKEN = localStorage.access_token || JSON.stringify("");

    const GET_RES = {
        // method: method,
        headers: {
            'Content-Type': contentType,
            'Authorization': `Bearer ${JSON.parse(ACCESS_TOKEN)}`
        }
    }

    const POST_RES = {
        method: method,
        headers: {
            'Content-Type': contentType,
            'Authorization': `Bearer ${JSON.parse(ACCESS_TOKEN)}`
        },
        body: body
    }

    const obj = method === "GET" ? GET_RES : POST_RES

    const response = await fetch(`http://10.0.0.23:8080${uri}`, obj);

    const json = await response.json();

    if (response.ok) {
        return json;
    }

    return null
}