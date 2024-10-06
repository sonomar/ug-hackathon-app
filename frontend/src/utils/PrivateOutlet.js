import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react';

export function PrivateOutlet() {
  const auth = useAuth();
  const location = useLocation();

  useEffect(()=>{
    console.log(location);
  }, [location])

  return auth.cred.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}
