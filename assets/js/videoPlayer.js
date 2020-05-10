const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumebutton");
const fullScrnBtn = document.getElementById("jsFullscreen");
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");
const volumeRange = document.getElementById("jsVolume");

const register = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function handleVolumeClick() {
  if (videoPlayer.muted) {
    //음소거가 거짓(아님) = 나옴
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}

function smallScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-book-open"></i>';
  document.webkitExitFullscreen();
  fullScrnBtn.addEventListener("click", fullScreen);
}

function fullScreen() {
  videoContainer.webkitRequestFullscreen();
  fullScrnBtn.innerHTML = '<i class="fas fa-book"></i>';
  fullScrnBtn.removeEventListener("click", fullScreen);
  fullScrnBtn.addEventListener("click", smallScreen);
}

function getCurrentTime() {
  //12.12면 12초에 끊어주는거가 ceil <-> floor
  currentTime.innerHTML = formatDate(Math.ceil(videoPlayer.currentTime));
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  //일정한 시간동안 계속실행시켜주는거
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  //비디오 다 시청되면 0으로 만들어줌
  register();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleEvent(event) {
  //이벤트를 계속 저장하니까 줄였다 켜도 기억하고있음
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

//여기 addeventlistener를 추가하는 이유는 내가 지금 이 페이지를 체크하고 있다는 거임
function init() {
  videoPlayer.range = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", fullScreen);
  //이벤트 발생에 반응했을 때 메시지를 게시합니다.
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleEvent);
}

//비디오 컨데이이너라는 아이디가 존재하는 곳에서만 작동함
if (videoContainer) {
  init();
}
