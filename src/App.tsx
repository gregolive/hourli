import { ReactElement } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Timer from './components/Timer';

const App = (): ReactElement => {
  return (
    <div className='app'>
      <Header />
      <Timer />
      <Footer />
    </div>
  );
};

export default App;
