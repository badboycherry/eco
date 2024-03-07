import React, { useState } from 'react';
import axios from 'axios'; // axios 임포트
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import '../Replacement/Implementmodal.css';

const Implementmodal = ({ showModal, closeModal }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // 이미지 제출 처리를 위한 메소드
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    // 로컬 스토리지에서 토큰 가져오기
    const authToken = `Bearer ${localStorage.getItem('token')}`;

    try {
      const response = await axios.post('http://localhost:8080/api/eco-auth/img_upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': authToken, // 인증 토큰을 요청 헤더에 추가
        },
      });

      // 서버로부터의 응답 데이터 구조를 콘솔에 출력
      console.log(response.data);

      // 서버로부터의 응답 데이터 처리
      if (response.data.success) {
        // 성공 메시지 출력
        alert(`인증 완료! ${response.data.message}`);
        
      } else {
        // 실패 메시지 출력
        alert('인증 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const implementuploadButtonText = selectedImage ? "다시 업로드 하기" : "이미지 업로드";

  return (
    <>
      {showModal && (
        <div className="implementmodal">
          <div className="implementmodal-content">
            <span className="implementmodalclose" onClick={closeModal}>&times;</span>
            <h1>친환경 제품 구매 인증</h1>
            <h2>친환경 제품을 구매한 내역을 인증하고 탄소중립을 실천해보세요</h2>
            <div className='implementimg'>
              {selectedImage && (
                <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" />
              )}
              <label htmlFor="implementmodalimageUpload" className="implementmodalimageUpload">
                <FontAwesomeIcon icon={faUpload} /> {implementuploadButtonText}
              </label>
              <input id="implementmodalimageUpload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            <button className='implementmodalbutton' onClick={handleSubmit} disabled={!selectedImage}>실천완료</button>
            <h3>실천완료를 누르시면 탄소중립 실천이 완료됩니다</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Implementmodal;
