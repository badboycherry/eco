import React, { useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../login/AuthContext'; // useAuth 커스텀 훅 임포트
import './Header.css';
import Modal from './Modal';

const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용
    const { authToken, logout } = useAuth(); // setAuthToken 대신 logout 함수 가져오기
    const [activeMenu, setActiveMenu] = useState(''); // 메뉴 상태 관리
  
    // 메뉴 항목과 그에 해당하는 하위 메뉴 항목
    const menuItems = {
      '탄소중립이란?': [{ name: '탄소중립이란?', path: '/netzero' },{ name: '친환경제품이란?', path: '/Eco' } ],
      '탄소중립실천': [{ name: '대체품찾기', path: '/Replacement' }, { name: '일일미션', path: '/Mission' }, { name: '퀴즈', path: '/Quiz' }],
      '자유게시판': [{ name: '자유게시판', path: '/noticeboard' }],
      'ECO-제품': [{name : 'ECO-제품', path:'/Product'}],
    };
  
    // 메뉴 클릭 핸들러
    const handleMenuClick = (menuName) => {
      setActiveMenu(activeMenu === menuName ? '' : menuName); // 현재 활성화된 메뉴 토글
    };
  
  
    const handleClick = () => {
      setModalOpen(!isModalOpen); // 모달 상태를 토글
    };
  
  
    const handleLogout = () => {
      // 로컬 스토리지에서 토큰 삭제
      localStorage.removeItem('token');
      // 사용자 인증 상태 업데이트 (예: 로그아웃 함수 호출)
      logout();
      // 로그아웃 로그 출력
      console.log('로그아웃 처리됨');
      // 로그아웃 성공 알림
      alert('로그아웃되었습니다.');
      // 로그인 페이지로 리다이렉션
      navigate('/');
    };

  return (
    <header>
    <div className="logo">
      <Link to="/" className="logo2">
        <span>Greener</span>
      </Link>
    </div>
    <div className="menu">
      {Object.keys(menuItems).map((menuName) => (
        <div key={menuName}>
          <div className='line'>
            <button className="dropbtn" onClick={() => handleMenuClick(menuName)}>
              {menuName}
            </button>
          </div>
          {activeMenu === menuName && menuItems[menuName].length > 0 && (
            <div className="dropdown-content">
              {menuItems[menuName].map((subMenu) => (
                <Link to={subMenu.path} key={subMenu.name}>{subMenu.name}</Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="login">
      {authToken ? (
        <>
          <Link to="/mypage" className="dropbtn">마이페이지</Link>
          <button onClick={handleLogout} className="dropbtn">로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/Login" className="dropbtn">로그인</Link>
          <Link to="/Join" className="dropbtn">회원가입</Link>
        </>
      )}
    </div>
    <div className="icon">
      <FiAlignJustify onClick={handleClick} />
    </div>
        {/* 모달창 */}
        {isModalOpen && (
        <Modal closeModal={() => setModalOpen(false)} />
      )}
  </header>
  );
};

export default Header;
