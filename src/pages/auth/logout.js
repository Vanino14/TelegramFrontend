// pages/auth/logout.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/use-auth';

const LogoutPage = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call your logout function
        const result = await auth.signOut();

        console.log(result);

        if (result === 1) {
          // Redirect to the login page after successful logout
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error during sign out:', error);
        router.push('/auth/login');
      }
    };

    // Trigger logout on page mount
    handleLogout();
  }, [auth, router]);

  // You can return a loading message or any UI here if needed
  return (
    <div className='container-fluid' 
    style={{margin:'auto'}}>
      Logging out...
    </div>
  );
};

export default LogoutPage;
