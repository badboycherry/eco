import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EarthImage from '../img/지구1.png';
import { useAuth } from '../login/AuthContext';
import Header from '../main/Header';
import '../main/Main.css';
import '../mypage/MyPage.css';
//스탬프 이미지
import stampImage from '../img/Stamp.png';





const MyPage = () => {
  const navigate = useNavigate();
  const { logout, authToken } = useAuth();
  
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    dailyCount: 0,
  });
  const [activities, setActivities] = useState({
    dailyMissionCount: 0,
    dailyQuizCount: 0,
    ecoCount: 0,
  });

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { name, username, dailyCount } = response.data;
      setUserInfo({ name, username, dailyCount });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [authToken]);

  const fetchMonthlyActivities = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user-activities/monthly?year=${currentYear}&month=${currentMonth}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { missionCount, quizCount, ecoCount } = response.data;
      setActivities({ dailyMissionCount: missionCount, dailyQuizCount: quizCount, ecoCount: ecoCount });
    } catch (error) {
      console.error('Error fetching monthly activities:', error);
    }
  }, [authToken, currentYear, currentMonth]);

  useEffect(() => {
    fetchUserInfo();
    fetchMonthlyActivities();
  }, [fetchUserInfo, fetchMonthlyActivities, currentYear, currentMonth, authToken]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    console.log('로그아웃 처리됨');
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  const handleNavigateToUpdate = () => {
    navigate('/update');
  };

  const handleAccountDeletion = async (e) => {
    e.preventDefault();
    const username = userInfo.username;
    const isConfirmed = window.confirm('정말 탈퇴하시겠습니까?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/users/${username}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        alert('회원 탈퇴가 완료되었습니다.');
        handleLogout();
      } catch (error) {
        console.error('회원 탈퇴 실패:', error);
        alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => prevMonth === 1 ? 12 : prevMonth - 1);
    if (currentMonth === 1) {
      setCurrentYear(prevYear => prevYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth === 12 ? 1 : prevMonth + 1);
    if (currentMonth === 12) {
      setCurrentYear(prevYear => prevYear + 1);
    }
  };
  


  // 프로필 카드
  const ProfileCard = () => (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={EarthImage} alt="지구" />
        </div>
        <h2>{userInfo.name}</h2>
        <p>님 환영합니다 !</p>
      </div>
      <div className="profile-actions">
        <button onClick={handleNavigateToUpdate} className="profile-action-button">
          회원정보 수정
        </button>
        <form onSubmit={(e) => handleAccountDeletion(e)}>
          <button type="submit" className="profile-action-button">회원 탈퇴하기</button>
          
        </form>
      </div>

    </div>
  );



  // 활동 요약
  // 활동 요약
  const ActivitySummary = () => (
    <div className="activity-summary">
      

      <div className="activity-box">
        <div className="activity-title-wrapper">
          <div className="activity-title">에코 POINT</div>
        </div>
        <div className="activity-count">{activities.ecoCount}P</div>
      </div>
      <div className="activity-box">
        <div className="activity-title-wrapper">
          <div className="activity-title">일일 미션</div>
        </div>
        <div className="activity-count">{activities.dailyMissionCount}건</div>
      </div>
      <div className="activity-box">
        <div className="activity-title-wrapper">
          <div className="activity-title">퀴즈</div>
        </div>
        <div className="activity-count">{activities.dailyQuizCount}건</div>
      </div>
      <div className="activity-summary-buttons">
        <button className="activity-button" onClick={handlePreviousMonth}>&lt;</button>
        <div className="current-date"> {currentYear}-{currentMonth} </div>
        <button className="activity-button" onClick={handleNextMonth}> &gt;</button>
      </div>
    </div>

);





  const StampSystem = ({ dailyCount }) => {
    const totalSlots = 10; // 전체 스탬프 틀의 개수
    const [start, setStart] = useState(0); // 표시할 스탬프 시작 인덱스

    // 이전 스탬프 표시
    const showPreviousStamps = () => {
      setStart(Math.max(start - totalSlots, 0));
    };

    // 다음 스탬프 표시
    const showNextStamps = () => {
      setStart(start + totalSlots);
    };

    return (

      <div className="stamp-container">
        <h2>나의 출석 스탬프</h2>
        <div className="stamp-list">
          {/* 스탬프 표시 */}
          {Array(totalSlots).fill().map((_, index) => {
            const stampIndex = start + index;
            const isStamped = stampIndex < dailyCount;
            return (
              <div key={`stamp-${index}`} className={`stamp`}>
                {/* 스탬프 이미지 */}
                {isStamped && <img src={stampImage} alt="Stamp" />}
              </div>
            );
          })}
        </div>
        <div className='stamp-btn'>
        <button onClick={showPreviousStamps} disabled={start === 0}>이전</button>
        <button onClick={showNextStamps} disabled={dailyCount <= start + totalSlots}>다음</button>
        </div>
      </div>
    );
  };











  return (
    <body>
      <Header /> {/* Header 컴포넌트를 렌더링 */}
      <main className="mypage-container">
        <ProfileCard />
        <div className='mypage-main'>
        <ActivitySummary />
        <StampSystem dailyCount={userInfo.dailyCount} /> {/* 수정된 StampSystem 호출 */}
        </div>
      </main>




    </body>


  );

};
export default MyPage;