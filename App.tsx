import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StyleProvider } from './context/StyleContext';
import { Home } from './pages/Home';
import { Analysis } from './pages/Analysis';
import { Export } from './pages/Export';
import { Mockups } from './pages/Mockups';
import { AppRoute } from './types';

const App: React.FC = () => {
  return (
    <StyleProvider>
      <HashRouter>
        <Routes>
          <Route path={AppRoute.HOME} element={<Home />} />
          <Route path={AppRoute.RESULTS} element={<Analysis />} />
          <Route path={AppRoute.EXPORT} element={<Export />} />
          <Route path={AppRoute.MOCKUPS} element={<Mockups />} />
          <Route path="*" element={<Navigate to={AppRoute.HOME} replace />} />
        </Routes>
      </HashRouter>
    </StyleProvider>
  );
};

export default App;
