console.clear();

import * as PIXI from 'pixi.js';

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const ticker = PIXI.Ticker.shared;
ticker.autoStart = false;
ticker.stop();

const app = new PIXI.Application({
  transparent: false,
  width: window.innerWidth,
  height: window.innerHeight,
});

document.body.appendChild(app.view);

var video = document.createElement("video");
video.preload = "auto";
video.muted = true;
video.src = "01-digitaleVermarktung-preview-v006-nosound.mp4";
video.loop = true;

// create a video texture from a path
const texture = PIXI.Texture.from(
  video
);

const slide = new PIXI.Container();

const videoPartContainers = [
  new PIXI.Container(),
  new PIXI.Container(),
  new PIXI.Container(),
  new PIXI.Container()
];

const videoSprites = [];

const partSize = 1 / videoPartContainers.length;

app.stage.addChild(slide);

const displacementTexture = PIXI.Texture.from('disp.png');
const displacementSprite = new PIXI.Sprite(displacementTexture);
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite, 20);

//slide.filters = [displacementFilter];

videoPartContainers.forEach((container, i) => {

  const rect = new PIXI.Graphics();

  // create a new Sprite using the video texture (yes it's that easy)
  const videoSprite = new PIXI.Sprite(texture);
  videoSprites.push(videoSprite);

  // Stetch the fullscreen
  videoSprite.width = app.screen.width;
  videoSprite.height = app.screen.height;

  // Rectangle
  rect.beginFill(0xffffff);
  rect.drawRect(
    partSize * app.screen.width * i,
    0,
    partSize * app.screen.width + 1,
    app.screen.height
  );
  rect.endFill();

  container.position.x = app.screen.width * 3;
  videoSprite.position.x = partSize * app.screen.width * -i;

  /*videoSprite.setTransform(
    -200 * i
  );*/

  //container.toLocal(new PIXI.Point(0, 0), videoSprite, videoSprite.position);

  container.addChild(videoSprite);
  container.mask = rect;
  slide.addChild(container);

});



ticker.start();


const acceleration = 0.025;

setTimeout(() => {
  //ticker.add((time) => {
    videoPartContainers.forEach((videoSprite, i) => {
      //videoSprite.position.x -= 5

      /*const goal = partSize * app.screen.width * i;
      const diffx = goal - videoSprite.position.x;

      videoSprite.position.x += diffx * acceleration;*/
      gsap.to(videoSprite.position, 2, { x: partSize * app.screen.width * i });

    });
  //});
}, 1000);

