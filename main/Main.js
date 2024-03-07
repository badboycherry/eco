import React, { useRef } from 'react';

import './Header.css'; // 헤더 스타일을 위한 CSS 파일

import './Main.css';
import Header from './Header';



// 슬라이더
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//로고
import EarthImage from '../img/지구1.png'

//뉴스
import Figure1 from '../img/Figure1.jpg';
import Figure2 from '../img/Figure2.png';
import Figure3 from '../img/Figure3.jpg';
import Figure4 from '../img/Figure4.jpg';
import Figure5 from '../img/Figure5.jpg';
import Figure6 from '../img/Figure6.jpg';

//실천
import photobox1 from '../img/photobox1.jpg';
import photobox2 from '../img/photobox2.jpg';
import photobox3 from '../img/photobox3.jpg';
import photobox4 from '../img/photobox4.jpg';
import photobox5 from '../img/photobox5.jpg';
import photobox6 from '../img/photobox6.jpg';
import photobox7 from '../img/photobox7.jpg';
import photobox8 from '../img/photobox8.jpg';

// 아이콘
import con1 from '../img/3dicons.png';
import con2 from '../img/3dicons (1).png';
import con3 from '../img/3dicons (2).png';
import team from '../img/team.png';

const Main = () => {


  const sliderRef = useRef();


  const news = {
    dots: true, // 좌우 arrow 네비게이션 안보이게 하기 (보이고 싶을 때는 true로 변경)
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5, // 동시에 보이는 슬라이드 수
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: false,
    centerMode: true,
  };

  const settings = {
    dots: false, // 좌우 arrow 네비게이션 안보이게 하기 (보이고 싶을 때는 true로 변경)
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: false,
  };

  // 슬라이더 이전 슬라이드로 이동하는 함수
  const goToPrevious = () => {
    sliderRef.current.slickPrev();
  };

  // 슬라이더 다음 슬라이드로 이동하는 함수
  const goToNext = () => {
    sliderRef.current.slickNext();
  };


  return (
    <div>

      <Header /> {/* Header 컴포넌트를 렌더링 */}
      <section>
        <div className='mainbody' >
          <div className="content-container">
            <div className='circle'></div>
            <div className='circle2'></div>
            <dix className='box'>
              <div className="text-container">

                <h1 className='maintext'>누구나 실천 가능한 지구 지키기</h1>
                <a href="링크_주소_또는_다운로드_경로" download>
                  <button className='download'>안드로이드 앱 다운로드</button>
                </a>
              </div>
              <div className="image-container">
                <img src={EarthImage} alt="지구" />
              </div>
            </dix>
          </div>
        </div>
      </section>

      <section className='grenner'>
        <div className='grenner_title'>
          <h1>Greener란?</h1>
        </div>
        <div className='grenner_con'>
          <div className='grenner_box'>
            <div className='grenner_box1'>
              <div className='box_img'>
                <img src={con1} alt='grenner_box_img' />
              </div>
              <div className='box_text'>
                <p>Daily Mission</p>
                <p>매일 업데이트되는 미션을 실천해가며
                  탄소 중립 실천</p>
              </div>
            </div>
            <div className='grenner_box2'>
              <div className='box_img'>
                <img src={con2} alt='grenner_box_img' />
              </div>
              <div className='box_text'>
                <p>ECO-인증</p>
                <p>최신 AI 기술과 함께
                  생활 속 제품을 친환경으로 대체하기</p>
              </div>
            </div>
            <div className='grenner_box3'>
              <div className='box_img'>
                <img src={con3} alt='grenner_box_img' />
              </div>
              <div className='box_text'>
                <p>Quiz</p>
                <p>기후 변화와 탄소 중립에 대해
                  하루 한 번 퀴즈를 풀고 지식 쌓기!</p>
              </div>
            </div>
          </div>
          <div className='history_con'>
            <img src={team} alt='grenner_box_img' />
            <div>
              <p>
                저희 Greener는 지구를 위한 녹색 소비를 촉진하고자,
                환경 친화적인 선택을 소비자들에게 제공하여 지속 가능한 소비 문화를 조성하고, <br></br>
                이를 통해 지구를 보호하고 미래 세대를 위한 지속 가능한 환경을 구축하는 데 기여하고자 합니다.
              </p>
              <p>
                Greener의 목표는 친환경 제품을 찾고 선택하는 것을 더욱 간편하게 만드는 것입니다. <br></br>
                Greener의 녹색제품 추천 시스템은 소비자들이 환경에 친화적인 제품을 쉽게 식별하고 구매할 수 있도록 돕습니다.
              </p>
              <p>
                Greener는 함께 지속 가능한 미래를 만들기 위해 노력할 것입니다. <br></br>
                지구를 위한 녹색 소비 문화를 선도하여 모두가 함께 지구를 보호하고 지속 가능한 발전에 기여할 수 있도록 돕겠습니다
              </p>
            </div>

          </div>

        </div>
      </section>
      <section className="main-content">
        <div className="content-container2">
          <div className="left-content">
            <h1>생활 속에서 탄소 중립을 <br /> 실천해보세요!</h1>
            <button className="arrow-button prev" onClick={goToPrevious} aria-label="Previous">
              {/* 이전 화살표 아이콘 */}
            </button>
            <button className="arrow-button next" onClick={goToNext} aria-label="Next">
              {/* 다음 화살표 아이콘 */}
            </button>
          </div>

          <div className="right-content">
            <div className='ecoaction'>
              <Slider ref={sliderRef} {...settings}>
                <div className='ecoBox'>
                  <div className='ecoText'><p>여름엔 26℃이상, 겨울엔 20℃ 이하로 유지하기.</p></div>
                  <div className='photoBox'>
                    <img src={photobox1} alt='photobox1' />
                  </div>
                </div>
                <div className='ecoBox'>
                  <div className='ecoText'><p>절전형 전등으로 교체하기.</p></div>
                  <div className='photoBox'>
                    <img src={photobox2} alt='photobox2' />
                  </div>
                </div>
                <div className='ecoBox'>
                  <div className='ecoText'><p>가전제품 플러그를 뽑아두기.</p></div>
                  <div className='photoBox'>
                    <img src={photobox3} alt='photobox3' />
                  </div>
                </div>
                <div className='ecoBox'>
                  <div className='ecoText'><p>걷기-자전거타기-대중교통 <br></br>이용을 생활화하기.</p></div>
                  <div className='photoBox'>
                    <img src={photobox4} alt='photobox4' />
                  </div>
                </div>
                <div className='ecoBox'>
                  <div className='ecoText'> <p>장바구니를 이용하기 </p></div>
                  <div className='photoBox'>
                    <img src={photobox5} alt='photobox5' />
                  </div>
                </div>
                <div className='ecoBox'>
                  <div className='ecoText'><p>친환경 상품을 구매하기</p></div>
                  <div className='photoBox'>
                    <img src={photobox6} alt='photobox6' />
                  </div>
                </div>
                <div className='ecoBox'>
                  <div className='ecoText'><p>샤워시간은 줄이고, 빨래는 모아서 하기</p></div>
                  <div className='photoBox'>
                    <img src={photobox7} alt='photobox7' />
                  </div>
                </div>
                <div className='ecoBox'>
                  <div className='ecoText'><p>적다고 느낄 만큼만 조리하기.</p> </div>
                  <div className='photoBox'>
                    <img src={photobox8} alt='photobox8' />
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>

      </section>



      <section className='MainNews'>
        <div className='MainNews_box'>
          <div className='Maintitle'>
            <h2>탄소 중립 NEWS</h2>
          </div>
          <Slider {...news} className="news_slider">
            <div className='FigureBox'>
              <figure>
                <a href='https://view.asiae.co.kr/article/2024020409173840211' target="_blank" rel="noreferrer">
                  <img
                    src={Figure1} alt='Figure_img' />
                </a>
                <figcaption>이대로면 서울서 사망자 82% 증가…"2040년은 위험, 2080년은 상상 초월</figcaption>
              </figure>
            </div>
            <div className='FigureBox'>
              <figure>
                <a href='http://www.idaegu.com/newsView/idg202402040123' target="_blank" rel="noreferrer">
                  <img
                    src={Figure2} alt='Figure_img' />
                </a>
                <figcaption>권장이 아닌 필수, 탄소중립</figcaption>
              </figure>
            </div>
            <div className='FigureBox'>
              <figure>
                <a href='https://www.segye.com/newsView/20240131512444?OutUrl=naver' target="_blank" rel="noreferrer">
                  <img
                    src={Figure3} alt='Figure_img'
                  />
                </a>
                <figcaption>풀무원 “2050년까지 탄소중립 달성”</figcaption>
              </figure>
            </div>
            <div className='FigureBox'>
              <figure>
                <a href='https://www.mk.co.kr/news/business/10928445' target="_blank" rel="noreferrer">
                  <img
                    src={Figure4} alt='Figure_img'
                  />
                </a>
                <figcaption>종이 하나 바꿨을 뿐인데 … 탄소 8t 감축</figcaption>
              </figure>
            </div>
            <div className='FigureBox'>
              <figure>
                <a href='https://www.newsis.com/view/?id=NISX20240115_0002592081&cID=10807&pID=10800' target="_blank" rel="noreferrer">
                  <img src={Figure5} alt='Figure_img' />
                </a>
                <figcaption>특허청, 국민 아이디어 활용 '저탄소·친환경 제품' 생산</figcaption>
              </figure>
            </div>
            <div className='FigureBox'>
              <figure>
                <a href='https://www.sportsseoul.com/news/read/1395950?ref=naver' target='_blank' rel="noreferrer">
                  <img src={Figure6} alt='Figure_img' />
                </a>
                <figcaption>순천시, 2040 탄소중립(Net-Zero) 정책 본격 시동</figcaption>
              </figure>
            </div>
          </Slider>
        </div>

      </section>
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
    </div>
  );
};

export default Main;