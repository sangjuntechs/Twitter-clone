import React, { useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbInstance';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
