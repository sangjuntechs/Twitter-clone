import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObjs }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">
          {userObjs.displayName ? userObjs.displayName : "Anonymous"} 님의
          Profile
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
