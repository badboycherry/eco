import React, { useState } from 'react';
import '../Replacement/Replacement.css'; // 경로는 프로젝트 구조에 맞게 조정하세요.
import Header from '../main/Header'; // 경로는 프로젝트 구조에 맞게 조정하세요.
import ReplacementModal from './Replacementmodal'; // 경로는 프로젝트 구조에 맞게 조정하세요.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import ImplementModal from './Implementmodal';

const Replacement = () => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [showReplacementModal, setShowReplacementModal] = useState(false);
    const [ecoFriendlyProducts, setEcoFriendlyProducts] = useState([]);
    const [showImplementModal, setShowImplementModal] = useState(false); // 실천하기 모달 상태

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(URL.createObjectURL(selectedImage));
        setImageFile(selectedImage);
    };

    const uploadImageToServer = async () => {
        if (!imageFile) {
            alert('이미지를 먼저 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        // 로컬 스토리지에서 토큰 가져오기
        const authToken = `Bearer ${localStorage.getItem('token')}`;

        fetch('http://localhost:8080/img_upload', {
            method: 'POST',
            headers: {
                'Authorization': authToken,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // 서버로부터 받은 데이터 로깅
                setEcoFriendlyProducts(data); // 받은 데이터를 상태에 저장
                setShowReplacementModal(true); // 모달 열기
            })
            .catch(error => {
                console.error('Error:', error);
                alert('이미지 업로드 실패');
            });
    };

    const openImplementModal = () => {
        setShowImplementModal(true);
    };

    const closeImplementModal = () => {
        setShowImplementModal(false);
    };

    return (
        <body>
            <Header />
            <div className="replacement-container">
                <div className='replace_title'>
                    <h2>ECO 대체품 찾기</h2>
                </div>
        
                <div className='replacement-container2'>
                    <h2>일상에서 실천하세요!</h2>
                    <h1>일상 생활에서 사용하는 물건의 사진을 업로드해 주시면, 친환경 제품을 추천해 드릴게요.</h1>
                    <h1> #샴푸 #린스 #세탁세제 #섬유유연제 #구연산 #베이킹소다 #과탄산소다 #화장지 #주방세제</h1>
                    <div className='replacementimg'>
                        {image && <img className="replaceupload-image" src={image} alt="Uploaded" />}
                        <label htmlFor="replacementupload-button" className="replacementupload-button">
                            <FontAwesomeIcon icon={faUpload} /> 이미지 업로드
                            <input id="replacementupload-button" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                        </label>
                    </div>
                    <button onClick={uploadImageToServer}>대체품 찾기</button>
                    <button onClick={openImplementModal}>실천하기</button>
                </div>
            </div>
            <ReplacementModal showModal={showReplacementModal} closeModal={() => setShowReplacementModal(false)} products={ecoFriendlyProducts} />
            <ImplementModal showModal={showImplementModal} closeModal={closeImplementModal} />
        </body>
    );
};

export default Replacement;
