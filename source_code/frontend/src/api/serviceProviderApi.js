import axios from "axios";

const URL = "http://localhost:3000"
export async function getAllServiceProviders() {
    const response = await axios.get(`${URL}/serviceProviders`)

    if (response.status == 200) {
        return response
    } else {
        console.error("Error fetching profile data:", error);
        return
    }
}

// export async function getServiceProvidersByCity(city) {
//     const response = await axios.get(`${URL}/serviceProviders?city=${city}`)

//     if (response.status == 200) {
//         return response
//     } else {
//         console.error("Error fetching profile data:", error);
//         return
//     }
// }

export async function getVerifiedServiceProviders() {
    const response = await axios.get(`${URL}/verified/serviceProviders`)

    if (response.status == 200) {
        return response
    } else {
        console.error("Error fetching profile data:", error);
        return
    }
}