import axios from 'axios';
import getBackendURL from '../backendUtils';

console.log(getBackendURL());

export default axios.create({
  baseURL: getBackendURL(),
  withCredentials: true,
});