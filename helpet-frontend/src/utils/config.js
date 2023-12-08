
const config = {
    apiBaseUrl: process.env.REACT_APP_API_URL,
    apiTimeout: 5000,
    apiHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    //
    storage: {
      tokenKey: 'auth_token',
      userKey: 'user',
    },
}

export default config;