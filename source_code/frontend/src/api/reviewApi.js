import axios from "axios";

const URL = "https://fixifyawsamplify-production.up.railway.app"

export async function getReviewsByUserId(id) {
    const response = await axios.get(`${URL}/reviews/${id}`)

    if( response.status == 200 ) {
        return response.data
    } else {
        return // TODO error handling
    }
}
