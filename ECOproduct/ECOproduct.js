import React from 'react';
import './ECOproduct.css'
import Ecoproduct from '../img/ecofr.jpg';
import Header from '../main/Header';
import Air from '../img/Air.png';
import YouTubeVideo2 from './YouTubeVideo2';



const EcoproductPage = () => {
  const projectInfo = {
    green: [
      "green.png",
      "green1.png",
      "green2.png",
      "green3.png",
      "green4.png",
      "green5.jpg"
    ],
  };

  return (
    <body>
      <Header /> {/* Header 컴포넌트를 렌더링 */}
      <div className='netzero_title'>
        <div className='title_box'>
          <h1>친환경제품이란 무엇일까요?</h1>
          <div className='subtitle'>
            <p>탄소중립의 생활화를 위한 녹색제품 추천 시스템 </p>
            <p><span>Stepper</span> : 탄소 중립에 한 걸음 </p>
          </div>
        </div>

        <div className='netzero_title_img'>
          <img src={Air} alt='netzero_title_img'/> 
        </div>
      </div>

      <div className='Ecoproduct'>
        <div className='netzero_con'>
          <div className='netzero_box'>
            <img className='netzeroimg' src={Ecoproduct} alt='netzero_img' />
          </div>
          <div className='netzero_box'>
            <YouTubeVideo2 />
            <h2 className='netzeroh2'> 출처:
              조달청</h2>
          </div>
        </div>
        <div className='greengas'>
          <h1>친환경제품이란?</h1>
        </div>
        <div className='eco_explan'>
          <p>친환경 제품은 소비자가 사용과 폐기과정에서 자원과 에너지를 저감하며, 환경부 기준을 충족하는 지속 가능한 제품을 의미합니다.</p>
          <p>최근에는 기후 변화 우려가 높아지면서 친환경 제품에 대한 수요가 증가하고 있습니다.</p>
        </div>
        <div className='greengas'>
          <h1>환경성적표지제도란?</h1>
        </div>
        <div className='eco_explan'>
          <p>환경성적표지 제도는 제품 및 서비스의 환경성 제고를 위해 제품 및 서비스의 원료채취, 생산, 수송 유통, 사용, 폐기 등</p>
          <p>전과정에 대한 환경성 정보를 계량적으로 표시하는 제도입니다.</p>
        </div>
      </div>
      <div className='greenimg'>
        <table className='greenmark'>
          <tr>
            <td>
              <img src={require(`/src/img/${projectInfo.green[0]}`)} alt='mark' />
            </td>
            <td>
              <p className='greenimgtext'>환경표지(친환경마크)</p>
              <p className='image-text'>대표적인 친환경 인증입니다. 동일 제품 중에서 환경적으로 좀 더 나은 제품이 환경표지의 대상이 됩니다. 탄소발자국인증마크 생산부터 폐기까지의 과정에서 발생하는 온실가스의 배출량을 표시한 마크입니다.</p>
            </td>
            <td>
              <img src={require(`/src/img/${projectInfo.green[2]}`)} alt='mark'/>
            </td>
            <td>
              <p className='greenimgtext'>탄소 발자국 인증 마크</p>
              <p className='image-text'>생산부터 폐기까지의 과정에서 발생하는 온실가스의 배출량을 표시한 마크입니다.</p>
            </td>
          </tr>
          <tr>
            <td>
              <img src={require(`/src/img/${projectInfo.green[1]}`)} alt='mark'/>
            </td>
            <td>
              <p className='greenimgtext'>저탄소제품</p>
              <p className='image-text'>저탄소제품기준 고시에 적합한 제품을 의미합니다. 저탄소제품 신청일의 이전 분기부터 과거 6년 이내 동종제품의 환경성적표지 탄소배출량의 평균값 이하인 경우이거나 직전 동일한 환경성적표지 인증제품의 탄소배출량 대비 탄소배출량 감축량이 최소탄소감축률(3.3%) 이상인 제품입니다. 쉽게 이야기하면 평소보다 탄소를 덜 배출한 제품이거나 점점 탄소를 줄이고 있는 제품들입니다.</p>
            </td>

            <td>
              <img src={require(`/src/img/${projectInfo.green[3]}`)} alt='mark'/>
            </td>
            <td>
              <p className='greenimgtext'>환경 성적 표지</p>
              <p className='image-text'>제품이나 서비스의 환경성을 눈으로 볼 수 있도록 계량적으로 표시해 놓는 마크입니다.</p>
            </td>

          </tr>
          <tr>
            <td>
              <img src={require(`/src/img/${projectInfo.green[4]}`)} alt='mark' />
            </td>
            <td>
              <p className='greenimgtext'>녹색 인증</p>
              <p className='image-text'>녹색인증은 저탄소 녹색성장 기본법에 의거하여 유망한 녹색기술 또는 사업을 인증하고 지원하는 제도로 녹색기술 인증, 녹색기술제품 확인 등에 대한 인증을 부여합니다.</p>
            </td>

            <td>
              <img src={require(`/src/img/${projectInfo.green[5]}`)} alt='mark'/>
            </td>
            <td>
              <p className='greenimgtext'>GR 마크</p>
              <p className='image-text'>GR(Good Recycled Product)인증은 자원재활용 녹색기술개발을 통해 품질이 우수한 재활용제품을 정부가 인증함으로써, 그동안 소비자가 외면해오던 재활용제품의 품질을 향상시켜 소비자의 불신을 해소하고 그 수요를 확대하기 위한 제도로서 자원 순환과 에너지 절감을 도모하고 저탄소 녹색성장에 일조하는 정부 직접인증제도입니다.</p>
            </td>

          </tr>
        </table>
      </div>
      <div className='eco_bar'>
      <div className='greengas'>
          <h1>친환경상품 사용으로 온실가스 15만4000톤 감축</h1>
        </div>
        <p > 
        친환경 제품의 사용으로 인해 지난 해 동안 전기·전자제품 관련 온실가스 배출이 15만4천 톤 감소했으며, <br></br>
        이는 약 2만7천772명의 연간 배출량과 동등합니다. 또한, 친환경 제품 구매로 인한 경제적 이익은<br></br>
        약 540억원이며, 평균 5년의 내구연한을 고려할 때 약 2천450억원에 이릅니다.친환경제품의 확대 사용은 녹색 <br></br>
        성장 정책의 중요한 부분이며, 지속 가능한 환경과 경제적 이익을 실현하는 데 큰 도움이 될 것입니다.</p>

      {/* <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      <p >일반 제품과 친환경 제품간의 온실가스 배출량을 비교하는 그래프입니다.<br></br>
      이 그래프는 친환경 제품의 온실가스 배출량이 일반 제품보다 훨씬 낮다는것을<br></br>
      시각적으로 보여주며, 환경을 고려하여 제품을 선택할때 참고 할 수 있습니다.<br></br>
      (일반제품의 온실가스 배출량이 정확한 수치로 나와있는게 없어 임의로 계산한 수치입니다)</p> */}
      </div>
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
export default EcoproductPage;
