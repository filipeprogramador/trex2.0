// crio as variaveis
var trex
var trexCorrendo
var trexMorto
var bordas
var chao
var chaoImagem
var chaoInvisivel
var nuvemImagem
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6
var estado='jogando'
var grupoCacto,grupoNuvem
var pontuacao=0
var gameOver,gameOverImagem
var restart,restartImagem
var die
var checkpoint
var jump

function reiniciar() {
 estado = 'jogando'
 pontuacao = 0
 grupoCacto.destroyEach()
 grupoNuvem.destroyEach()
 gameOver.visible=false
 restart.visible=false
 trex.changeAnimation('correndo',trexCorrendo)
 
}


function cactos(){
 if(frameCount % 110 === 0){
var cacto=createSprite(600,170,10,40)
cacto.velocityX=-(6+pontuacao/100)
cacto.scale=0.6
cacto.lifetime=350


var tipo=Math.round(random(1,6))
console.log(tipo)
switch (tipo){
case 1: cacto.addImage(cacto1)
break
case 2: cacto.addImage(cacto2)
break
case 3: cacto.addImage(cacto3)
break
case 4: cacto.addImage(cacto4)
break
case 5: cacto.addImage(cacto5)
break
case 6: cacto.addImage(cacto6)
break   
default:break 
}
    grupoCacto.add(cacto)
    

 } 
}


function nuvens () {


if(frameCount % 60 === 0){
    var nuvem=createSprite(600,50,50,10)
    nuvem.velocityX=-2
    nuvem.y=Math.round(random(10,100))
    nuvem.addImage(nuvemImagem)
    nuvem.depth=trex.depth
    trex.depth=trex.depth+1
    nuvem.lifetime=350
    grupoNuvem.add(nuvem)
}
}

// serve para precarregar imagens/animacoes/sons
function preload(){
    trexCorrendo = loadAnimation('trex1.png', 'trex2.png', 'trex3.png')
    trexMorto = loadAnimation('trex_collided.png')
    chaoImagem=loadImage('ground2.png')
    nuvemImagem=loadImage("cloud.png")
    cacto1=loadImage('obstacle1.png')
    cacto2=loadImage('obstacle2.png')
    cacto3=loadImage('obstacle3.png')
    cacto4=loadImage('obstacle4.png')
    cacto5=loadImage('obstacle5.png')
    cacto6=loadImage('obstacle6.png')
    restartImagem=loadImage('restart.png')
    gameOverImagem=loadImage('gameOver.png')
    jump=loadSound('jump.mp3')
    die=loadSound('die.mp3')
    checkpoint=loadSound('checkPoint.mp3')

}


// serve pra fazer a configuracao inicial (só é executada 1 vez quando o jogo começar)
function setup() {
    createCanvas(600, 200)

    trex = createSprite(50, 150, 20, 50)
    trex.addAnimation('correndo', trexCorrendo)
    trex.addAnimation('morto',trexMorto)
    trex.scale=0.8

var aleatorio=Math.round(random(10,100))
console.log(aleatorio)
    bordas = createEdgeSprites()

    chao=createSprite(300,185,600,20)
    chao.x=chao.width/2
    chao.addImage(chaoImagem)
    
    chaoInvisivel=createSprite(300,200,600,10)
chaoInvisivel.visible=false

grupoCacto= new Group()
grupoNuvem= new Group()
restart = createSprite(300,100,50,50)
restart.addImage(restartImagem)
restart.visible=false
restart.scale=0.6

gameOver = createSprite(300,40,50,50)
gameOver.addImage(gameOverImagem)
gameOver.visible=false
gameOver.scale=0.7

}

// serve para fazer o jogo funcionar o tempo todo (é executada o tempo todo, infinitamente até eu parar o jogo)
function draw() {
    background('white')

    text('pontuação: '+pontuacao,20,40)    
    

    trex.velocityY = trex.velocityY + 0.5



    trex.collide(chaoInvisivel)

  

    

    if (estado === 'jogando'){
        if (keyDown('space') && trex.y>120) {
            trex.velocityY = -10
            jump.play()
        }

        if (pontuacao% 100 === 0) {

        checkpoint.play ()    
        }

        pontuacao = pontuacao + Math.round(frameRate()/60)

        nuvens()
        cactos()
        chao.velocityX=-(6+pontuacao/100)
        if(chao.x<0){
            chao.x=width/2
                }
if (trex.isTouching(grupoCacto)){
estado='perdeu'
trex.changeAnimation('morto',trexMorto)
die.play()
}

    } else if(estado === 'perdeu'){
        chao.velocityX=0
        grupoCacto.setVelocityXEach(0)
        grupoNuvem.setVelocityXEach(0)
        grupoCacto.setLifetimeEach(-1)
        grupoNuvem.setLifetimeEach(-1)
        gameOver.visible=true
        restart.visible=true

        if (mousePressedOver(restart)) {
         reiniciar()   
        }
    }

    drawSprites()

}

