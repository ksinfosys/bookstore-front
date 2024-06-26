import React, { useEffect, useState } from 'react';
import './css/Join.css';
import axios from "axios";
import { getCookie, setCookie } from './utils/cookie';

const Login = () => {

  const [formData, setFormData] = useState({

    memberId: '',
    memberPassword: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value,
      });
  };

  const memberLogin = () => {

    if(!formData.memberId){
      alert("IDを入力してください。")
      return;
    }
    if(!formData.memberPassword){
      alert("パスワードを入力してください。")
      return;
    }

    const requestData = {
      memberId: formData.memberId,
      memberPassword: formData.memberPassword,
    };

    axios
      .post('/login', requestData)
      .then((response) => {
        const {
          data: { resultCode },
        } = response;
        const {
          data: { result },
        } = response;
        const {
          data: { resultMessage },
        } = response;
        
          console.log(result);
          console.log(resultMessage);
          console.log(resultCode);

        if(resultCode === '200'){

          alert("ログインに成功しました。")

          setCookie("memberId", result.memberId);
          setCookie("memberCookie", result.memberCookie);

          window.location.href = '/';
        }

        if(resultCode === "MBB02"){
          alert("IDが存在しません。");
        }
        if(resultCode === "MBB03"){
          alert("パスワードが一致しません。");
        }
        if(resultCode === "MBB17"){
          alert("退会した会員です。");
      }

      })
      .catch((error) => {
        console.error('login error:', error);
      });
  };

  const handleGoBack = () => {
    window.location.href = '/';
    console.log('GO BACK BUTTON CLICK');
  };

  return (

    <div className="app-container">

        <table className='app-container'>
        <thead>
          <tr>
            <th colSpan="2">
            ※LOGIN
            </th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <th>ID</th>
              <td>
                <input
                  type="text"
                  name="memberId"
                  maxLength={16}
                  value={formData.memberId}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>PASSWORD</th>
              <td>
                <input
                  type="password"
                  name="memberPassword"
                  maxLength={15}
                  value={formData.memberPassword}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button"
                onClick={() => {memberLogin();}}
        >  
          CONFIRM</button>
        <button type="button" onClick={handleGoBack}>GO BACK</button>
   
    </div>
  );
};

export default Login;