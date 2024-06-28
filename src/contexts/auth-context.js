import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import dotenv from 'dotenv';

dotenv.config();
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }
  
    initialized.current = true;
  
    let isAuthenticated = false;
  
    const headers = {
      'X-Request-Auth': Cookies.get('auth'),
    };
    const axiosInstance = axios.create({
      withCredentials: true, // Mengizinkan pengiriman cookie dari server ke klien
    });
    try {
      const response = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_DOMAIN}/admin/auth`, {
        headers: headers,
      });
      if (response.status === 200) {
        isAuthenticated = true;
        const result = response.data;
        // console.log(response.data);
        const user = {
          id: result.message.admin.id,
          avatar: '/assets/avatars/avatar-anika-visser.png',
          name: result.message.admin.username,
          email: result.message.admin.username
        };
    
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user
        });
      } else {
        // Cookies.remove('auth');
        // window.sessionStorage.removeItem('authenticated');
      }
      // isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }
  
    if (isAuthenticated) {
      
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };
  

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'MArco',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };
  const signIn = async (email, password) => {
    let hasil = 0; 
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    try {
      const response = await axios.post("http://"+process.env.NEXT_PUBLIC_DOMAIN+"/admin/login", formData);
      if (response.status === 200) {
        console.log("Access granted");
        const result = response.data;
        Cookies.set('auth', result.message.accessToken, { expires: 1 });
        window.sessionStorage.setItem('authenticated', 'true');
        hasil = 1;
        const user = {
          id: result.message.admin.id,
          avatar: '/assets/avatars/avatar-anika-visser.png',
          name: result.message.admin.username,
          email: 'defaultAdmin'
        };
  
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });
      } else if (response.status === 401) {
        console.log("Unauthorized access");
        hasil=0;
        throw new Error('Unauthorized: Please check your email and password');
      }
    } catch (err) {
      console.error(err);
      throw new Error('Contact our administrator');

      // Handle the error appropriately (e.g., show an error message to the user)
    }
    return hasil;
  };
  

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = async () => {
    let result = 0; // Default value indicating failure
  
    const myHeaders = new Headers();
    myHeaders.append("X-Request-Auth", Cookies.get('auth'));
    myHeaders.append("cookie", 'auth=' + Cookies.get('auth'));
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials: 'include',
    };
  
    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_DOMAIN}/admin/logout`, requestOptions);
      const resultText = await response.text();
      console.log(resultText);
  
      if (response.status === 200) {
        Cookies.remove('auth');
        window.sessionStorage.removeItem('authenticated');
        dispatch({
          type: HANDLERS.SIGN_OUT
        });
  
        result = 1; // Set the result to 1 indicating success
      }
      // Setelah berhasil logout, kembali ke halaman utama
    } catch (error) {
      console.error("Error during logout:", error);
      result = 0; // Ensure result is set to 0 in case of an error
    }
  
    return result;
  };
  

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
