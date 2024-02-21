import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Header';
import Join from './Join';
import JoinJP from './JoinJP';
import Login from './Login';
import MyPage from './MyPage';
import MyPageCheckPw from './MyPageCheckPw';
import MyAccountUpdate from './MyAccountUpdate';
import MyAccountPwUpdate from './MyAccountPwUpdate';
import MyAccountDelete from './MyAccountDelete';

const Home = () => <div>Home Page</div>;
const Book = () => <div>Book Page</div>;
const EBook = () => <div>EBook Page</div>;
const Goods = () => <div>Goods Page</div>;
const Bestseller = () => <div>Bestseller Page</div>;
const Cart = () => <div>Cart Page</div>;

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/book" element={<Book />} />
             
          <Route path="/ebook" element={<EBook />} />

          <Route path="/goods" element={<Goods />} />

          <Route path="/bestseller" element={<Bestseller />} />
          
          <Route path="/login" element={<Login />} />

          <Route path="/join" element={<Join />} />

          <Route path="/joinJP" element={<joinJP />} />

          <Route path="/myaccount/checkpassword" element={<MyPageCheckPw />} />

          <Route path="/myaccount/" element={<MyPage />} />

          <Route path="/myaccount/update" element={<MyAccountUpdate />} />

          <Route path="/myaccount/passwordUpdate" element={<MyAccountPwUpdate />} />

          <Route path="/myaccount/delete" element={<MyAccountDelete />} />

          <Route path="/cart" element={<Cart />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;