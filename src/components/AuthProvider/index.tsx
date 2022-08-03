import { useState, createContext, useContext, useEffect, ReactElement } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { User } from '../../../types';

interface AuthContextProvider {
  user: User | null,
  handleLogin: Function,
  handleLogout: Function,
};

const AuthContext = createContext<AuthContextProvider>({} as AuthContextProvider);

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  // navigate when user updates
  useEffect(() => {
    navigate(location.pathname); // eslint-disable-next-line
  }, [user]);

  const getUser = (): void => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/user`, { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data) setUser(res.data);
      });
  };

  // get user on mount
  useEffect(() => {
    getUser();
  }, []);

  const handleLogin = (): void => getUser();

  const handleLogout = (): void => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/logout`, { withCredentials: true})
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setUser(null);
          navigate('/login');
        }
      });
  };

  const value: AuthContextProvider = { user, handleLogin, handleLogout };

  console.log(user);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }: any): ReactElement => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to='/login' replace />;
  return children;
};

const UnauthenticatedRoute = ({ children }: any): ReactElement => {
  const { user } = useAuth();
  
  if (user) return <Navigate to='/' replace />;
  return children;
};

export { AuthProvider, useAuth, ProtectedRoute, UnauthenticatedRoute };
