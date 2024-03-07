import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../main/Header';
import '../main/Main.css';
import '../noticeboard/NoticeBoard.css';
import { usePosts } from '../noticeboard/PostsContext';

const NoticeBoard = () => {
    const { state: { posts }, dispatch } = usePosts();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // 데이터를 가져오는 중인지 여부를 나타내는 상태 추가


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true); // 데이터를 가져오기 시작할 때 로딩 상태를 활성화합니다.
                const { data } = await axios.get('http://localhost:8080/api/posts');
                dispatch({ type: 'SET_POSTS', payload: data }); // 가져온 데이터를 상태에 설정합니다.
            } catch (error) {
                console.error('게시글 목록 조회 중 에러 발생:', error);
                alert('게시글 목록 조회 중 에러 발생');
            } finally {
                setIsLoading(false); // 데이터를 가져오는 과정이 끝났으므로 로딩 상태를 비활성화합니다.
            }
        };
    
        fetchPosts();
    }, [dispatch]);
    
   

    const [currentPage, setCurrentPage] = useState(1);
    if (isLoading) {
        return <div>Loading...</div>;
      }
    const postsPerPage = 15;

    // 최신 게시글 순으로 정렬
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

    // 현재 페이지에 표시할 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지네이션을 위한 페이지 번호 변경 핸들러
    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(sortedPosts.length / postsPerPage)));
    };

    return (
        <body>
            <Header />
            <div className="notice-board-container">
                <h1>자유게시판</h1>
                <button className="write-button" onClick={() => navigate('/writeboard')}>글 작성하기</button>
                <table className="board-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((post, index) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td><Link to={`/noticeboard/${post.id}`}>{post.title}</Link></td>
                                <td>{post.username}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>이전</button>
                    <span>  {currentPage} </span>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(sortedPosts.length / postsPerPage)}>다음</button>
                </div>
            </div>
        </body>
    );
};

export default NoticeBoard;
