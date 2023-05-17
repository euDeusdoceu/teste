var dinossauro, dinossauroImg;
var chao, chaoImg;
var fakechao;
var nuvem;
var nuvemImg;
var cactos;
var PLAY = 1;
var END = 2;
var gamestate = PLAY;
var cactosG
var ceu
var F
var pontuadcao = 0
function preload() {
  //pré carrega imagens, animações, sons etc
  dinossauroImg = loadAnimation("trex3.png", "trex.png");
  chaoImg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  F = loadImage("trex_collided.png");
}

function setup() {
  //função de configuração
  chao = createSprite(300, 190, 600, 10);
  chao.addImage(chaoImg);
  dinossauro = createSprite(50, 100, 10, 10);
  dinossauro.addAnimation("correndinho", dinossauroImg);
  dinossauro.addImage("F", F)
  dinossauro.scale = 0.5;



  fakechao = createSprite(300, 200, 600, 10);
  fakechao.visible = false;

  //muda o tamanho da tela
  createCanvas(600, 200);
  var teste = Math.round(random(1, 10));
  console.log(teste);
  cactosG = new Group()
  ceu = new Group()
}

function draw() {
  background("white");
  text("pontos:"+pontuadcao,50,50)
  if (gamestate === PLAY) {
    dinossauro.velocityY = dinossauro.velocityY + 1;
    dinossauro.collide(fakechao);
    if (keyDown("space") && dinossauro.isTouching(chao)) {
      dinossauro.velocityY = -10;
    }
    if (chao.x < 0) {
      chao.x = chao.width / 2;
    }
    chao.velocityX = -5;
    geradordenuvem();
    geradordecacto();
    if(dinossauro.isTouching(cactosG)){  
    gamestate = END
    }
   }else if (gamestate === END) {
    cactosG.setLifetimeEach(-1)
  cactosG.setVelocityXEach(0)
  ceu.setLifetimeEach(-1)
  ceu.setVelocityXEach(0) 
  chao.velocityX = 0
  dinossauro.changeImage("F")
  dinossauro.velocityY = 0
  }
  
  
 
  drawSprites();
 
}
function geradordenuvem() {
  if (frameCount % 60 === 0) {
    nuvem = createSprite(620, random(10, 150), 20, 20);
    nuvem.velocityX = -3;
    nuvem.addImage(nuvemImg);
    nuvem.scale = 0.7;
    nuvem.lifetime = 220;
    ceu.add(nuvem)
  }
  
}
function geradordecacto() {
  if (frameCount % 60 === 0) {
    cactos = createSprite(610, 180, 10, 10);
    cactos.velocityX = -3;

    cactos.scale = 0.4;
    cactos.lifetime = 220;

    var numero = Math.round(random(1, 6));
    switch (numero) {
      case 1:
        cactos.addImage(cacto1);
        break;
      case 2:
        cactos.addImage(cacto2);
        break;
      case 3:
        cactos.addImage(cacto3);
        break;

      case 4:
        cactos.addImage(cacto4);
        break;
      case 5:
        cactos.addImage(cacto5);
        break;
      case 6:
        cactos.addImage(cacto6);
        break;

      default:
        break;
    }
    cactosG.add(cactos)
  }
}
