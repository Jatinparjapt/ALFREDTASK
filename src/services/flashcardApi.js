import axios from "axios";
import Cookies from "js-cookie";

const API_URL_FLASHCARD = "https://flashcard-backend-sb3p.onrender.com/api/flashcards";
const API_URL_USER = "https://flashcard-backend-sb3p.onrender.com/api/users";

// ✅ Get token from cookies correctly
const getHeaders = () => {
  const token = Cookies.get("authToken"); // Retrieve token
  console.log("Retrieved Token:", token); // Debugging

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Attach token
      "Content-Type": "application/json",
    },
  };
};

// ✅ Store token in cookies (without `secure: true`)
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_USER}/login`, userData);
    const token = response.data.token;

    if (token) {
      Cookies.set("authToken", token, { expires: 7 }); // Set for 7 days
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_USER}/signup`, userData);
    const token = response.data.token;

    if (token) {
      Cookies.set("authToken", token, { expires: 7 }); // Set for 7 days
    }

    return response.data;
  } catch (error) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Enable withCredentials globally for axios
axios.defaults.withCredentials = true;

// ✅ API Calls with Correct Headers
export const fetchFlashcards = async () => {
  try {
    const response = await axios.get(API_URL_FLASHCARD, getHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcards:", error.response?.data || error.message);
    throw error;
  }
};

export const createFlashcard = async (flashcardData) => {
  try {
    const response = await axios.post(API_URL_FLASHCARD, flashcardData, getHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating flashcard:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteFlashcard = async (id) => {
  try {
    const response = await axios.delete(`${API_URL_FLASHCARD}/${id}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error("Error deleting flashcard:", error.response?.data || error.message);
    throw error;
  }
};

export const updateFlashcard = async (flashcard) => {
  try {
    // Log the flashcard object to check if it's correct
    console.log(flashcard, "from api");

    // Send PUT request to update the flashcard
    const response = await axios.put(
      `${API_URL_FLASHCARD}/${flashcard._id}`, // URL with the flashcard ID
      { correct: flashcard.correct },          // Only send the 'correct' property to update
      getHeaders()                            // Assuming this function handles headers (if necessary)
    );

    return response.data;  // Return the updated flashcard data from the response
  } catch (error) {
    // Handle error (if any)
    console.error("Error updating flashcard:", error.response?.data || error.message);
    throw error;  // Throw error so it can be caught in the Redux slice
  }
};

