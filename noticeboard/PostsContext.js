import React, { createContext, useContext, useReducer } from 'react';

// PostsContext.js
const PostsContext = createContext();

const initialState = {
    posts: [],
    postDetail: []
};

const postsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };

        // 전체 게시글
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload
            };

        // 상세 게시글
        case 'SET_POST_DETAIL':
            return {
                ...state,
                postDetail: action.payload, // 직접 상세 정보를 업데이트
            };


        case 'EDIT_POST':
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            title: action.payload.title, // 수정될 수 있는 제목
                            content: action.payload.content // 수정된 내용
                        };
                    }
                    return post;
                })
            };


        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            };

        case 'ADD_COMMENT':
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        return {
                            ...post,
                            comments: [...post.comments, action.payload.comment]
                        };
                    }
                    return post;
                })
            };

        case 'SET_COMMENTS':
            return {
                ...state,
                postDetail: {
                    ...state.postDetail,
                    comments: action.payload
                }
            };



            case 'DELETE_COMMENT':
                return {
                  ...state,
                  posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                      return {
                        ...post,
                        comments: post.comments ? post.comments.filter(comment => comment.id !== action.payload.commentId) : [] // post.comments가 존재하는지 확인
                      };
                    }
                    return post;
                  })
                };
              
        case 'EDIT_COMMENT':
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        return {
                            ...post,
                            comments: post.comments ? post.comments.map(comment => {
                                if (comment.id === action.payload.commentId) {
                                    return {
                                        ...comment,
                                        content: action.payload.editedContent
                                    };
                                }
                                return comment;
                            }) : []
                        };
                    }
                    return post;
                })
            };

            


        default:
            return state;
    }
};

export const PostsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, initialState);

    return (
        <PostsContext.Provider value={{ state, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);
