import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../main/Header';
import '../main/Main.css';
import '../mypage/Update.css';


const Update = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/mypage');
    };

    const [editingValues, setEditingValues] = useState({
        username: '',
        name: '',
        address: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const fetchUserInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/user/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEditingValues(prev => ({
                ...prev,
                username: data.username,
                name: data.name,
                address: data.address,
            }));
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingValues(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        // 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인이 모두 입력되었는지 확인
        if (!editingValues.currentPassword || !editingValues.newPassword || !editingValues.confirmPassword) {
            alert('모두 입력해주세요');
            return;
        }

        // 현재 비밀번호와 새 비밀번호가 일치하는지 확인
        if (editingValues.currentPassword === editingValues.newPassword) {
            alert('현재 비밀번호와 다른 비밀번호를 입력바랍니다');
            return;
        }

        // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
        if (editingValues.newPassword !== editingValues.confirmPassword) {
            alert('새 비밀번호가 일치하지 않습니다');
            return;
        }

        const updateData = {
            username: editingValues.username,
            name: editingValues.name,
            address: editingValues.address,
            currentPassword: editingValues.currentPassword,
            newPassword: editingValues.newPassword,
            confirmPassword: editingValues.confirmPassword,
        };

        try {
            await axios.put(`http://localhost:8080/users/${editingValues.username}`, updateData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('회원 수정이 완료되었습니다');
            navigate('/mypage');
        } catch (error) {
            console.error('Failed to update user information:', error);
            alert('회원 수정에 실패하였습니다');
        }
    };


    return (
        <div>
            <Header />
            <div className="update-container">
                <div className="update-info">
                    <h2>회원 정보 수정</h2>
                    <div className="update-group">
                        <label className="update-label">id</label>
                        <input
                            type="text"
                            name="username"
                            value={editingValues.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            readOnly // 사용자 이름을 변경할 수 없게 만들기 위해 읽기 전용으로 설정
                        />
                        <label className="update-label">name</label>
                        <input
                            type="text"
                            name="name"
                            value={editingValues.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <label className="update-label">address</label>
                        <input
                            type="text"
                            name="address"
                            value={editingValues.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                        />
                        <label className="update-label">password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={editingValues.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Current Password"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={editingValues.newPassword}
                            onChange={handleInputChange}
                            placeholder="New Password"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={editingValues.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm New Password"
                        />

                    </div>
                </div>
                <div className='update-btn'>
                    <button onClick={handleUpdate} className="result-button">수정</button>
                    <button onClick={handleGoBack} className="result-button">
                        마이페이지로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Update;
