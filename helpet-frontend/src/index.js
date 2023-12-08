import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './style.css';
import AuthProvider from './utils/auth/AuthContext';
import PetProvider from './context/PetContext';
import { NavigationProvider } from './context/NavigationContext';
import { PaginationProvider } from './context/PaginationContext';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  // <React.StrictMode>  
    <Provider store={store}>
        <BrowserRouter>
           <AuthProvider>
              <PetProvider>
                <NavigationProvider>
                  <PaginationProvider>
                    <App />
                  </PaginationProvider>
                </NavigationProvider>
              </PetProvider>
          </AuthProvider>
        </BrowserRouter>
    </Provider>
  // </React.StrictMode>
  
  ,document.getElementById('root')
);
