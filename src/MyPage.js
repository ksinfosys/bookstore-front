import React, { useState, useEffect } from 'react';
import './css/Join.css';
import axios from 'axios';
import { getCookie } from './utils/cookie';

const MyPage = () => {

  useEffect(() => {
    const memberAccountStatus = async () => {

      try {
        const requestData = {
          memberId: getCookie('memberId'),
          memberCookie: getCookie('memberCookie')
        };

        const response = await axios
          .post('/myaccount', requestData);

        let memberEmail = (response.data.result.memberEmail).split("@");
        let memberEmailId =memberEmail[0];
        let memberEmailAddress = memberEmail[1];

        let memberPhone = (response.data.result.memberPhone).split("-");
        let memberPhone1 = memberPhone[0];
        let memberPhone2 = memberPhone[1];
        let memberPhone3 = memberPhone[2];

        setFormData({
          memberEmailId: memberEmailId,
          memberEmailAddress: memberEmailAddress,
          memberId: response.data.result.memberId,
          memberPhone1: memberPhone1,
          memberPhone2: memberPhone2,
          memberPhone3: memberPhone3,
          address: {
            memberPostalCode: response.data.result.memberPostalCode,
            memberPostAddress: response.data.result.memberPostAddress,
            memberDetailedAddress: response.data.result.memberDetailedAddress,
          },
        });
      } catch (error) {
        console.error('Error', error);
      }
    };
    memberAccountStatus();
  }, []); 

  const [formData, setFormData] = useState({
    memberEmailId: '',
    memberEmailAddress: '',
    memberId: '',
    memberPhone1: '',
    memberPhone2: '',
    memberPhone3: '',
    address: {
      memberPostalCode: '',
      memberPostAddress: '',
      memberDetailedAddress: '',
    },
  });

  const handlePasswordUpdate = () => {
    window.location.href = '/myaccount/passwordUpdate';
    console.log('PASSWORD UPDATE BUTTON CLICK');
  };

  const handleGoBack = () => {
    window.location.href = '/';
    console.log('GO BACK BUTTON CLICK');
  };

  const MyAccountUpdate = () => {
    window.location.href = '/myaccount/update';
    console.log('memberAccountUpdatePage BUTTON CLICK');
  };

  return (
    <div className="app-container">
        <table className="app-container">
          <thead>
            <tr>
              <th colSpan="2">※MY ACCOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>ID</th>
              <td>
                <input
                  type="text"
                  name="memberId"
                  value={formData.memberId}
                  readOnly
                />
              </td>
            </tr>
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
                <button type="pwupdate" onClick={handlePasswordUpdate}>
                  PWUPDATE
                </button>
              </td>
            </tr>
            <tr>
              <th>PHONE NUMBER</th>
              <td>
                <input
                  type="text"
                  name="memberPhone1"
                  value={formData.memberPhone1}
                  readOnly
                />
                <span className="sign"></span>
                <span className="sign">-</span>
                <input
                  type="text"
                  name="memberPhone2"
                  value={formData.memberPhone2}
                  readOnly
                />
                <span className="sign"></span>
                <span className="sign">-</span>
                <input
                  type="text"
                  name="memberPhone3"
                  value={formData.memberPhone3}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th row rowSpan={3}>
                ADDRESS
              </th>
              <td>
                <input
                  type="text"
                  name="address.memberPostalCode"
                  placeholder="POSTAL CODE"
                  value={formData.address.memberPostalCode}
                  readOnly
                />
                <span className="sign"></span>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="address.memberPostAddress"
                  placeholder="POST ADDRESS"
                  value={formData.address.memberPostAddress}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="address.memberDetailedAddress"
                  placeholder="DETAILED ADDRESS"
                  value={formData.address.memberDetailedAddress}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => {MyAccountUpdate();}}
        >
          UPDATE
        </button>
        <button type="button" onClick={handleGoBack}>
          GO BACK
        </button>
    </div>
  );
};

export default MyPage;