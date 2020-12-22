var  tower,towerimage,
    ghost,ghostimage1,door,doorimage,climber,climberimage
var  invisibleblock,ghostimage2,spookysound
var doorgroup,climbergroup,invisibleblockgroup
var gameState="play"

function preload(){
  
  towerimage=loadImage("tower.png") 
  ghostimage1=loadImage("ghost-jumping.png")
  ghostimage2=loadImage("ghost-standing.png")
  doorimage=loadImage("door.png")
  climberimage=loadImage("climber.png")
  spookysound=loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage(towerimage)
  tower.velocityY=5 
  ghost=createSprite(300,300)
  ghost.addImage(ghostimage1)
  ghost.addImage(ghostimage2)
  ghost.scale=0.4
  
  doorgroup = new Group()
  climbergroup = new Group()
  invisibleblockgroup = new Group()
}

function draw(){
 background(0)
  spookysound.play()
  if(gameState==="play"){
    if (tower.y>600){
      tower.y=300
    }

    if(keyDown("left")){
      ghost.x=ghost.x-5
    }
    if(keyDown("right")){
      ghost.x=ghost.x+5
    }
    if(keyDown("space")){
      ghost.velocityY=-12 
    }
    ghost.velocityY=ghost.velocityY+0.8                                         
    spawndoor()                  
    drawSprites()
    if(climbergroup.isTouching(ghost)){
    ghost.velocityY=0
    
  }
    if(ghost.y > 600){
      gameState="end"
    }


  }
  else if(gameState==="end"){
    stroke("white")
    fill("blue")
    textSize(40)
    text("G A M E   O V E R",130,300)
    
  }
    
}
function spawndoor (){
  if (frameCount%240===0){
   door=createSprite(200,50) 
   door.addImage(doorimage)
    climber=createSprite(200,100)
    climber.addImage(climberimage)
    invisibleblock=createSprite(200,105,climber.width,3)
    invisibleblock.debug=true
    invisibleblock.visible=true
    invisibleblock.velocityY=1
    door.velocityY=1
    climber.velocityY=1
    
    door.x=Math.round(random(70,520))
    climber.x=door.x
    invisibleblock.x=door.x
    
    doorgroup.add(door)
    climbergroup.add(climber)
    invisibleblockgroup.add(invisibleblock)
    
    ghost.depth=door.depth+1
}
}