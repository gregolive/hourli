import { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Timer from './components/Timer';

const App = (): ReactElement => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className='app'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<Timer />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
