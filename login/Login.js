import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../main/Header';
import { useAuth } from './AuthContext'; // 경로는 프로젝트에 맞게 조정하세요
import './Login.css'; // CSS 파일 경로는 프로젝트 설정에 맞게 조정하세요

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // URL 쿼리 파라미터를 확인하여 로그인 필요 메시지를 설정
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loginRequired = queryParams.get('loginRequired');
    if (loginRequired) {
      setErrorMessage('로그인 후 이용 가능합니다');
    }
  }, [location]);
  const handleLogin = async (e) => {
    e.preventDefault();

    // URLSearchParams를 사용하여 폼 데이터 생성
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:8080/login', formData.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      // 응답 헤더에서 토큰 추출 (예시는 Bearer 토큰을 가정)
      if (response.headers.authorization) {
        const token = response.headers.authorization.split(" ")[1];
        login(token); // 토큰을 상태로 저장
        navigate('/'); // 로그인 성공 후 메인 페이지로 리다이렉트
      } else {
        throw new Error('로그인 실패: 서버로부터 토큰을 받지 못했습니다.');
      }
    } catch (error) {
      setErrorMessage('로그인 실패');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">login</button>
        </form>
      </div>
    </>
  );
};
export default Login;
