// App.js
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Mission from './Mission/Mission';
import Product from './Product/Product';
import Quiz from './Quiz/Quiz';
import Replacement from './Replacement/Replacement';
import NetZero from './carbonExplan/NetZero';
import EcoFriendly from './ecofriendly/EcoFriendly';
import { AuthProvider, useAuth } from './login/AuthContext';
import Login from './login/Login';
import Main from './main/Main';
import MyPage from './mypage/MyPage';
import Update from './mypage/Update';
import NoticeBoard from './noticeboard/NoticeBoard';
import PostDetail from './noticeboard/PostDetail';
import { PostsProvider } from './noticeboard/PostsContext'; // Import PostsProvider
import WriteBoard from './noticeboard/WriteBoard';
import Join from './register/Join';
import Eco from './ECOproduct/ECOproduct';
import EasyLogin from './login/Easy_login';

const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    // 로그인 페이지로 리다이렉트하면서 쿼리 파라미터 추가
    return <Navigate to="/login?loginRequired=true" replace />;
  }

  return children;
};



function App() {
  return (
    <AuthProvider>
      <PostsProvider> {/* Wrap the entire application with PostsProvider */}
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/EasyLogin" element={<EasyLogin />} />
              <Route path="/netzero" element={<NetZero />} />
              <Route path="/ecofriendly" element={<EcoFriendly />} />
              <Route path="/Eco" element={<Eco />} />
              <Route path="/Join" element={<Join />} />
              <Route path="/Mission" element={<ProtectedRoute><Mission /></ProtectedRoute>} />
              <Route path="/Quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
              <Route path="/Replacement" element={<ProtectedRoute><Replacement /></ProtectedRoute>} />
              <Route path="/Product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
              <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
              <Route path="/update" element={<ProtectedRoute><Update /></ProtectedRoute>} />
              <Route path="/noticeboard" element={<ProtectedRoute><NoticeBoard /></ProtectedRoute>} />
              <Route path="/noticeboard/:postId" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
              <Route path="/writeboard" element={<ProtectedRoute><WriteBoard /></ProtectedRoute>} />
            </Routes>
          </Router>
        </div>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;
