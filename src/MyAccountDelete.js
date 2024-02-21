import React, { useEffect, useState } from 'react';
import './css/Join.css';
import axios from "axios";
import { getCookie, removeCookie, setCookie } from './utils/cookie';

const MyAccountDelete = () => {
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

  const memberDelete = () => {
    const requestData = {

        memberId: getCookie("memberId"),
        memberCookie: getCookie("memberCookie"),

        memberPassword: formData.memberPassword,

    };

    axios
      .post('/myaccount/delete', requestData)
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

          alert("会員削除されました。")

          removeCookie("memberId", result.memberId);
          removeCookie("memberCookie", result.memberCookie);

          window.location.href = '/';
        }

        if(resultCode === "MBB11"){
          alert("ログイン状態をもう一度確認してください。");
        }
        if(resultCode === "MBB03"){
          alert("パスワードが一致しません。");
        }
      })
      .catch((error) => {
        console.error('delete error:', error);
      });
  };

  const handleGoBack = () => {
    window.location.href = '/myaccount/update';
    console.log('GO BACK BUTTON CLICK');
  };

  return (

    <div className="app-container">

        <table className='app-container'>
        <thead>
          <tr>
            <th colSpan="2">
            ※DELETE
            </th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <th>PASSWORD</th>
              <td>
                <input
                  type="password"
                  name="memberPassword"
                  value={formData.memberPassword}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button"
                onClick={() => {memberDelete();}}
        >  
          CONFIRM</button>
        <button type="button" onClick={handleGoBack}>GO BACK</button>
   
    </div>
  );
};

export default MyAccountDelete;