/* Modal.js */

import React from 'react';
import './Modal.css'; // 모달 스타일을 위한 CSS 파일

import modal1 from '../img/INTERNET.png';
import modal2 from '../img/KEY.png';
import modal3 from '../img/INFORM.png';
import modal4 from '../img/PICTURES.png';


const Modal = ({ closeModal, children }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={closeModal}>&times;</span>
        {children}
        <div className='modal_title'>
            <h1>Greener 사이트맵</h1>
          </div>
        <div className="modal-container">
        <div className="modalimagetext">
        <img src={modal1} alt="모달1" />
        <h1 className='modaltext'>탄소중립이란?</h1>
        <ul>
          <li><a href='/netzero'>탄소중립이란?</a></li>
          <li><a href='/Eco'>친환경제품이란?</a></li>
        </ul>
        </div>
        <div className="modalimagetext">
        <img src={modal2} alt="모달2" />
        <h1 className='modaltext'>탄소중립 실천</h1>
        <ul>
          <li><a href='/Replacement'>대체품 찾기</a></li>
          <li><a href='/Mission'>일일미션</a></li>
          <li><a href='/Quiz'>퀴즈</a></li>
        </ul>
        </div>
        <div className="modalimagetext">
        <img src={modal3} alt="모달3" />
        <h1 className='modaltext'>자유게시판</h1>
        <ul>
          <li><a href='/noticeboard'>자유게시판</a></li>
        </ul>
        </div>
        <div className="modalimagetext">
        
        <img src={modal4} alt="모달4" />
        <h1 className='modaltext'>ECO-제품</h1>
        <ul>
          <li><a href="/Product">ECO-제품</a></li>
        </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
