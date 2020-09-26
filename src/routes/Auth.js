import React, { useState } from "react";
import { auth } from "firebase";
import { authService } from "fbInstance";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccout, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
        let data;
      if (newAccout) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch(error){
        setError(error.message)
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccout ? "Create Account" : "LogIn"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccout ? 'Sign In' : 'Create Account'}</span>
      <div>
        <button>Github로 로그인</button>
        <button>Google로 로그인</button>
      </div>
    </div>
  );
};

export default Auth;
