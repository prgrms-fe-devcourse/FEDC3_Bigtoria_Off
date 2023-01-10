import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './components/Home/UserList/UserList';

import Header from './components/shared/Header';

import { ROUTES } from './constants/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <div>
              Home
              <UserList />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
