// crio as variaveis
var trex
var trexCorrendo
var bordas
var chao
var chaoImagem
var chaoInvisivel
var nuvemImagem

function nuvens () {


if(frameCount % 60 === 0){
    var nuvem=createSprite(600,50,50,10)
    nuvem.velocityX=-2
    nuvem.y=Math.round(random(10,100))
    nuvem.addImage(nuvemImagem)
    nuvem.depth=trex.depth
    trex.depth=trex.depth+1
}
}

// serve para precarregar imagens/animacoes/sons
function preload(){
    trexCorrendo = loadAnimation('trex1.png', 'trex2.png', 'trex3.png')
    chaoImagem=loadImage('ground2.png')
    nuvemImagem=loadImage("cloud.png")
}


// serve pra fazer a configuracao inicial (só é executada 1 vez quando o jogo começar)
function setup() {
    createCanvas(600, 200)

    trex = createSprite(50, 150, 20, 50)
    trex.addAnimation('correndo', trexCorrendo)

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

    trex.velocityY = trex.velocityY + 0.5

    trex.collide(chaoInvisivel)

    chao.velocityX=-5

    if(chao.x<0){
chao.x=width/2
    }

    drawSprites()

}

