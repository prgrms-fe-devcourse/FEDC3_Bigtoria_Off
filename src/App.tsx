import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/shared/Header';
import SignUpButton from './components/signup/SignUpButton';

import { ROUTES } from './constants/routes';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<div>Home</div>} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
