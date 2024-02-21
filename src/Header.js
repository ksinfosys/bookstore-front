import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import { removeCookie, getCookie } from './utils/cookie';
import axios from "axios";

const Header = () => {

  const requestData = {
    memberId: getCookie("memberId"),
    memberCookie: getCookie("memberCookie")
  };

    const handleGoBack = () => {
        console.log('GO BACK BUTTON CLICK');

        axios
        .post('/removeMemberCookie', requestData)
        .then((response)=> {

          removeCookie('memberId');
          removeCookie('memberCookie');

          console.log('cookie delete')
        })
        .catch((error) => {
          console.log('500 error');
        });
      };

  return (
    <header>
      <div className="left-menu">
        <Link to="/">HOME</Link>

        <Link to="/book">BOOK</Link>

        <Link to="/ebook">E-BOOK</Link>

        <Link to="/goods">GOODS</Link>

        <Link to="/bestseller">BESTSELLER</Link>
      </div>
      <div className="right-menu">        
        <Link to="/login">LOGIN</Link>
        
        <Link to="/join">JOIN</Link>

        <Link to="/joinJP">JOINJP</Link>

        <Link to="/" onClick={handleGoBack}>LOGOUT</Link>

        <Link to="/myaccount/checkpassword">MYPAGE</Link>
        
        <Link to="/cart">CART</Link>
      </div>
    </header>
  );
};

export default Header;