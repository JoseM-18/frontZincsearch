
/**
 * This is the API service file. It contains all the API calls.
 * @module apiService
 * @category API
 */
import axios from "axios";

const baseURL = "http://localhost:9090"; 

 const search = async (query) => {
    try {
      const response = await axios.get(`${baseURL}/search?q=${query}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export default search;


