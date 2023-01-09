import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/shared/Layout';

import { ROUTES } from './constants/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<div>Home</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
