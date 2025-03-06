import axios from "axios";

const URL = "fixifybackend.netlify.app"

/**
 * User Login
 */
export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`, user)
    return response.data
}
