import axios from "axios";

const URL = "http://localhost:3000"

export async function getReviewsByUserId(id) {
    const response = await axios.get(`${URL}/reviews/${id}`)

    if( response.status == 200 ) {
        return response.data
    } else {
        return // TODO error handling
    }
}

export async function getTopReviews() {
    try {
        const response = await axios.get(`${URL}/api/reviews/top`);
        if (response.status === 200) {
            return response.data.slice(0,5); // Returns array of top 5 reviews
        }
    } catch (error) {
        console.error("Error fetching top reviews:", error);
        return []; // Return empty array if error occurs
    }
}