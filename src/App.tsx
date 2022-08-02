import { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, UnauthenticatedRoute } from './components/AuthProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Timer from './components/Timer';
import Register from './components/Register';

const App = (): ReactElement => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <div className='app'>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Timer />}
            />
            <Route
              path='/register'
              element={<UnauthenticatedRoute><Register /></UnauthenticatedRoute>}
            />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
