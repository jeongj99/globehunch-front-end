import axios from 'axios';
import getBackendURL from '../backendUtils';

export default axios.create({
  baseURL: getBackendURL(),
  withCredentials: true,
});