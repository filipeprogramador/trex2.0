// crio as variaveis
var trex
var trexCorrendo
var bordas
var chao
var chaoImagem



// serve para precarregar imagens/animacoes/sons
function preload(){
    trexCorrendo = loadAnimation('trex1.png', 'trex2.png', 'trex3.png')
    chaoimagem=loadImage('ground2.png')
}


// serve pra fazer a configuracao inicial (só é executada 1 vez quando o jogo começar)
function setup() {
    createCanvas(600, 200)

    trex = createSprite(50, 150, 20, 50)
    trex.addAnimation('correndo', trexCorrendo)


    bordas = createEdgeSprites()

    chao=createSprite(300,190,600,20)
    chao.x=chao.width/2
    chao.addImage(chaoimagem)

}

// serve para fazer o jogo funcionar o tempo todo (é executada o tempo todo, infinitamente até eu parar o jogo)
function draw() {
    background('white')

    if (keyDown('space')) {
        trex.velocityY = -10
    }

    trex.velocityY = trex.velocityY + 0.5

    trex.collide(chao)

    chao.velocityX=-5

    if(chao.x<0){
chao.x=width/2
    }

    drawSprites()

}

