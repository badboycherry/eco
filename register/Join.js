import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signup from '../img/markus-spiske-r1BS0pzlr1M-unsplash.jpg';
import Header from '../main/Header';
import '../main/Header.css';
import '../register/SignupForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', // 'id' 대신 'username' 사용
    name: '',
    password: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      username: formData.username,
      name: formData.name,
      password: formData.password,
      address: formData.address,
    };
    // handleSubmit 함수 내에서
    try {
      const response = await axios.post('http://localhost:8080/join', postData);
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        navigate('/')
      } else {
        alert('회원가입 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('회원가입 실패:', error.response.data.message);
      alert('회원가입에 실패했습니다: ' + error.response.data.message);
    }

  };
  
  const checkUsername = async () => {
    if (!formData.username) {
      alert('아이디를 입력해주세요.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/check-username?username=${formData.username}`);
      alert(response.data); // 서버로부터의 응답 메시지를 알림
    } catch (error) {
      alert(error.response.data); // 에러 메시지 알림
    }
  };
  

  return (
    <body>
      <Header />

      <div className='form_box'>
        <div className='signup_img'>
          <img src={signup} alt="Signup" />
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className='form_title'>
          Sign up
          </div>
          <div className='form_con'>
            <div className="membership">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="membership">
              <label>ID</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
              <button type="button" onClick={checkUsername}>중복확인</button>
            </div>
            <div className="membership">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              
            </div>
            <div className="membership">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className='register_btn'>회원가입</button>
        </form>
      </div>
    </body>
  );
};

export default RegisterForm;