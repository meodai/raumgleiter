console.clear();

import * as PIXI from 'pixi.js';

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

const videoPartContainers = [
  new PIXI.Container(),
  new PIXI.Container(),
  new PIXI.Container()
];

const videoSprites = [];

const partSize = 1 / videoPartContainers.length;

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

  container.position.x = partSize * app.screen.width * i;
  videoSprite.position.x = partSize * app.screen.width * -i;

  videoSprite.setTransform(
    -200 * i
  );

  container.addChild(videoSprite);
  container.mask = rect;

  app.stage.addChild(container);
});


ticker.start();



setTimeout(() => {
  ticker.add((time) => {
    videoSprites.forEach((videoSprite, i) => {
      videoSprite.setTransform(
        Math.min(
          0,
          videoSprite.transform.position.x + 10
        )
      );
    });
  });
}, 1000);
