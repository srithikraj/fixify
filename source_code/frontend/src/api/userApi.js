import axios from "axios";

const URL = "https://fixifyawsamplify-production.up.railway.app"

/**
 * User Login
 */
export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`, user)
    return response.data
}
