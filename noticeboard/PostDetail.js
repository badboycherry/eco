import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../main/Header';
import { usePosts } from '../noticeboard/PostsContext';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const { dispatch } = usePosts();
  const navigate = useNavigate();


  //const post = posts.find(post => post.id === parseInt(postId));
  const [post, setPost] = useState({ title: '', content: '', comments: [] }); // comments를 빈 배열로 초기화
  const [ isLoading,setLoading] = useState(true);
  const [ setError] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  const [commentsPerPage] = useState(3);

  // Comment states
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post?.title || '');
  const [editedContent, setEditedContent] = useState(post?.content || '');


  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  // const [setReplyingTo] = useState(null);
  const [activeReplyBox, setActiveReplyBox] = useState(null);
  const [replies, setReplies] = useState({});


  const [editingReplyContent, setEditingReplyContent] = useState("");

  

  //댓글
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/posts/${postId}/comments`);
      setPost((prevPost) => ({ ...prevPost, comments: data }));
      // 각 댓글에 대한 답글 불러오기
      data.forEach((comment) => {
        fetchReplies(comment.id);
      });
    } catch (error) {
      alert('댓글을 불러오는 중 오류가 발생했습니다.');
    }
  };


  // 게시글 상세 정보 불러오기
  const fetchPostDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:8080/api/posts/${postId}`);
      if (!data.comments) data.comments = []; // comments 필드가 없으면 빈 배열로 초기화
      setPost(data);
      setEditedTitle(data.title);
      setEditedContent(data.content);
      setLoading(false);
      fetchComments(); // 게시글 정보를 받은 후 댓글을 불러옴
      return (true);
    } catch (error) {
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);







  // 게시글 삭제 처리
  const handleDeletePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch({ type: 'DELETE_POST', payload: postId });
        alert('게시물 삭제가 완료되었습니다');
        navigate('/noticeboard');
      }
    } catch (error) {
      alert('게시글 삭제 중 에러 발생:', error);
    }
  };

  const handleEditPost = () => {
    setEditMode(true);
  };

  // 게시글 수정 처리
  const handleSaveEdit = async () => {
    const token = localStorage.getItem('token'); // 사용자 토큰을 로컬 스토리지에서 가져옵니다.
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/posts/${postId}`,
        { title: editedTitle, content: editedContent },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedPost = { ...post, title: editedTitle, content: editedContent };
        dispatch({ type: 'EDIT_POST', payload: updatedPost });
        setPost(updatedPost);
        setEditMode(false);
        alert('게시글이 수정되었습니다.');
      }
    } catch (error) {
      if (error.response) {
        // 서버로부터 받은 에러 응답에 따라 적절한 메시지를 표시합니다.
        switch (error.response.status) {
          case 401:
            alert('로그인이 필요합니다.');
            break;
          case 403:
            alert('수정 권한이 없습니다.');
            break;
          case 404:
            alert('게시글을 찾을 수 없습니다.');
            break;
          default:
            alert('게시글 수정 중 문제가 발생했습니다.');
        }
      } else {
        // 에러 응답이 없는 경우 일반 에러 메시지를 표시합니다.
        alert('게시글 수정 중 에러가 발생했습니다.');
      }
    }
  };

  // 수정 취소 처리
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };



  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/posts/${postId}/comments`,
        { content: comment },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        fetchPostDetail(); // 상태 업데이트 대신 fetchPostDetail 함수를 호출하여 최신 댓글 목록을 가져옵니다.
        alert('댓글 작성이 완료되었습니다');
        setComment('');
      }
    } catch (error) {
      alert('댓글 작성 중 에러가 발생했습니다:', error);
    }


    fetchPostDetail().then(() => {
      // 새로운 댓글을 포함하여 모든 댓글을 다시 불러온 후
      // 마지막 페이지로 이동
      const newTotalComments = post.comments.length + 1; // 가정: fetchPostDetail이 post 상태를 업데이트
      const newTotalPages = Math.ceil(newTotalComments / commentsPerPage);
      setCurrentPage(newTotalPages);
    });
  };


  // 댓글 수정
  const handleSaveEditComment = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/posts/${postId}/comments/${commentId}`,
        { content: editingCommentContent },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const updatedComment = response.data; // 수정된 댓글 정보를 받아옴

      // 수정된 댓글로 상태를 업데이트합니다.
      const updatedPost = {
        ...post,
        comments: post.comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              content: updatedComment.content
            };
          }
          return comment;
        })
      };

      // post 상태를 업데이트합니다.
      setPost(updatedPost);

      dispatch({
        type: 'EDIT_COMMENT',
        payload: {
          postId: post.id,
          commentId: commentId,
          updatedComment: updatedComment // 수정된 댓글 정보 전달
        }
      });

      // 수정 모드 종료 및 초기화
      setEditingCommentId(null);
      setEditingCommentContent("");
      alert('댓글이 수정되었습니다.');
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            alert('로그인이 필요합니다.');
            break;
          case 403:
            alert('수정 권한이 없습니다.');
            break;
          case 404:
            alert('댓글을 찾을 수 없습니다.');
            break;
          default:
            alert('댓글 수정 중 문제가 발생했습니다.');
        }
      } else {
        alert('댓글 수정 중 에러가 발생했습니다.');
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 댓글이 성공적으로 삭제되었으므로 상태 업데이트
      const updatedComments = post.comments.filter((comment) => comment.id !== commentId);
      setPost({ ...post, comments: updatedComments });
      dispatch({ type: 'DELETE_COMMENT', payload: { postId: post.id, commentId } });

      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      if (error.response) {
        // 서버로부터 받은 에러 응답에 따라 적절한 메시지를 표시합니다.
        switch (error.response.status) {
          case 401:
            alert('로그인이 필요합니다.');
            break;
          case 403:
            alert('삭제 권한이 없습니다.');
            break;
          case 404:
            alert('댓글을 찾을 수 없습니다.');
            break;
          default:
            alert('댓글 삭제 중 문제가 발생했습니다.');
        }
      } else {
        // 에러 응답이 없는 경우 일반 에러 메시지를 표시합니다.
        alert('댓글 삭제 중 에러가 발생했습니다.');
      }
    }
  };
  // const handleReplyClick = (commentId) => {
  //   setReplyingTo(commentId); // 답글 작성 UI를 해당 댓글에 대해 활성화
  // };


  // 답글 작성하기 POST
  const handleAddReply = async (commentId, replyContent) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/posts/${postId}/comments/${commentId}/replies`,
        { content: replyContent },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      fetchComments(); // 댓글 및 답글 새로고침
      setActiveReplyBox(null); // 답글 작성 상자 숨기기
      fetchReplies(commentId);
      alert('답글 등록이 완료되었습니다')
    } catch (error) {
      alert('답글 작성 중 에러가 발생했습니다:', error);
    }
  };

  // 답글 작성 폼 컴포넌트
  const ReplyForm = ({ onSubmit, onCancel }) => {
    const [reply, setReply] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!reply.trim()) {
        alert('답글 내용을 입력해주세요.');
        return;
      }
      onSubmit(reply);
      setReply('');
    };

    // // 취소 버튼 핸들러
    // const handleCancel = (e) => {
    //   e.preventDefault();
    //   onCancel(); // 취소 동작 처리
    //   setReply(''); // 입력 필드 초기화
    // };

    return (
      <form onSubmit={handleSubmit}>
        <textarea
          value={reply} 
          onChange={(e) => setReply(e.target.value)}
          placeholder="답글을 입력하세요"
        />
        <button type="submit">완료</button>
        <button type="button" onClick={onCancel}>등록 취소</button>
      </form>
    );
  };

  //답글 불러오는 함수 GET
  const fetchReplies = async (commentId) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/posts/${postId}/comments/${commentId}/replies`);
      setReplies(prevReplies => ({
        ...prevReplies,
        [commentId]: data // commentId를 key로 하여 답글 배열을 저장
      }));
    } catch (error) {
      console.error('답글을 불러오는 중 오류가 발생했습니다.', error);
    }
  };

  // 상태 관리를 위한 state 추가
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [setEditedReplyContent] = useState("");

  // // 답글 수정 버튼 클릭 시
  // const handleEditReply = (replyId, replyContent) => {
  //   // 수정할 답글의 ID와 내용을 state에 설정합니다.
  //   setEditingReplyId(replyId);
  //   setEditedReplyContent(replyContent);
  // };

  // 답글 저장 버튼 클릭 시
  const handleSaveEditReply = async (commentId, replyId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/posts/${postId}/comments/${commentId}/replies/${replyId}`,
        { content: editingReplyContent },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setEditingReplyId(null);
      setEditedReplyContent("");

      // 답글 목록을 다시 불러옵니다.
      fetchReplies(commentId);
      alert('답글이 수정되었습니다.');
    } catch (error) {
      alert('답글 수정 중 오류가 발생했습니다.', error);
    }
  };





  const handleDeleteReply = async (commentId, replyId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/posts/${postId}/comments/${commentId}/replies/${replyId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const updatedReplies = { ...replies };
      updatedReplies[commentId] = updatedReplies[commentId].filter(reply => reply.id !== replyId);
      setReplies(updatedReplies);
      alert('답글이 삭제되었습니다.');
    } catch (error) {
      alert('답글 삭제 중 오류가 발생했습니다.', error);
      // 에러 처리 로직을 여기에 작성합니다.
    }
  };

  // Pagination logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = post && post.comments
    ? post.comments.slice(indexOfFirstComment, indexOfLastComment)
    : [];
  // // 여기서도 마찬가지로 post.comments의 존재를 안전하게 확인합니다.
  // const totalComments = post && post.comments ? post.comments.length : 0;



  return (
    <div>
      <Header />
      <div className="post-detail-container">
        {/* post 객체가 존재할 때만 내용을 렌더링 */}
        {post ? (
          <>
            {editMode ? (
              // 수정 모드일 때 입력 필드와 텍스트 에리어를 보여줍니다.
              <>
                <input
                  type="text"
                  className="edit-title-input"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <div>
                  <textarea
                    className="edit-content-textarea"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                </div>
                <div className="post-detail-actions">
                  <button className="save-edit-button" onClick={handleSaveEdit}>Save</button>
                  <button className="cancel-edit-button" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              // 수정 모드가 아닐 때는 게시글의 제목과 내용을 보여줍니다.
              <>
                <h1 className="post-title">{post.title}</h1><div className="post-content-username">작성자 : {post.username}</div>
                <p className="post-content">{post.content}</p>

                <div className="post-detail-actions">
                  <button className="edit-button" onClick={handleEditPost}>Edit</button>
                  <button className="delete-button" onClick={handleDeletePost}>Delete</button>
                </div>
              </>
            )}
          </>
        ) : (
          // post 객체가 존재하지 않을 때 표시될 메시지
          <p>post 객체가 존재하지않음</p>
        )}

        {/* 댓글 섹션은 post 객체가 존재할 때만 렌더링 */}
        {post && (
          <div className="comment-section">
            <h2 className="comment-heading">댓글</h2>
            <textarea
              className="comment-input"
              value={comment}
              onChange={handleCommentChange}
              placeholder="댓글을 입력하세요..."
            />
            <button className="add-comment-button" onClick={handleAddComment}>댓글 추가</button>
            <div className="comment-list">
              {currentComments.map((comment) => (
                <div key={comment.id} className="comment">
                  {/* 각 댓글에 대한 답글 쓰기 버튼 */}
                  {/* '답글쓰기' 버튼과 답글 작성 폼 */}

                  {activeReplyBox === comment.id && (
                    <ReplyForm
                      onSubmit={(replyContent) => handleAddReply(comment.id, replyContent)}
                      onCancel={() => setActiveReplyBox(null)} // 여기서 onCancel prop을 제공합니다.
                    />
                  )}
                  {editingCommentId === comment.id ? (
                    <input
                      type="text"
                      value={editingCommentContent}
                      onChange={(e) => setEditingCommentContent(e.target.value)}
                    />
                  ) : (
                    <p className="comment-content">{comment.content} <span className="comment-content-username">( {comment.username} ) </span></p>



                  )}
                  {/* 각 댓글에 대한 답글 쓰기 버튼 */}
                  <button className="reply-button" onClick={() => setActiveReplyBox(comment.id)}>답글</button>
                  <div className="replies">
                    {replies[comment.id] && replies[comment.id].map(reply => (
                      <div key={reply.id} className="reply">

                        {editingReplyId === reply.id ? (
                          <>
                            <textarea
                              value={editingReplyContent}
                              onChange={(e) => setEditingReplyContent(e.target.value)}
                            />
                            <button onClick={() => handleSaveEditReply(comment.id, reply.id)}>저장</button>
                            <button onClick={() => setEditingReplyId(null)}>취소</button>
                          </>
                        ) : (
                          <>
                            <p className='relies-content'>{reply.content}<span className="replies-username">( {reply.username} )</span></p>

                            {/* 수정 및 삭제 버튼은 답글이 수정 모드가 아닐 때만 표시 */}
                            {editingReplyId !== reply.id && (
                              <div className="reply-actions">
                                <button className="reply-edit-button" onClick={() => { setEditingReplyId(reply.id); setEditingReplyContent(reply.content); }}>수정</button>
                                <button className="reply-delete-button" onClick={() => handleDeleteReply(comment.id, reply.id)}>삭제</button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>



                  <div className="comment-actions">
                    <div className="comment-button-group">
                      {editingCommentId === comment.id ? (
                        <>
                          <button onClick={() => handleSaveEditComment(comment.id)}>Save</button>
                          <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditingCommentId(comment.id); setEditingCommentContent(comment.content); }}>Edit</button>
                          <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                        </>
                      )}
                    </div>
                  </div>


                </div>

              ))}

            </div>
           
          </div>
        )}
      </div>
    </div>
  );

};

export default PostDetail;
