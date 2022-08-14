import { ReactElement } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, AuthenticatedRoute, UnauthenticatedRoute, UnprotectedRoute } from '../AuthProvider';
import { AnimatePresence } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';
import Timer from '../Timer';
import Register from '../Register';
import Login from '../Login';
import ShiftsIndex from '../Shifts/Timesheet';
import Error404 from '../Error/404';

const AnimatedRoutes = (): ReactElement => {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className='app'>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route
              path='/'
              element={<UnprotectedRoute><Timer /></UnprotectedRoute>}
            />
            <Route
              path='/register'
              element={<UnauthenticatedRoute><Register /></UnauthenticatedRoute>}
            />
            <Route
              path='/login'
              element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>}
            />
            <Route
              path='/timesheet'
              element={<AuthenticatedRoute><ShiftsIndex /></AuthenticatedRoute>}
            />
            <Route
              path='*'
              element={<UnprotectedRoute><Error404 /></UnprotectedRoute>}
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default AnimatedRoutes;
