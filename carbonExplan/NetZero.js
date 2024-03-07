import React from 'react';
import '../main/Main.css';
import '../carbonExplan/NetZero.css';
import netZero from '../img/탄소중립.png'
import greengas from '../img/우리나라 온실가스 배출량 추세.png'
import greengas2 from '../img/국가별 온실가스 배출량 추이.png'
import greengas3 from '../img/우리나라기온변화.png'
import Header from '../main/Header';
import Air from '../img/Air.png';

import YouTubeVideo from './YouTubeVideo';

const NetZero = () => {


    return (
        <body>
            <Header /> {/* Header 컴포넌트를 렌더링 */}
            <div className='netzero_title'>
                <div className='title_box'>
                    <h1>탄소중립이란 무엇일까요?</h1>
                    <div className='subtitle'>
                        <p>탄소중립의 생활화를 위한 녹색제품 추천 시스템 </p>
                        <p><span>Stepper</span> : 탄소 중립에 한 걸음 </p>
                    </div>
                </div>
                <div className='netzero_title_img'>
                    <img src={Air} alt='netzero_title_img' />
                </div>
            </div>
            <div className='netzero_con'>
                <div className='netzero_box'>
                    <img className='netzeroimg' src={netZero} alt="탄소" />
                    <h2 className='netzeroh2'> 출처:기후행동 1.5</h2>
                </div>
                <div className='netzero_box'>
                    <YouTubeVideo />
                    <h2 className='netzeroh2'> 출처:
                        KCEN한국기후환경네트워크</h2>
                </div>
            </div>
            <div className='greengas'>
                <h1>우리나라 온실가스 배출량 추세</h1>

            </div>
            <p className='greengash2'>
                #파란색실선이 추세선<br />
            </p>
            <img className='greengasimg' src={greengas} alt="온실가스추세" />
            <p className='greengash3'>
                1990년대는 경제성장에 따라 온실가스 배출량도 크게 늘었고 1998년 외환위기의 영향으로 온실가스 총배출량이 감소한 이후로<br />
                2000년대는 경기가 회복되면서 온실가스 배출량이 꾸준히 증가<br /><br />

                2020년 코로나19의 영향으로 배출량이 급격하게 감소했으나 다시 증가하는 추세

            </p>
            <div className='greengas'>
                <h1>국가별 온실가스 배출량 추이</h1>
            </div>
            <img className='greengasimg' src={greengas2} alt="국가별추이" />
            <p className='greengash3'>
                한국의 1인당 온실가스배출량은 석탄사용과 자원개발이 많은 호주나 미국보다는 낮은 수준이지만 제조업이 발달한 일본, 독일보다는 높은 수준<br />
            </p>
            <div className='greengas'>
                <h1>우리나라 연평균 기온 변화</h1>
            </div>
            <img className='greengasimg' src={greengas3} alt="연평균기온" />
            <p className='greengash3'>
                연도별로 평균기온의 증감은 있지만, 추세선을 보면 분석기간동안 평균기온은 증가 <br />
                온난화의 원인은 아직까지 명확하게 규명되지 않았으나, 온실효과를 일으키는
                이산화탄소, 메탄, 아산화질소의 인위적 온실가스 배출이 온난화의 주원인일 가능성이 높음
            </p>
            <p className='greengash4'>
                2018년 기준 2030년까지 2018년 대비 45.9%의 온실가스를 감축할 예정
            </p>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Stepper. All rights reserved.</p>
                    <ul className="footer-links">
                        <li>Greener</li>
                        <li>TEAM : Stepper</li>
                        <li>E-mail:c-action@kcen.kr</li>
                    </ul>
                </div>
            </footer>
        </body>


    );

};
export default NetZero;