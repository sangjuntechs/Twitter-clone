import React, { useState } from "react";
import { authService, firebaseInstance } from "fbInstance";
import { IoLogoTwitter } from 'react-icons/io'

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccout, setNewAccount] = useState(true);
  const [error, setError] = useState("");
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
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      } 
      console.log(data);

    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async(event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    } else if(name ==='google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className="login_wrap">
      <IoLogoTwitter className="logo" size='50' color='dodgerblue'/>
      SangjunTech Twitter
      <form onSubmit={onSubmit}>
        <input
          className="auth_input"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          className="auth_input"
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input className="change_loginType"type="submit" value={newAccout ? "Create Account" : "LogIn"} />
        {error}
      </form>
      <span className="type_login "onClick={toggleAccount}>
        {newAccout ? "Sign In" : "Create Account"}
      </span>
      <div className="buttonForm">
        <button className = "auth_button" name="github" onClick={onSocialClick}>
          Github로 로그인
        </button>
        <button className = "auth_button" name="google" onClick={onSocialClick}>
          Google로 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
