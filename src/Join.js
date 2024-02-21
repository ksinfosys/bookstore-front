import React, { useState } from 'react';
import './css/Join.css';
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import Post from './Post';

function generateOptions(start, end) {
  const options = [];

  for(let i = start; i <= end; i++){
    options.push(<option key={i} value={i}>{i}</option>);
  }

  return options;
}

const Join = () => {

  const [formData, setFormData] = useState({
    memberName: '',
    memberEmailId: '',
    memberEmailAddress: '',
    emailDomain: '',
    memberId: '',
    memberPassword: '',
    memberPasswordRe: '',
    memberPhone1: '',
    memberPhone2: '',
    memberPhone3: '',
    memberBirthYear: '',
    memberBirthMonth: '',
    memberBirthDay: '',
    memberGender: '',
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

  const memberJoin = () => {
    const requestData = {
      memberName: formData.memberName,
      memberEmailId: formData.memberEmailId,
      memberEmailAddress: formData.memberEmailAddress,
      memberId: formData.memberId,
      memberPassword: formData.memberPassword,
      memberPasswordRe: formData.memberPasswordRe,
      memberPhone1: formData.memberPhone1,
      memberPhone2: formData.memberPhone2,
      memberPhone3: formData.memberPhone3,
      memberBirthYear: formData.memberBirthYear,
      memberBirthMonth: formData.memberBirthMonth,
      memberBirthDay: formData.memberBirthDay,
      memberGender: formData.memberGender,
      memberPostalCode: enroll_company.postcode,
      memberPostAddress: enroll_company.address,
      memberDetailedAddress: formData.address.memberDetailedAddress,
    };

    axios
      .post('/join', requestData)
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

        if(formData.memberPassword !== formData.memberPasswordRe){
          alert("パスワードが一致しません。")
        }
  
        if(resultCode === "MBB15"){
          alert("パスワードは数字、文字、特殊文字を含めて8~15桁以内で入力してください。");
          
        }
        
        if(resultCode === "MBB01"){
          alert("登録されたIDです。別のIDを入力してください。");
        }

        if(resultCode === "200"){
          alert("会員登録されました。")
          window.location.href = '/login';
        }

      })
      .catch((error) => {
        console.error('join error:', error);
      });
  };

  const handleCheckId = () => {
    const requestData = {
      memberId: formData.memberId,
      memberPassword: formData.memberPassword,
      memberPasswordRe: formData.memberPasswordRe,
    };

    axios
    .post('/idCheck', requestData)
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

      console.log(resultCode);
      console.log(resultMessage);

      if(resultCode === "MBB13"){
        alert("英数字の組み合わせを16桁以下で入力してください。")
      }

      if(resultCode === "MBB01"){
        alert("登録されたIDです。別のIDを入力してください。")
      }

      if(resultCode === "200"){
        alert("このIDはご利用いただけます。")
      }

    })
    .catch((error) => {
      console.error('join error:', error);
    });

    console.log('checkId BUTTON CLICK');
  };

  const handleGoBack = () => {
    window.location.href = '/';
    console.log('GO BACK BUTTON CLICK');
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
  
  const handleComplete = (data) => {
      setPopup(!popup);
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
              <th>NAME</th>
              <td>
                <input
                  type="text"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleChange}
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
              <th>ID</th>
              <td>
                <input
                  type="text"
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleChange}
                  placeholder='(英)文字/数字'
                />
                <span className='sign'></span>
                <button
                  type="checkId"
                  onClick={handleCheckId}
                >
                  CHECK ID
                </button>
              </td>
            </tr>
            <tr>
              <th>PASSWORD</th>
              <td>
                <input
                  type="password"
                  name="memberPassword"
                  value={formData.memberPassword}
                  onChange={handleChange}
                  placeholder='8~16文字の英文、数字、特殊文字を組み合わせ'
                />
              </td>
            </tr>
            <tr>
              <th>PASSWORD RE</th>
              <td>
                <input
                  type="password"
                  name="memberPasswordRe"
                  value={formData.memberPasswordRe}
                  onChange={handleChange}
                />
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
              <th>BIRTHDAY</th>
              <td>
                <select
                  name="memberBirthYear"
                  value={formData.memberBirthYear}
                  onChange={handleChange}
                  >
                  <option value="">Year</option>
                  {generateOptions(1900, new Date().getFullYear())}
                </select>
                &nbsp;
                <select
                  name="memberBirthMonth"
                  value={formData.memberBirthMonth}
                  onChange={handleChange}
                  >
                  <option value="">Month</option>
                  {generateOptions(1, 12)}
                </select>
                &nbsp;
                <select
                  name="memberBirthDay"
                  value={formData.memberBirthDay}
                  onChange={handleChange}
                  >
                  <option value="">Day</option>
                  {generateOptions(1, 31)}
                  </select>
              </td>
            </tr>
            <tr>
            <th>GENDER</th>
            <td>
              <label>
                <input
                  type="radio"
                  name="memberGender"
                  value="m"
                  checked={formData.memberGender === "m"}
                  onChange={handleChange}
                />
                M
              </label>
              <label>
                <input
                  type="radio"
                  name="memberGender"
                  value="f"
                  checked={formData.memberGender === "f"}
                  onChange={handleChange}
                />
                F
              </label>
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
                  value={formData.address.memberDetailedAddress}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button"
                onClick={() => {memberJoin();}}
        >  
          CONFIRM</button>

        <button type="button" onClick={handleGoBack}>GO BACK</button>

    </div>

</div>
  );
};

export default Join;