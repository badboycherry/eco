import React from 'react';
import YouTube from 'react-youtube';

function YouTubeVideo() {
  const opts = {
    height: '500',
    width: '740',
    playerVars: {
      autoplay: 1, // 자동 재생 활성화
      controls: 0, // 컨트롤 숨김
      rel: 0, // 재생이 끝난 후 나타나는 관련 동영상 숨김
      modestbranding: 1, // YouTube 로고 최소화
      loop: 1, // 영상 반복 재생
      playlist: 'OzwSDV8hNH8' // 반복 재생을 위해 동일한 비디오 ID 지정
    },
  };

  return <YouTube videoId="OzwSDV8hNH8" opts={opts} />;
}


export default YouTubeVideo;
