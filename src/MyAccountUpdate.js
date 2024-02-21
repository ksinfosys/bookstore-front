import React, { useState, useEffect } from 'react';
import './css/Join.css';
import axios from "axios";
import { getCookie } from './utils/cookie';

const MyAccountUpdate = () => {

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
    memberId: '',
    memberEmailId: '',
    memberEmailAddress: '',
    emailDomain: '',
    memberPhone1: '',
    memberPhone2: '',
    memberPhone3: '',
    address: {
      memberPostalCode: '',
      memberPostAddress: '',
      memberDetailedAddress: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "emailDomain") {
      if (value === "select") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          emailDomain: value,
          memberEmailAddress: "",
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          emailDomain: value,
          memberEmailAddress: value,
        }));
      }
    } else if (name.includes("address.")) {
      const addressKeys = name.split('.');
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressKeys[1]]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const resetFormData = () => {
    setFormData({
      memberId: '',
      memberEmailId: '',
      memberEmailAddress: '',
      memberPhone1: '',
      memberPhone2: '',
      memberPhone3: '',
      address: {
        memberPostalCode: '',
        memberPostAddress: '',
        memberDetailedAddress: '',
      },
    });
  };

  const memberMyAccountUpdate = () => {
    const requestData = {
          memberId: getCookie('memberId'),
          memberCookie: getCookie('memberCookie'),

      memberEmailId: formData.memberEmailId,
      memberEmailAddress: formData.memberEmailAddress,
      memberPhone1: formData.memberPhone1,
      memberPhone2: formData.memberPhone2,
      memberPhone3: formData.memberPhone3,
      memberPostalCode: formData.address.memberPostalCode,
      memberPostAddress: formData.address.memberPostAddress,
      memberDetailedAddress: formData.address.memberDetailedAddress,
    };

    axios
      .post('/myaccount/update', requestData)
      .then((response) => {
        console.log('update confirm', response.data);
        resetFormData();
        window.location.href = '/myaccount';
      })
      .catch((error) => {
        console.error('update error:', error);
      });
  };

  const handlePasswordUpdate = () => {
    window.location.href = '/myaccount/passwordUpdate';
    console.log('checkId BUTTON CLICK');
  };

  const handleGoBack = () => {
    window.location.href = '/';
    console.log('GO BACK BUTTON CLICK');
  };

  const handleSearchPostalCode = () => {
    // add search code 
    console.log('SEARCH BUTTON CLICK.');
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
                  onChange={handleChange}
                />
                <span className='sign'></span>
                <span className='sign'>@</span>
                <input
                  type="text"
                  name="memberEmailAddress"
                  value={formData.memberEmailAddress}
                  onChange={handleChange}
                  placeholder='直接入力します'
                />
                <span className='sign'></span>
                <select
                  name="emailDomain"
                  value={formData.emailDomain}
                  onChange={handleChange}
                >
                  <option value="">SELECT</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="yahoo.co.jp">yahoo.co.jp</option>
                  <option value="naver.com">naver.com</option>
                </select>
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
                  onChange={handleChange}
                />
                <span className='sign'></span>
                <span className='sign'>-</span>
                <input
                  type="text"
                  name="memberPhone2"
                  value={formData.memberPhone2}
                  onChange={handleChange}
                />
                <span className='sign'></span>
                <span className='sign'>-</span>
                <input
                  type="text"
                  name="memberPhone3"
                  value={formData.memberPhone3}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th row rowSpan={3}>ADDRESS</th>
              <td>
                <input
                  type="text"
                  name="address.memberPostalCode"
                  placeholder="POSTAL CODE"
                  value={formData.address.memberPostalCode}
                  onChange={handleChange}
                />
                <span className='sign'></span>
                <button
                  type="search"
                  onClick={handleSearchPostalCode}
                >
                  SEARCH
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="address.memberPostAddress"
                  placeholder="POST ADDRESS"
                  value={formData.address.memberPostAddress}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button"
                onClick={() => {memberMyAccountUpdate();}}
        >  
          CONFIRM</button>

        <button type="button" onClick={handleGoBack}>GO BACK</button>
    </div>
  );
};

export default MyAccountUpdate;