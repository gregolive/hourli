import { useState, createContext, useContext, useEffect, ReactElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { User } from '../../../types';
import Error500 from '../Error/500';

interface AuthContextProvider {
  user: User | null,
  serverError: boolean,
  handleLogin: Function,
  handleLogout: Function,
};

const AuthContext = createContext<AuthContextProvider>({} as AuthContextProvider);

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [serverError, setServerError] = useState(false);

  const getUser = (): void => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/user`, { withCredentials: true })
      .then((res: AxiosResponse) => {
        setServerError(false);
        setUser(res.data);
      }, (err) => {
        setServerError(true);
      });
  };

  // get user on mount
  useEffect(() => {
    getUser();
  }, []);

  const handleLogin = (): void => getUser();

  const handleLogout = (): void => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/logout`, {}, { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setUser(null);
          navigate('/login');
        }
      });
  };

  const value: AuthContextProvider = { user, serverError, handleLogin, handleLogout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Route accessible to authenticated users only
const AuthenticatedRoute = ({ children }: any): ReactElement => {
  const { user, serverError } = useAuth();
  
  if (serverError) return <Error500 />;
  if (!user) return <Navigate to='/login' replace />;
  return children;
};

// Route accessible to unauthenticated users only
const UnauthenticatedRoute = ({ children }: any): ReactElement => {
  const { user, serverError } = useAuth();
  
  if (serverError) return <Error500 />;
  if (user) return <Navigate to='/' replace />;
  return children;
};

// Route accessible to all users
const UnprotectedRoute = ({ children }: any): ReactElement => {
  const { serverError } = useAuth();
  
  if (serverError) return <Error500 />;
  return children;
};

export { AuthProvider, useAuth, AuthenticatedRoute, UnauthenticatedRoute, UnprotectedRoute };
