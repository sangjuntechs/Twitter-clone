import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbInstance';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObjs, setUserObjs] = useState(null);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObjs(user);
       
      } else {
        setIsLoggedIn(false)
      }
      setInit(true);
    })
  },[])
  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObjs={userObjs}/> : "Initialzing.."}
    </div>
  );
}

export default App;
