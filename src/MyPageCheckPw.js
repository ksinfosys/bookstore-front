import React, { useState, useEffect } from 'react';
import './css/Join.css';
import axios from "axios";
import { getCookie, setCookie } from './utils/cookie';

const MyPageCheckPw = () => {

    const [formData, setFormData] = useState({
        memberEmailId: '',
        memberEmailAddress: '',

        memberPassword: '',
      });

      const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value,
        })
      };

    const confirm = () => {

      if(!formData.memberPassword){
        alert("パスワードを入力してください。")
        return;
      }
  
        const requestData = {
          memberId: getCookie('memberId'),
          memberCookie: getCookie('memberCookie'),
          memberPassword: formData.memberPassword,
        };
          console.log(requestData);
        axios
        .post('/checkPassword', requestData)
        .then((response) => {
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
              window.location.href = '/myaccount';
            }

            else if(resultCode === 'MBB03'){
              alert("パスワードが一致しません。")
            }

        })
        .catch((error) => {
          console.error('login error:', error);
        });
    };

    useEffect(() => {
        const memberAccountStatus = async () => {
    
          try {
            const requestData = {
              memberId: getCookie('memberId'),
              memberCookie: getCookie('memberCookie')
            };
    
            const response = await axios
              .post('/myaccount/checkpassword', requestData);
    
            let memberEmail = (response.data.result.memberEmail).split("@");
            let memberEmailId =memberEmail[0];
            let memberEmailAddress = memberEmail[1];
    
            setFormData({
              memberEmailId: memberEmailId,
              memberEmailAddress: memberEmailAddress,
            });
          } catch (error) {
            console.error('Error', error);
          }
        };
        memberAccountStatus();
      }, []);

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
            ※CHECK PASSWORD
            </th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <th>E-MAIL</th>
              <td>
                <input
                  type="text"
                  name="memberEmailId"
                  value={formData.memberEmailId}
                  readOnly
                />
                <span className="sign"></span>
                <span className="sign">@</span>
                <input
                  type="text"
                  name="memberEmailAddress"
                  value={formData.memberEmailAddress}
                  readOnly
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
                onClick={() => {confirm();}}
        >  
          CONFIRM</button>
          <button type="button" onClick={handleGoBack}>GO BACK</button>
    </div>
  );
};

export default MyPageCheckPw;