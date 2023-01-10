import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StoryBook from './pages/StoryBook';

import Header from './components/shared/Header';

import { ROUTES } from './constants/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<div>Home</div>} />
        <Route path={ROUTES.STORY_BOOK} element={<StoryBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
