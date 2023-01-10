import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ROUTES } from './constants/routes';

import Header from './components/shared/Header';
import HomePage from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
