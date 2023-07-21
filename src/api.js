import axios from '@/axios';

const BASE_URL = 'http://127.0.0.1:8000/api'; // Replace this with your actual API base URL

// Function to handle API response
function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.data.message || 'Network response was not ok.');
  }
}

// Function to fetch data from the API using GET method
export async function fetchData(endpoint) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error fetching data from the API.');
  }
}

// Function to post data to the API using POST method
export async function postData(endpoint, data) {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      "X-Requested-With": "XMLHttpRequest"
    });
  
    return response;
}
