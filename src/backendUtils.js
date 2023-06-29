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
    backendURL = `http://localhost:${port}`;
  }

  return backendURL;
};

export default constructBackendURL;