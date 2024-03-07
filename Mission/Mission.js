import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import '../Mission/Mission.css';
import { useAuth } from '../login/AuthContext';
import Header from '../main/Header';

function MissionPage() {
  const [missions, setMissions] = useState([]);
  const [completedMissions, setCompletedMissions] = useState(new Set());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { authToken } = useAuth();

  const [missionCompletedDate, setMissionCompletedDate] = useState(null);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 미션 완료 날짜 확인
  useEffect(() => {
    // 랜덤 미션 불러오기
    const fetchMissions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/missions/random', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        console.log(data); // 응답 확인
        setMissions(data);
      } catch (error) {
        console.error('미션을 가져오는 중 오류 발생:', error);
      }
    };
    fetchMissions();
  }, [authToken]); // authToken이 변경될 때마다 useEffect가 실행됨




  // 미션 완료 처리
  const completeMission = (missionId) => {
    const mission = missions.find(mission => mission.id === missionId);
    if (mission && !mission.completed && !completedMissions.has(missionId)) {
      // 미션을 완료했을 때만 상태를 업데이트합니다.
      setCompletedMissions(prev => new Set(prev.add(missionId)));
    }
  };

  // 최종 미션 완료 처리
  const handleMissionCompleted = async () => {
    try {
      setButtonDisabled(true); // 버튼 비활성화

      const completedMissionIds = Array.from(completedMissions); // 완료된 미션 ID 배열
      if (completedMissionIds.length === 0) {
        alert("완료된 미션이 없습니다.");
        return;
      }

      // 중복된 미션 ID 제거
      const uniqueCompletedMissionIds = Array.from(new Set(completedMissionIds));

      // 서버에 중복 제거된 완료된 미션 ID들을 보내서 처리
      const response = await fetch('http://localhost:8080/api/missions/complete', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uniqueCompletedMissionIds) // 중복 제거된 ID 목록을 보냄
      });

      if (response.ok) {
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem(`missionCompletedDate_${authToken}`, today);
        setMissionCompletedDate(today);
        setModalIsOpen(true);

        // monthly/missions/complete 요청
        const monthlyMissionsResponse = await fetch('http://localhost:8080/monthly/missions/complete', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(uniqueCompletedMissionIds) // 중복 제거된 ID 목록을 보냄
        });

        if (!monthlyMissionsResponse.ok) {
          console.error('Monthly missions completion failed:', monthlyMissionsResponse.statusText);
        }
      } else if (response.status === 403) {
        alert("오늘은 이미 미션을 완료하셨습니다. 내일 다시 도전해주세요!");
      } else {
        alert("미션 완료에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('Error completing missions:', error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setButtonDisabled(false); // 요청이 완료되면 버튼을 다시 활성화
    }
  };

  // 모든 미션을 완료했는지 확인
  const allMissionsCompleted = () => {
    return missions.every(mission => completedMissions.has(mission.id));
  };

  // 미션 완료 버튼 클릭 핸들러
  const handleCompleteButtonClick = async () => {
    if (!allMissionsCompleted()) {
      alert("모든 미션을 완료해야 합니다.");
      return;
    }

    // 버튼이 이미 비활성화되었는지 확인
    if (buttonDisabled) {
      return;
    }

    try {
      setButtonDisabled(true); // 버튼 비활성화

      // 최종 미션 완료 처리
      await handleMissionCompleted();
    } finally {
      setButtonDisabled(false); // 요청이 완료되면 버튼을 다시 활성화
    }
  };

  return (
    <body>
      <Header />
      <div className='Mission'>
        <h1>일일미션을 완료하여 탄소중립을 실천해보세요!</h1>
        {missionCompletedDate === new Date().toISOString().slice(0, 10) ? (
          <p className="mission-completed-message">오늘의 미션을 모두 완료하셨습니다. 내일 다시 도전해주세요!</p>
        ) : (
          <div className='Mi-list' style={{ display: "flex", flexDirection: "column" }}>
            {missions.map((mission, index) => (
              <div className='Mi-none' key={mission.id} style={{ display: "flex", alignItems: "center", marginBottom: "30px", textDecoration: mission.completed }}>
                <span className='Mi-number'> {index + 1}</span>
                <span className='Mi-naeyong'>{mission.description}</span>

                <button
                  className={completedMissions.has(mission.id) ? 'Mi-ok-completed' : 'Mi-ok'}
                  onClick={(event) => {
                    event.stopPropagation();
                    completeMission(mission.id);
                  }}
                >
                  {completedMissions.has(mission.id) ? '완료' : '확인'}
                </button>

              </div>
            ))}
            <button
              className='Mi-lastok'
              onClick={handleCompleteButtonClick}
              disabled={!allMissionsCompleted() || buttonDisabled} // 모든 미션을 완료하지 않거나 버튼이 비활성화되었을 때 비활성화
            >
              미션 완료
            </button>

          </div>
        )}
        <Modal className="Missioncomplte" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Mission Complete Modal">
          <div className="ModalContent">
            <h2 className="ModalTitle">오늘 미션 최종 완료</h2>
            <button className="CloseButton" onClick={() => setModalIsOpen(false)}>닫기</button>
          </div>
        </Modal>
      </div>
    </body>
  );
}

export default MissionPage;
