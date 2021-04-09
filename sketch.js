var flappy, flappyImage;
var townbg, townbgImage;
var tunnel, tunnelImage;
var tunnel2, tunnel2Image
var score = 0;
var gb = 0;
var rand;
var ground, ground2;
var tunnelsGroup;
var gameover, gameoverImage;

function preload() {
  flappyImage = loadImage("Flappy_Bird.png");
  townbgImage = loadImage("Background.png");
  tunnelImage = loadImage("Tunnel.png");
  tunnel2Image = loadImage("Tunnel2.png");
  gameoverImage = loadImage("game-over.png");
}

function setup() {
  createCanvas(400, 600);
  
  townbg = createSprite(0, 300, 400, 600);
  townbg.addImage(townbgImage);
  townbg.scale = 0.75;
  
  flappy = createSprite(150, 200, 20, 20);
  flappy.addImage(flappyImage);
  flappy.scale = 0.10;
  
  ground = createSprite(400, 577, 900, 10);
  ground2 = createSprite(400, -8, 900, 10);
  
  tunnelsGroup = createGroup();
  tunnels2Group = createGroup();
}

function draw() {
  background(220);
  
  rand = Math.round(random(450,600));
  
  if (townbg.x < flappy.x - 650){
    townbg.x = flappy.x + 650;
  }
  
  if(keyDown("space")){
    flappy.velocityY = -10
  }

  flappy.velocityX = 3;
  flappy.velocityY = flappy.velocityY + 1.25;
  flappy.collide(ground);
  flappy.collide(ground2);
  
  ground.visible = false;
  
  if(gb === 1){
    flappy.velocityX = 0;
    flappy.velocityY = 0;
    
    tunnelsGroup.setLifetimeEach(-1);
    tunnels2Group.setLifetimeEach(-1);
     
    gameover = createSprite(flappy.x, 300, 400, 600);
    gameover.addImage(gameoverImage);
    gameover.scale = 0.44444;
  }

  if(flappy.y > 545){
    gb = 1;
  }
  
  if(tunnelsGroup.isTouching(flappy) && gb === 0){
    gb = 1;
  }
  
  if(tunnels2Group.isTouching(flappy) && gb === 0){
    gb = 1;
  }
  
  if(frameCount > 101 && frameCount % 100 === 0 && gb === 0){
    score = score + 1;
  }

  camera.position.x = flappy.x;
  camera.position.y = 300;
  
  spawnTunnels();
  spawnTunnels2();
  drawSprites();
  
  stroke("black");
  textSize(25);
  fill("black");
  text ("Score: " + score, flappy.x - 185, 35);
}

function spawnTunnels() {
   if (frameCount % 100 === 0) {
    
     tunnel = createSprite(flappy.x + 252, 500, 400, 400);
     tunnel.y = rand;
     tunnel.addImage(tunnelImage);
     tunnel.scale = 0.5;
     
     tunnel.lifetime = 180;
    
     tunnelsGroup.add(tunnel);
    }
}

function spawnTunnels2() {
   if (frameCount % 100 === 0) {
    
     tunnel2 = createSprite(flappy.x + 252, 500, 400, 400);
     tunnel2.y = rand - 480;
     tunnel2.addImage(tunnel2Image);
     tunnel2.scale = 0.5;
     
     tunnel2.lifetime = 180;
    
     tunnels2Group.add(tunnel2);
    }
}