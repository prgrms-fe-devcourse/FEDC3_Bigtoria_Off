import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm/SearchForm';

import Header from './components/shared/Header';

import { ROUTES } from './constants/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
