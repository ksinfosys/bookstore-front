import React, { useState, useEffect } from 'react';
import './css/Join.css';
import axios from "axios";
import { getCookie } from './utils/cookie';
import Post from './Post';

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

    if(!/^[a-zA-Z\u3040-\u30FF\u3131-\uD79D]+$/.test(formData.memberName)){
      alert("文字で入力してください。")
      return;
    }
    if(!(formData.memberEmailId || formData.memberEmailAddress)){
      alert("メールを入力してください。")
      return;
    }
    if(!/^\d+$/.test(formData.memberPhone1 && formData.memberPhone2 && formData.memberPhone3)) {
      alert("数字で入力してください。")
      return;
    }
    if(!(enroll_company.postcode && enroll_company.address && formData.address.memberDetailedAddress)){
      alert("住所を入力してください。")
      return;
    }
    
    const requestData = {
          memberId: getCookie('memberId'),
          memberCookie: getCookie('memberCookie'),

      memberEmailId: formData.memberEmailId,
      memberEmailAddress: formData.memberEmailAddress,
      memberPhone1: formData.memberPhone1,
      memberPhone2: formData.memberPhone2,
      memberPhone3: formData.memberPhone3,
      memberPostalCode: enroll_company.postcode,
      memberPostAddress: enroll_company.address,
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

  const handleComplete = (data) => {
    setPopup(!popup);
}

  const handleDelete = () => {
    window.location.href = '/myaccount/delete';
    console.log('DELETE BUTTON CLICK.');
  };

  const [enroll_company, setEnroll_company] = useState({
    address:'',
    postcode:''
  });
  
  const [popup, setPopup] = useState(false);
  
  const handleInput = (e) => {
    setEnroll_company({
        ...enroll_company,
          [e.target.name]:e.target.value,
      })
  }

  return (

<div>

    <div className="address_search" >
      {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
    </div>

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
                  maxLength={20}
                  value={formData.memberEmailId}
                  onChange={handleChange}
                />
                <span className='sign'></span>
                <span className='sign'>@</span>
                <input
                  type="text"
                  name="memberEmailAddress"
                  maxLength={20}
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
                  maxLength={4}
                  value={formData.memberPhone1}
                  onChange={handleChange}
                />
                <span className='sign'></span>
                <span className='sign'>-</span>
                <input
                  type="text"
                  name="memberPhone2"
                  maxLength={4}
                  value={formData.memberPhone2}
                  onChange={handleChange}
                />
                <span className='sign'></span>
                <span className='sign'>-</span>
                <input
                  type="text"
                  name="memberPhone3"
                  maxLength={4}
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
                  value={enroll_company.postcode}
                  readOnly
                />
                <span className='sign'></span>

                <button type="search" onClick={handleComplete}>SEARCH</button>

              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="address.memberPostAddress"
                  placeholder="POST ADDRESS"
                  value={enroll_company.address}
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
                  maxLength={20}
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
        <button type="button" onClick={handleDelete}>DELETE</button>
    </div>

    </div>
  );
};

export default MyAccountUpdate;