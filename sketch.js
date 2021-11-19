// crio as variaveis
var trex
var trexCorrendo
var bordas
var chao
var chaoImagem
var chaoInvisivel
var nuvemImagem
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6

function cactos(){
 if(frameCount % 110 === 0){
var cacto=createSprite(600,170,10,40)
cacto.velocityX=-2
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
}
}

// serve para precarregar imagens/animacoes/sons
function preload(){
    trexCorrendo = loadAnimation('trex1.png', 'trex2.png', 'trex3.png')
    chaoImagem=loadImage('ground2.png')
    nuvemImagem=loadImage("cloud.png")
    cacto1=loadImage('obstacle1.png')
    cacto2=loadImage('obstacle2.png')
    cacto3=loadImage('obstacle3.png')
    cacto4=loadImage('obstacle4.png')
    cacto5=loadImage('obstacle5.png')
    cacto6=loadImage('obstacle6.png')
}


// serve pra fazer a configuracao inicial (só é executada 1 vez quando o jogo começar)
function setup() {
    createCanvas(600, 200)

    trex = createSprite(50, 150, 20, 50)
    trex.addAnimation('correndo', trexCorrendo)
    trex.scale=0.8

var aleatorio=Math.round(random(10,100))
console.log(aleatorio)
    bordas = createEdgeSprites()

    chao=createSprite(300,185,600,20)
    chao.x=chao.width/2
    chao.addImage(chaoImagem)
    
    chaoInvisivel=createSprite(300,200,600,10)
chaoInvisivel.visible=false
}

// serve para fazer o jogo funcionar o tempo todo (é executada o tempo todo, infinitamente até eu parar o jogo)
function draw() {
    background('white')

    if (keyDown('space') && trex.y>120) {
        trex.velocityY = -10
    }
    nuvens()
    cactos()

    trex.velocityY = trex.velocityY + 0.5

    trex.collide(chaoInvisivel)

    chao.velocityX=-5

    if(chao.x<0){
chao.x=width/2
    }

    drawSprites()

}

