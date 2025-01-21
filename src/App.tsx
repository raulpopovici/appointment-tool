import { Suspense, useState } from 'react';
import React from 'react';
import HeaderBar from './modules/headerBar/headerBar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const handleNavButtonClick = (route: string) => {
    navigate(route);
  };
  return (
    <div>
      <Suspense>
        <HeaderBar onButtonClick={handleNavButtonClick} />
      </Suspense>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
