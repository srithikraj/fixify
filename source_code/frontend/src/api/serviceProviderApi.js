import axios from "axios";

const URL = "http://localhost:3000"

export async function getServiceProviderByUserId(user_id) {
    const response = await axios.get(`${URL}/serviceProviders/${type}`)

    if( response.status == 200 ) {
        return response.data
    } else {
        return // TODO error handling
    }
}

const updateServiceProviderByUserId = async (userId, updatedData) => {
    try {
      const response = await fetch(`/serviceProviders/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Service Provider Updated:", result);
      return result;
    } catch (error) {
      console.error("Error updating service provider:", error);
    }
  };
  