import React from "react";
import { Link } from "react-router-dom";
import { IoMdHome } from 'react-icons/io'
import { IoMdContact } from 'react-icons/io'

const Navigation = ({ userObjs }) => (
  <nav className="navigation">
    <ul className="navi_ul">
      <li>
        <Link to="/"><IoMdHome size='30'/></Link>
      </li>
      <li>
        <Link to="/profile">
          {userObjs.displayName ? userObjs.displayName : "Anonymous"} 님의 
          <IoMdContact size='30'/>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
