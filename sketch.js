var bg,bgImg;
var player, HUNTERImg, HUNTER_shooting;
var ghost, ghostImg;
var gunsound;
var win;
var lose;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var ghostGroup;
var bullets = 100
var score = 0;
var life = 3;

var gameState = "fight"

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  HUNTERImg = loadImage("assets/HUNTER2.png")
  HUNTER_shooting = loadImage("assets/HUNTER1.png")
  gunsound = loadSound("assets/gunsound.mp3")
  ghostImg = loadImage("assets/Ghost.png")
  bgImg = loadImage("assets/bg.jpg")
  gunsound = loadSound("assets/gunsound.mp3")
  lose = loadSound("assets/lose.mp3")
  winning= loadSound("assets/win.mp3")



}

function setup() {

  
  createCanvas(windowWidth,windowHeight);


  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale=5

 player = createSprite(displayWidth-1150,displayHeight-300,50,50)
  player.addImage(HUNTERImg)
  player.scale=0.5
  player.debug = true
  player.setCollider("rectangle",0,0,200,200)


  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.addImage(heart1Img)
  heart1.scale=0.4
  heart1.visible = false

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale=0.4
  heart2.visible = false

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale=0.4
  
   
 ghostGroup = new Group()
 bulletGroup = new Group()
}

function draw() {
  background(0); 
  if(gameState === "fight"){
  
    if(life === 3){
      heart3.visible = true
      heart2.visible = false
      heart1.visible = false
  
    }
  
    if(life === 2){
      heart3.visible = false
      heart2.visible = true
      heart1.visible = false
  
    }
  
  
    if(life === 1){
      heart3.visible = false
      heart2.visible = false
      heart1.visible = true
  
    }
    
    if(life === 0){
      gameState = "lost"
      lose.play();
    }
  
    //go to gameState "won" if score is 100
    if(score == 100){
      gameState = "won"
      winning.play()
    }
  

if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}

if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
}



if(keyWentDown("space")){
bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(HUNTERImg)
  bullets=bullets-1
gunsound.play()
}

else if(keyWentUp("space")){
player.addImage(HUNTERImg)

}

if(bullets==0){
  gameState = "bullet"
 lose.play();
    
}

if(ghostGroup.isTouching(bulletGroup)){

  for(var i= 0;i<ghostGroup.length;i++){     
       
   if(ghostGroup[i].isTouching(bulletGroup)){
    ghostGroup[i].destroy()
        bulletGroup.destroyEach()
        score = score+5
        } 
  
  }
 }


if(ghostGroup.isTouching(player)){

  for(var i= 0;i<ghostGroup.length;i++){
    if(ghostGroup[i].isTouching(player)){
      ghostGroup[i].destroy()
      life=life-1
    }
  }
}

enemy();

drawSprites();
}

//displaying the score and remaining lives and bullets
textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  ghostGroup.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  ghostGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  ghostGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}




function enemy(){
if(frameCount%50===0){
ghost = createSprite(random(500,1100),random(100,500),40,40)
ghost.addImage(ghostImg)
ghost.scale = 0.1
ghost.velocityX = -3
ghost.debug = true
ghost.setCollider("rectangle",0,0,500,500)
ghost.lifetime = 400
ghostGroup.add(ghost)

}
}
