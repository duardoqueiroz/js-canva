const { createCanvas, loadImage } = require("canvas");
const express = require("express");
const app = express();

const port = 3000;

app.get("/", async (req, res) => {
  const canvasWidth = 892;
  const canvasHeight = 435;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  // Carregando as imagens
  const bgImage = await loadImage("./background.png");
  const purpleLight = await loadImage("./purple_light.png");
  const squareAndCircle = await loadImage("./squares_and_circles.png");
  const greenSquares = await loadImage("./green_squares.png");
  const welcomeImage = await loadImage("./welcome.png");
  const photoImage = await loadImage("./photo.png"); // Carregar imagem do usuário vindo do discord

  // Configurações principais das imagens
  const hRatio = canvasWidth / bgImage.width;
  const vRatio = canvasHeight / bgImage.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvasWidth - bgImage.width * ratio) / 2;
  const centerShift_y = (canvasHeight - bgImage.height * ratio) / 2;

  const scale = Math.min(
    canvasWidth / bgImage.width,
    canvasHeight / bgImage.height
  );

  // Construindo as imagens carregadas
  drawImage(ctx, bgImage, centerShift_x, centerShift_y, ratio);
  drawImage(ctx, purpleLight, centerShift_x, centerShift_y, ratio);
  drawImage(ctx, squareAndCircle, centerShift_x, centerShift_y, ratio);
  drawImage(ctx, greenSquares, centerShift_x, centerShift_y + 15, ratio);

  // Configurando e setando foto do usuário
  const photoWidth = photoImage.width * scale;
  const photoHeight = photoImage.height * scale;
  const photoLeft = canvasWidth / 2 - photoWidth / 2;
  const photoTop = canvasHeight / 2 - photoHeight - 10;
  drawImage(ctx, photoImage, photoLeft, photoTop, ratio);

  // Configurando e setando imagem Welcome
  const welcomeWidth = welcomeImage.width * scale;
  const welcomeHeight = welcomeImage.height * scale;
  const welcomeLeft = canvasWidth / 2 - welcomeWidth / 2;
  const welcomeTop = canvasHeight / 2 - welcomeHeight / 2 + 60;
  drawImage(ctx, welcomeImage, welcomeLeft, welcomeTop, ratio);

  // Configurando e setando nome do usuário
  const usernameField = {
    text: "@Erick Tosta", // Substituir pelo nome vindo do discord
    font: "semi-bold 30px Arial",
    style: "white",
    baseLine: "middle",
  };
  ctx.fillStyle = usernameField.style;
  ctx.textBaseline = usernameField.baseLine;
  ctx.font = usernameField.font;
  const textWidth = ctx.measureText(usernameField.text).width;
  ctx.fillText(
    usernameField.text,
    canvasWidth / 2 - textWidth / 2,
    welcomeTop + 90
  );

  ctx.save();
  canvas.createPNGStream().pipe(res);
});

function drawImage(ctx, image, sourceX, sourceY, ratio) {
  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    sourceX,
    sourceY,
    image.width * ratio,
    image.height * ratio
  );
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
