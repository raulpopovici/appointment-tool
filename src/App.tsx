import { Suspense, useState } from 'react';
import React from 'react';
import HeaderBar from './modules/headerBar/headerBar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Footer } from './components/ui/footer';
import { UserProvider } from './context/userContext';

function App() {
  const navigate = useNavigate();
  const handleNavButtonClick = (route: string) => {
    navigate(route);
  };
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Suspense>
          <HeaderBar onButtonClick={handleNavButtonClick} />
        </Suspense>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
