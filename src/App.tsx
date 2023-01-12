import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/shared/Header';
import { ROUTES } from './constants/routes';
import Home from './pages/Home';
import Notification from './pages/Notification';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Story from './pages/Story';
import StoryBook from './pages/StoryBook';
import StoryEdit from './pages/StoryEdit';

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
        <Route path={ROUTES.STORY} element={<Story />} />
        <Route path={ROUTES.STORY_EDIT} element={<StoryEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
