import React, { useState } from 'react';
import './css/Join.css';
import axios from "axios";
import { getCookie } from './utils/cookie';

const MyAccountPwUpdate = () => {

  const [formData, setFormData] = useState({
    memberPassword: '',
    memberPasswordRe: '',
    memberPasswordReNew: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  const resetFormData = () => {
    setFormData({
      memberPassword: '',
      memberPasswordRe: '',
      memberPasswordReNew: '',
    });
  };

  const confirm = () => {
    const requestData = {
          memberId: getCookie('memberId'),
          memberCookie: getCookie('memberCookie'),

      memberPassword: formData.memberPassword,
      memberPasswordRe: formData.memberPasswordRe,
      memberPasswordReNew: formData.memberPasswordReNew,
    };

    axios
      .post('/myaccount/updatepassword', requestData)
      .then((response) => {

        console.log('update confirm', response.data);

        resetFormData();

        const {
            data: { resultMessage },
          } = response;
          const {
            data: { resultCode },
          } = response;
          const {
            data: { result },
          } = response;

            console.log(result);
            console.log(resultMessage);
            console.log(resultCode);
        
        if(resultCode === '200'){
            alert("変更されました。")
            window.location.href = '/myaccount';    
        }
        
        if(resultCode === "MBB03"){
            alert("パスワードが一致しません。")
        }

        if(resultCode === "MBB15"){
          alert("パスワードは数字、文字、特殊文字を含めて8~15桁以内で入力してください。")
        }

        if(resultCode === "MBB16"){
            alert("新しいパスワードが一致しません。")
        }

      })
      .catch((error) => {
        console.error('updatepassword error:', error);
      });
  };

  const handleGoBack = () => {
    // send data
    console.log('GO BACK BUTTON CLICK');
  };

  return (
    <div className="app-container">
        <table className='app-container'>
        <thead>
          <tr>
            <th colSpan="2">
            ※JOIN
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
            <tr>
              <th>NEW PASSWORD</th>
              <td>
                <input
                  type="password"
                  name="memberPasswordRe"
                  value={formData.memberPasswordRe}
                  placeholder='8~16文字の英文、数字、特殊文字を組み合わせ'
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>RE ENTER NEW PASSWORD</th>
              <td>
                <input
                  type="password"
                  name="memberPasswordReNew"
                  value={formData.memberPasswordReNew}
                  placeholder='8~16文字の英文、数字、特殊文字を組み合わせ'
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button"
                onClick={() => {confirm();}}
        >  
          CONFIRM</button>
        <button type="button" onClick={handleGoBack}>GO BACK</button>
    </div>
  );
};

export default MyAccountPwUpdate;