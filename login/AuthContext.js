import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // 초기 토큰 상태 설정

  const login = (token) => {
    localStorage.setItem('token', token); // 로컬 스토리지에 토큰 저장
    setAuthToken(token); // 상태 업데이트
  };

  const logout = (username) => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
    setAuthToken(null); // 상태 업데이트
  };

  const deleteAccount = async (token, username) => {
    try {
      console.log('DELETE 요청을 보냅니다.');
      const response = await axios.delete(`http://localhost:8080/users/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('DELETE 요청 완료:', response);
      if (response.status === 200) {
        logout();
        alert('회원 탈퇴가 성공적으로 완료되었습니다.');
        window.location.href = '/';
      } else {
        alert('회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원 탈퇴 요청 중 에러 발생:', error);
      if (error.response?.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        logout();
        window.location.href = '/login';
      } else {
        const errorMessage = error.response?.data?.message || '서버 오류가 발생했습니다.';
        alert(`회원 탈퇴에 실패했습니다: ${errorMessage}`);
      }
    }
  };
  
  
  
 
  
  
  
  
  

  return (
    <AuthContext.Provider value={{ authToken, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
