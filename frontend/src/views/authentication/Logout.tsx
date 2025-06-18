import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from 'src/components/auth/auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/auth/login', { replace: true });
  }, [navigate]);

  return null;
};

export default Logout;
