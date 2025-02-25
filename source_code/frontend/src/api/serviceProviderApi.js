import axios from "axios";

const URL = "http://localhost:3000"
export async function getAllServiceProviders() {
    const response = await axios.get(`${URL}/serviceProviders`)

    if (response.status == 200) {
        return response
    } else {
        return
    }
}