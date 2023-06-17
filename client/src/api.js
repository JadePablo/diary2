import axios from 'axios'

const URL = "http://localhost:5000"

async function handleLoginSuccess(token) {
    try {

        const response = await axios.get(`${URL}/decode`, {
            params: token
        })
        const decodedToken = response.data

        // Use the user information as needed
        return decodedToken

    } catch (err) {
        throw new Error('Token Verification failed');
    }
}

export{handleLoginSuccess}