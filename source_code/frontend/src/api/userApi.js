import axios from "axios";

const URL = "http://localhost:3000"

/**
 * User Login
 */
export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`, user)
    return response.data
}