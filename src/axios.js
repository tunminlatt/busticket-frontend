import axios from 'axios';

// Add a request interceptor to set the CORS headers
axios.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*'; // Replace '*' with the actual allowed origin if necessary
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
  config.headers['Access-Control-Allow-Headers'] =
    'X-Requested-With, Content-Type, Authorization';
  return config;
});

axios.defaults.debug = true;

export default axios;
