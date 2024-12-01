import { Suspense, useState } from 'react';
import React from 'react';
import HeaderBar from './modules/headerBar/headerBar';

function App() {
  return (
    <div>
      <Suspense>
        <HeaderBar />
      </Suspense>
    </div>
  );
}

export default App;
