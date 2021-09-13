import React from 'react';
import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers['X-Auth-Token'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers['X-Auth-Token'];
  }
};

export default setAuthToken;
