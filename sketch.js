var trexRunning , trexCollider , groundImage , restartImage , gameOverImage , cloudImage , obstacle1 , obstacle2 , obstacle3 , obstacle4 , obstacle5, obstacle6, trex , cloud , ground , invisibleGround, obstacle , cloudsGroup , obstaclesGroup ;
var gameState=1;
var gameOver;
var restartButton;
var speed;
var score;
 localStorage[ "HighestScore"]=0;

function preload(){
  trexRunning=loadAnimation("trex1.png" ,"trex3.png" ,"trex4.png");
  trexCollider=loadImage("trex_collided.png");
  groundImage=loadImage("ground2.png");
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png");
   obstacle3=loadImage("obstacle3.png");
   obstacle4=loadImage("obstacle4.png");
   obstacle5=loadImage("obstacle5.png");
   obstacle6=loadImage("obstacle6.png");
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,10,10);
  trex.addAnimation("running", trexRunning);
  trex.scale=.5;
  ground=createSprite(300,180,10,10);
  ground.addImage("ground", groundImage);
  ground.x=ground.width/2;
  invisibleGround=createSprite(300,190,600,10);
  invisibleGround.visible=false;
  ground.velocityX=-6;
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
   gameOver = createSprite(300,50,100,100);
gameOver.addImage(gameOverImage);
gameOver.scale=.5;
gameOver.visible=false;
 restartButton = createSprite(300,100,50,50);
restartButton.addImage(restartImage);
restartButton.scale=.6;
restartButton.visible=false;
 trex.addImage("collided",trexCollider);
score=0;
 speed = 3*(score/100);
}

function draw() {
  background(180,270);
  text("SCORE: "+ score,500,65);
  
  
  
  if(gameState===1){
  score=score+Math.round(getFrameRate()/60);
    ground.velocityX=-(16+speed);
     if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space") && trex.y>=161.5){
  trex.velocityY=-12;
  }
  trex.velocityY++;
//  console.log(trex.y);
   spawnObstacles();
  spawnClouds();
 if(obstaclesGroup.isTouching(trex)){
gameState=0;

}
  }
  else if (gameState===0){

ground.velocityX=0;
obstaclesGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setVelocityXEach(0);    
cloudsGroup.setLifetimeEach(-1);
trex.changeImage("collided");
trex.velocityY=0;
restartButton.visible=true;
gameOver.visible=true;    
  }
trex.collide(invisibleGround);

if(mousePressedOver(restartButton)){
reset();
  
}
 
  
  drawSprites();
 
}
function spawnObstacles(){
  if(frameCount%60===0){
    obstacle=createSprite(600,180,10,20);
    obstacle.velocityX=-(16+speed);
    obstacle.lifetime=100;
    obstacle.scale=.5;
    obstacle.y=170;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break ;
      case 6:obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    obstaclesGroup.add(obstacle);
  }
}
function spawnClouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,70,10,20);
    cloud.velocityX=-6;
    cloud.lifetime=100;
    cloud.scale=.5;
    cloud.addImage(cloudImage);
    cloudsGroup.add(cloud)
    
  }
}
function reset(){
  gameState=1;
  gameOver.visible=false;
  restartButton.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trexRunning);
  if(localStorage["HighestScore"]<score){
   localStorage["HighestScore"]=score; 
  }
  console.log(localStorage["HighestStorage"]);
  score=0; 
}
