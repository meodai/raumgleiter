console.clear();

const $video = document.querySelector(".header-video source");

const videoSrc = $video.getAttribute('src');
const videoElements = 3;

let videoElementsArr = new Array(videoElements).fill('');

const $header = document.querySelector('.video-header');

videoElementsArr = videoElementsArr.map(() => {
  const $video = document.createElement("video");
  $video.setAttribute("src", videoSrc);
  const $wrap = document.createElement("div");
  $wrap.classList.add("video-header--slice");
  $wrap.appendChild($video);
  $header.appendChild($wrap);
  return $video;
});

document.addEventListener('click', () => {
  $header.classList.toggle("is-open");
  videoElementsArr.forEach(element => {
    element.play();
  });
})
