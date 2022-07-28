import axios from 'axios';
const instance = axios.create({ baseURL: 'http://192.168.43.230:8000/' });
export default instance;
