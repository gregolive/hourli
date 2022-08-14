import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';

const App = (): ReactElement => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
