import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  async function register(email, username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    axios.post("http://localhost:3001/user/register", { email, username, hashedPassword })
      .then(response =>console.error(response))
      .catch(error => console.error(error));
  }

  async function login(username, password) {
    try {
      const res = await axios.post("http://localhost:3001/user/login", { username, password });
      const token = res.data.token;
      setIsAuthenticated(true);
      setUser(jwt.decode(token));
      localStorage.setItem('token', token);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    }
  }

  async function logout() {
    try {
      await axios.post("http://localhost:3001/user/logout");
      setIsAuthenticated(false);
      setUser({});
      localStorage.removeItem('token');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
