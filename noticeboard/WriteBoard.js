//글작성페이지
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../main/Header';
import '../main/Main.css';
import { usePosts } from '../noticeboard/PostsContext';
import '../noticeboard/WriteBoard.css';


const WriteBoard= () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);

    

    const { dispatch } = usePosts();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString(); // 현재 날짜를 ISO 문자열 형식으로 변환
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
    
        try {
            const { data } = await axios.post('http://localhost:8080/api/posts', { title, content }, config);
            dispatch({ type: 'ADD_POST', payload: data });
            alert('글 작성이 완료되었습니다')
            navigate('/noticeboard');
        } catch (error) {
            console.error('게시글 작성 중 에러 발생:', error);
            
        }
    };
    const handleCancel = () => {
        // 취소 로직: 현재 페이지를 벗어납니다.
        navigate(-1);
    };


    return (
        <body>
            <Header />
            <div className="write-board-container">
                <h1>자유게시판</h1>
                <form className="post-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="postTitle">제목</label>
                        <input
                            type="text"
                            id="postTitle"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postContent">내용</label>
                        <textarea
                            id="postContent"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-button" >등록</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>취소</button>
                    </div>
                </form>
            </div>
     
        </body>


    );

};
export default WriteBoard;