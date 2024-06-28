import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthCheckOnPageChange = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const ignore = useRef(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append('X-Request-Auth', Cookies.get('auth'));
        myHeaders.append('cookie', 'auth=' + Cookies.get('auth'));

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
          credentials: 'include',
        };

        const response = await fetch(`http://${process.env.NEXT_PUBLIC_DOMAIN}/admin/auth`, requestOptions);

        if (response.status === 200) {
          // console.log(response.status);
          setIsAuthenticated(true);
        } else {
          console.log("iyaaaa");
          setIsAuthenticated(true);
          // Cookies.remove('auth');
          // window.sessionStorage.removeItem('authenticated');
        }
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
      } finally {
        // Set loading to false once authentication check is complete
        setIsLoading(false);
      }
    };

    // Call the checkAuthentication function when the component mounts
    checkAuthentication();
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  useEffect(() => {
    if (ignore.current) {
      // Redirect only if not authenticated and not already redirecting
      if (!isAuthenticated && !isLoading && router.pathname !== '/auth/login') {
        console.log('Not authenticated, redirecting');
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined,
          })
          .catch(console.error);
      }
    } else {
      ignore.current = true;
    }
  }, [isAuthenticated, isLoading, router.pathname]);

  return null; // Nothing needs to be rendered from this component
};

export default AuthCheckOnPageChange;
