import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbInstance';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false)
      }
      setInit(true);
    })
  },[])
  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initialzing.."}
    </div>
  );
}

export default App;
