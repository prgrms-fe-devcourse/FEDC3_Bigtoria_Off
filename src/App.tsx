import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/shared/Header';
import { ROUTES } from './constants/routes';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';
import Story from './pages/Story';
import StoryBook from './pages/StoryBook';
import StoryEdit from './pages/StoryEdit';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.STORY_BOOK} element={<StoryBook />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.STORY} element={<Story />} />
        <Route path={ROUTES.STORY_EDIT} element={<StoryEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
