const isValidHostname = hostname => {
  return /^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname); // Validate IP address
};

const sanitizeHostname = hostname => {
  return hostname.trim();
};

const constructBackendURL = () => {
  const hostname = window.location.hostname;
  const port = 8001;

  let backendURL = '';

  if (isValidHostname(hostname)) {
    const sanitizedHostname = sanitizeHostname(hostname);
    backendURL = `http://${sanitizedHostname}:${port}`;
  } else {
    // Handle invalid hostname case
    // You can either throw an error, use a default URL, or handle it based on your application's requirements
    // Example: Use a default URL
    backendURL = `http://localhost:${port}`;
  }

  return backendURL;
};

const getBackendURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return constructBackendURL;
  } else {
    // For production
    return process.env.REACT_APP_BACKEND_URL; // Set this variable in your Netlify environment
  }
};

export default getBackendURL;