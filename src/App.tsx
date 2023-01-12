import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/shared/Header';
import { ROUTES } from './constants/routes';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Notification from './pages/Notification';
import SignUp from './pages/SignUp';
import StoryBook from './pages/StoryBook';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.STORY_BOOK} element={<StoryBook />} />
        <Route path={ROUTES.NOTIFICATION} element={<Notification />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.SIGNIN} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
