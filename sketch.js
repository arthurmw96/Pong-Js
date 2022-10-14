// Tela do jogo
let width = 600;
let height = 400;

// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;

// Variáveis de movimento da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da raquete
let xRaqueteP1 = 5;
let yRaqueteP1 = 160;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variáveis da raquete p2
let xRaqueteP2 = width - (xRaqueteP1 + raqueteComprimento);
let yRaqueteP2 = 160;

// Variáveis de movimento das raquetes
let velocidadeRaqueteP1 = 7;
let velocidadeRaqueteP2;

let colidiu = false;

// Variáveis do placar
let pontosP1 = 0;
let pontosP2 = 0;

// Variáveis sons do jogo
let som_raquetada;
let som_ponto;

function preload(){
  som_raquetada = loadSound("raquetada.mp3");
  som_ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaqueteP1, yRaqueteP1);
  mostraRaquete(xRaqueteP2, yRaqueteP2);
  movimentaRaqueteP1();
  movimentaRaqueteP2();
  colisaoRaqueteBib(xRaqueteP1, yRaqueteP1);
  colisaoRaqueteBib(xRaqueteP2, yRaqueteP2);
  incluiPlacar();
  marcaPontos();
  mostraMesa();

  function mostraBolinha(){
      circle(xBolinha,yBolinha,diametro);
  }

  function movimentaBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
  }

  function verificaColisaoBorda(){
    if (xBolinha > width-(diametro/2) ||
        xBolinha < 0+(diametro/2)) {
      velocidadeXBolinha *= -1;
    }

    if (yBolinha > height-(diametro/2) || 
        yBolinha < 0+(diametro/2)){
      velocidadeYBolinha *= -1;
    }
  }
  
  function mostraRaquete(x,y){
    rect(x,y,raqueteComprimento,raqueteAltura);
  }
  
  function movimentaRaqueteP1(){
    if ((keyIsDown(UP_ARROW)) && (yRaqueteP1 > 0)){
      yRaqueteP1 -= velocidadeRaqueteP1;
    }
    if ((keyIsDown(DOWN_ARROW)) && (yRaqueteP1 + raqueteAltura < height)){
      yRaqueteP1 += velocidadeRaqueteP1;
    }
  }
  
  function movimentaRaqueteP2(){
    velocidadeRaqueteP2 = yBolinha - yRaqueteP2 - raqueteComprimento / 2 - 30;
    if ((yRaqueteP2 + velocidadeRaqueteP2 > 0) && (yRaqueteP2 + raqueteAltura + velocidadeRaqueteP2 < 400)){
      yRaqueteP2 += velocidadeRaqueteP2
        }
  }
  
  function colisaoRaqueteBib(x,y){
    colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,(diametro/2));
    if (colidiu){
      velocidadeXBolinha *= -1;
      som_raquetada.play();
    }
  }
  
  function incluiPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(130, 10, 40, 20);
    fill(250);
    text(pontosP1, 150, 26);
    fill(color(255, 140, 0));
    rect(430, 10, 40, 20);
    fill(250);
    text(pontosP2, 450, 26);
  }
  
  function marcaPontos(){
    if (xBolinha > width - 10){
      pontosP1 += 1;
      xBolinha = 300;
      yBolinha = 200;
      velocidadeXBolinha *= -1;
      som_ponto.play();
      }
    if (xBolinha < 10){
      pontosP2 += 1;
      xBolinha = 300;
      yBolinha = 200;
      som_ponto.play();
    }
  }
  
  function mostraMesa(){
    rect(width/2,0,1,height)
    rect(width/10,0,1,height)
    rect(9*width/10,0,3,height)
  }
}
