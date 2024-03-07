import React from 'react';
import '../Replacement/Replacementmodal.css'; // 경로는 프로젝트 구조에 맞게 조정하세요.

const ReplacementModal = ({ showModal, closeModal, products }) => {
    return (
        <>
            {showModal && (
                <div className="replacemodal">
                    <div className="replacemodal-content">
                        <h1>친환경 제품 추천</h1>
                        <div className="replacemodalproduct-grid">
                            {products.map((product, index) => (
                                <div className="replacemodalproduct-item" key={index}>
                                    <img src={product.imageData} alt={`Product ${index + 1}`} />
                                    <p>{product.filename}</p>
                                </div>
                            ))}
                        </div>
                        <button className='replacememtmodalbutton' onClick={closeModal}>확인</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReplacementModal;
