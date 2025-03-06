import axios from "axios";

const URL = "fixifybackend.netlify.app"
export async function getAllServiceProviders() {
    const response = await axios.get(`${URL}/serviceProviders`)

    if (response.status == 200) {
        return response
    } else {
        return
    }
}
