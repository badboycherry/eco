import React from 'react';

const onNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver"
}

const onGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
}


const getData = () => {
    fetch("http://localhost:8080/my", {
        method: "GET",
        credentials: "include"
    })
        .then((res) => res.json()) // 응답을 JSON으로 파싱
        .then((data) => {
            alert(JSON.stringify(data));
        })
        .catch((error) => alert(error))
}

function EasyuLogin(props) {
    return (
        <>  
             <div style={{ marginTop: '100px' }}>
            <button onClick={onNaverLogin}>naver login</button>
            <button onClick={onGoogleLogin}>Google Login</button>
            <button onClick={getData}>get Data</button>
            </div>
        </>
    );
}

export default EasyuLogin;
