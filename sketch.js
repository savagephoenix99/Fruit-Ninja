//gamestates
  var PLAY=1;
  var END=0;
  var gameState=1;

//swword goes chippy choppy
  var sword
  var swordIMG
  var swordSwish
  
//dragolandic berry
  var fruit
  var fruit1
  var fruit2 
  var fruit3
  var fruit4
  var fruitGroup

//random variables
  var r
  var xPos

//scarymonsters. not very creative rn LOL.
  var monster
  var monsterAnimation
  var monsterGroup
  
//score
  var score=0;
  
//game over screen
  var GameOver
  var GOimg
  var GameOverSound

function preload(){
//gameover
  GOimg=loadImage("gameover.png");
//sword delicious image + chip chop sound
  swordIMG=loadImage("sword.png")
  swordSwish=loadSound("knifeSwooshSound.mp3")
//tasty bad luck sound
  GameOverSound=loadSound("gameover.mp3")
//fruity picture
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
 
//scary monsters
  monsterAnimation=loadAnimation("alien1.png", "alien2.png");
}

function setup(){

  createCanvas(600, 600);
//sword creation chha-chhing *anvil noises*
    sword=createSprite(300, 400, 20, 20)
    sword.addImage("knifey", swordIMG)
    sword.scale=0.7
  
//fruit setup
    fruitGroup=createGroup();
  
//monster setup
    monsterGroup=createGroup();

//gameOver setup
    GameOver=createSprite(300,300);
    GameOver.addImage("uh-oh",GOimg)
    GameOver.scale=2.5
  
}

function draw(){
  background("#663300")
  textSize=50
  text("Score:"+score, 500, 30);
if (gameState===PLAY){
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  GameOver.visible=false

  eatFruit();
  scaryMonsters();
}
  
if (fruitGroup.isTouching(sword)){
  score = score+1
  fruitGroup.destroyEach();
  swordSwish.play();

}
  
if (monsterGroup.isTouching(sword)){
  gameState=END
  fruitGroup.destroyEach();
  monsterGroup.destroyEach();
  GameOverSound.play();
}

if  (gameState===END){
  GameOver.visible=true;
  if (keyDown("space")){
    gameState=PLAY    
    score=0;
  }
}

  drawSprites();
}

function eatFruit(){
//nom nom sour cone
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20)
    fruit.scale=0.2
    r=Math.round(random(1,4))
    xPos=Math.round(random(1,2))
    if (r===1){
      fruit.addImage("fruit1",fruit1);
    }
    if (r===2){
      fruit.addImage("fruit2",fruit2);
    }
    if (r===3){
      fruit.addImage("fruit3",fruit3);
    }
    if (r===4){
      fruit.addImage("fruit4",fruit4);
    }
    if (xPos===1){
      fruit.x=0;
      fruit.velocityX=(7+(score/4));
    }
    if (xPos===2){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    
  }
}

function scaryMonsters(){
  if (World.frameCount%200===0){
  monster=createSprite(400,200.20,20)
  monster.scale=1;
  monster.addAnimation("boo",monsterAnimation)
  monster.y=Math.round(random(50, 350));
  monster.setlifeTime=120;
  monsterGroup.add(monster);
    
    if (xPos===1){
      monster.x=0;
      monster.velocityX=(6+(score/8))
    }
    if (xPos===2){
      monster.x=400;
      monster.velocityX=-(6+(score/8))
    }
  }
}
