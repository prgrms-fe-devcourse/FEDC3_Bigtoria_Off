import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/shared/Header';
import { ROUTES } from './constants/routes';
import Follow from './pages/Follow';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';
import StoryBook from './pages/StoryBook';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.STORY_BOOK} element={<StoryBook />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.FOLLOW} element={<Follow />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
