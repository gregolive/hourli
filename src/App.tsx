import { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthenticatedRoute, UnauthenticatedRoute, UnprotectedRoute } from './components/AuthProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Timer from './components/Timer';
import Register from './components/Register';
import Login from './components/Login';
import Error404 from './components/Error/404';

const App = (): ReactElement => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <div className='app'>
          <Header />
          <Routes>
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
              path='*'
              element={<UnprotectedRoute><Error404 /></UnprotectedRoute>}
            />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
