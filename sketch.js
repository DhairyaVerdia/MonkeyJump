var monkey,invground,obs,collided;
var obsimg,bgImage,bg;
var bananaimg,banana;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;


function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 collided_monkey = loadAnimation("collided.png")
  bananaimg=loadImage("banana.png");
  
  backgr = loadImage("jungle.jpg");

  obsimg = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
   bg = createSprite(200,200,400,400);
  bg.addImage('jungle',backgr);
   monkey = createSprite (80,335,30,30);
  monkey.addAnimation('running',monkey_running);
  monkey.scale = 0.1;
  invground = createSprite(200,389,400,50);
  invground.visible = false;
  
  
  obsgroup = new Group();
  bananagroup = new Group();
}

function draw() {
  background(220);
  if (gamestate === PLAY){
  bg.velocityX = -4;
 // bg.scale = 2;
  if(bg.x<0){
  bg.x =bg.width/2;
  }
  if(keyDown("space")&&(monkey.y >=308 )){
  monkey.velocityY = -16;
  }
  //monkey.debug = true;
  
  monkey.velocityY = monkey.velocityY + 0.8    
  if (invground.x < 0){
    invground.x = invground.width/2;
  }
  
  spawnbananas();
  spawnobstacles();
  monkey.collide(invground);
  
  if(bananagroup.isTouching(monkey)){
  bananagroup.destroyEach();
   // monkey.scale = monkey.scale + 0.005;
    score = score + 2;
  }
  if(obsgroup.isTouching(monkey)&&monkey.scale >0.1){
 obsgroup.destroyEach();
    monkey.scale = 0.1;
    score = score - 2;
  }
 // console.log(monkey.scale);
  if(obsgroup.isTouching(monkey) && monkey.scale === 0.1 ){
  //obs.velocityX = 0;
    monkey.scale = 0.1;
    gamestate = END;
   
  }
  }
  else if (gamestate ===END){
    bg.velocityX = 0;
    monkey.visible = false;
    bananagroup.setVelocityXEach(0);
    obsgroup.setVelocityXEach (0);
   score = "gameover";
    obsgroup.setLifetimeEach=-1;
  }
  
   drawSprites();
  
  fill("white"); 
  textSize(20);
  text("Score : "+score,10,50)
  switch(score){
  case 4:monkey.scale = 0.12;
    break;
    case 20:monkey.scale = 0.14;
    break;
    case 30:monkey.scale = 0.16;
    break;
    case 40:monkey.scale = 0.18;
    break;
    default: break;


  }
}
function spawnbananas(){
  if(frameCount%90===0){
  var banana = createSprite(400,Math.round(random(150,275)),30,30);
     banana.addImage('bana',bananaimg);
  
    banana.scale  = 0.07;
   // banana.debug = true;
    banana.setCollider("circle",0,0,450);
    bananagroup.add(banana);
    banana.velocityX = -5;
    bananagroup.setLifetimeEach = 100;
    
  }
}
function spawnobstacles(){
  if(frameCount%240===0){
  var obs = createSprite(400,343,30,30);
   obs.addImage('obst',obsimg);
  obs.velocityX = -5;
    obs.scale  = 0.15;
    //obs.debug = true;
    obs.setCollider("circle");
    obsgroup.add(obs);
    
    obsgroup.setLifetimeEach = 200;
    
  }
}
