import { useState, createContext, useContext, useEffect, ReactElement } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { User } from '../../../types';

interface AuthData {
  user: User,
};

interface AuthContextProvider {
  user: User | null,
  onLogin: Function,
  onLogout: Function,
};

const AuthContext = createContext<AuthContextProvider>({} as AuthContextProvider);

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/getuser`, { withCredentials: true }).then((res: AxiosResponse) => {
      console.log(res);
      if (res.data) setUser(res.data);
    });
  }, []);

  // navigate when user updates
  useEffect(() => {
    navigate(location.pathname); // eslint-disable-next-line
  }, [user]);

  const handleLogin = (data: AuthData): void => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/login`, { withCredentials: true })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        if (res.data) setUser(res.data);
      });
  };

  const handleLogout = (): void => setUser(null);

  const value: AuthContextProvider = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

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

const UnprotectedRoute = ({ children }: any): ReactElement => {
  const { user } = useAuth();
  
  if (user) return <Navigate to='/' replace />;
  return children;
};

export { AuthProvider, ProtectedRoute, UnprotectedRoute };
