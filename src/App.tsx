import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/shared/Header';
import SignUpButton from './components/signup/SignUpButton';

import { ROUTES } from './constants/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <SignUpButton />
      <Routes>
        <Route path={ROUTES.HOME} element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
