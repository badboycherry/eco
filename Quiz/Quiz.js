import React, { useEffect, useState } from 'react';
import '../Quiz/Quiz.css';
import o from '../img/o.png';
import x from '../img/x.png';
import Header from '../main/Header';
import '../main/Main.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [answerSelected, setAnswerSelected] = useState(false); // 답변이 선택되었는지 추적하는 상태

    // 백엔드에서 랜덤 퀴즈 데이터를 가져오는 함수
    useEffect(() => {
        // 인증 토큰을 로컬 스토리지에서 가져옴
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:8080/quizzes/random', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // 토큰을 헤더에 포함하여 보냄
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // 데이터 구조 확인
                    setQuestions(data); // 백엔드에서 받아온 퀴즈 데이터를 상태에 저장
                })
                .catch(error => console.error("Fetching quizzes failed", error));
        } else {
            console.error("Token not found"); // 토큰이 없을 경우 에러 처리
        }
    }, []);



    // 사용자가 O/X 선택 시 처리하는 함수
    const handleAnswer = (answer) => {
        setAnswerSelected(true);
        const isCorrect = questions[currentQuestionIndex].answer === answer;
        if (isCorrect) {
            setScore(score + 1); // 정답일 경우 점수 증가
            setMessage('정답입니다!');
        } else {
            setMessage('오답입니다!');
            setShowExplanation(true); // 오답일 경우 해설 보이도록 설정
        }
    };


    // 다음 질문을 보여주는 함수
    const handleNextQuestion = () => {
        if (!answerSelected) {
            alert("답을 클릭해주세요!");
            return;
        }
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setMessage('');
            setShowExplanation(false);
            setAnswerSelected(false);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:8080/quizzes/attempt', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ score: score })
            })
                .then(response => {
                    if (response.ok) {
                        setQuizFinished(true);
                        setMessage(`퀴즈가 끝났습니다! 당신의 점수는 ${score} / ${questions.length} 입니다.`);
                        // 퀴즈 제출 성공 후에 /api/quizzes/complete 엔드포인트로 요청을 보냄
                        fetch(`http://localhost:8080/api/quizzes/complete`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    console.log("Quiz completion recorded successfully");
                                } else {
                                    throw new Error('퀴즈 완료 기록 실패');
                                }
                            })
                            .catch(error => {
                                console.error("Quiz completion recording failed", error);
                            });
                    } else if (response.status === 400) {
                        setQuizFinished(true);
                        // 여기서 사용자에게 점수도 함께 알려줍니다.
                        setMessage(`당신의 점수는 ${score} / ${questions.length} 입니다. 오늘은 이미 참여하여 마이페이지 반영에 실패하였습니다. `);
                    } else {
                        throw new Error('퀴즈 제출에 실패하였습니다');
                    }
                })
                .catch(error => {
                    console.error("Quiz result submission failed", error);
                });
        } else {
            console.error("Token not found");
        }
    };
    


    return (
        <body>
            <Header />
            <div className='quiz'>
                <h1 className='quizh1'>탄소중립 퀴즈를 풀어보세요!</h1>
                {quizFinished ? (
                    <div>
                        <p>{message}</p>
                    </div>
                ) : (
                    questions.length > 0 && currentQuestionIndex < questions.length ? (
                        <div className='quiz_box'>
                            <p>Q : {questions[currentQuestionIndex].question}</p>
                            <div className="next-button-container">
                                <button onClick={handleNextQuestion}>Next</button>
                            </div>
                            <div className='quizimg'>
                                <img src={o} alt="O" onClick={() => handleAnswer('O')} />
                                <img src={x} alt="X" onClick={() => handleAnswer('X')} />
                            </div>
                            <div className='quiz_bottom'>
                            <p> {message}</p>
                            {showExplanation && <p>{questions[currentQuestionIndex].explanation}</p>}
                            </div>
                           
                        </div>
                    ) : (
                        <p>퀴즈를 불러오는 중...</p>
                    )
                )}
            </div>
        </body>
    );

};

export default Quiz;
