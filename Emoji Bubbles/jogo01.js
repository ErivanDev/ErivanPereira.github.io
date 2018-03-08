const descrescimo = 1/60;
const raio = 25;
const diametro = raio*2;
const dist = 0.88 * diametro;
const width = 500;
const height = 500;
const horizontais = width/raio; 
const verticais = height/raio; 

var ang = 4.71, angspeed = 0, x = 250, y = 465;
var bola = [], obstaculos = [], icons = [], tipo = [];
var lancamento = true, movercanhao = false;
var formaMapa = 0, fase = 1, tempo = 120;
var efeitomira = 0;
var valorbooster = 0;
var booster1 = 10;
var booster2 = 10;

function setup(){
    loadImagens();
    loadMapa(fase);
    //criar bolas no mapa
    reiniciar();
    tipo[0] = int(random(7));
    tipo[1] = int(random(7));
    //aumentar para 700 quando necessario
    var canvas = createCanvas(width,height);
    canvas.id("game");
    canvas.parent("main");
}

function coordenadasTan(){
    if(mouseY < y - 20){
        let xx = mouseX - x;
        let yy = mouseY - y;
        ang = atan(yy/xx);
        if( xx<0 ) ang+=PI;
    }
    var xbooster = x;
    var ybooster = y; 
    var hbooster = cos(ang);
    var vbooster = sin(ang);
    var parar = false;
    fill(255,0,0);
    noStroke();
    if(efeitomira < 10) efeitomira++; else efeitomira = 0;
    var a = 0;
    while(parar == false){
        if(a%10==efeitomira) ellipse(xbooster,ybooster,5,5);
        if(xbooster - raio < 0 || xbooster + raio > 500) hbooster=-hbooster;
        xbooster+=hbooster;
        ybooster+=vbooster;
        for(var i=0;i<bola.length;i++){
            var distancia = sqrt(pow(xbooster - bola[i].x,2)+pow(ybooster - bola[i].y,2));
            if(abs(int(distancia)) <= diametro) parar = true;
        }
        if(ybooster < raio) parar = true;
        a++;
    }
    fill(0);
    strokeWeight(2);
    stroke(255);
    ellipse(xbooster,ybooster,diametro,diametro);
}

function mousePressed(){
    if(movercanhao) x = mouseX;
}

function mouseReleased(){
    var distancia = sqrt(pow(x - mouseX,2)+pow(y - mouseY,2));
    if(distancia >= raio && lancamento == true){
        var novabola = new ball(cos(ang),sin(ang));
        novabola.tipo = tipo[0];
        bola.push(novabola);
        tipo[0] = tipo[1];
        tipo[1] = int(random(7));
    }
    else if(distancia <= raio){
        movercanhao =! movercanhao;
    }
}

function redimencionar(){
    document.getElementById("game").style.width = windowHeight;
    document.getElementById("game").style.height = windowHeight;
    document.getElementById("main").style.width = windowHeight;
}

function draw(){
    redimencionar()
    background(255,0,255);
    lancamento = true;
    coordenadasTan(); 
    /*var auxi = 0;
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            if(j % 2 != 0){
                auxi = 25;
            }
            else{
                auxi=0;
            }
            //ellipse(i*50+25+auxi,j*44+25,50,50);
        }
    }*/
    //ellipse(250,500,50,50);
    booster(valorbooster);
    for(let i=0;i<bola.length;i++) bola[i].update();
    for(let i=0;i<bola.length;i++) if(bola[i].diametro >= 60) bola.splice(i,1);
    for(let i=0;i<bola.length;i++) if(bola[i].colisao == true) bola[i].testetipo();
    for(let i=0;i<bola.length;i++) bola[i].testeabaixo();
    for(let i=0;i<bola.length;i++) bola[i].sprite();
    //se dê merda, tira esse sozinho
    sozinho();
    canhoes();

    if(bola.length == 0){
        fase++;
        reiniciar();
    }
    if(int(tempo) == 0) reiniciar();
    /*
    if(valorbooster == 1 && booster1 > 0){
        booster1-=descrescimo;
    }
    if(valorbooster == 2 && booster2 > 0){
        booster2-=descrescimo;
    }*/
    //hud();
    tempo-=descrescimo;
    
    if(int(tempo*100) % 2000 == 0){
        for(let i=0;i<bola.length;i++) bola[i].y += dist;
        for(let i=1;i<9;i++){
            var novabola = new ball(0,0);
            novabola.x = diametro*i + (raio*formaMapa);
            novabola.y = raio;
            novabola.pode = false;
            novabola.colisao = true;
            novabola.icon();
            bola.push(novabola);
        }
        if(formaMapa == 0) formaMapa = 1; else formaMapa = 0;
    }
}

/*function hud(){
    textSize(32);
    textAlign(CENTER);
    fill(0);
    rect(500,0,600,height)
    fill(255);
    text(int(tempo),550,30);
    textSize(16);
    text("NIVEL: "+fase,550,70);
    text("LIMITE",550,421);
}*/

function canhoes(){
    //stroke(255); strokeWeight(54); line(x,y,x+(50*cos(ang)),y+(50*sin(ang)));
    //stroke(0); strokeWeight(50); line(x,y,x+(50*cos(ang)),y+(50*sin(ang)));
    fill(0); stroke(255); strokeWeight(2); ellipse(x,y,84,84);
    //fill(0); stroke(255); strokeWeight(2); ellipse(x-62,y+12,40,40);
    stroke(255,0,0); strokeWeight(1); line(0,421,width,421); 
    stroke(0);
    image(icons[tipo[0]],x-raio,y-raio,50,50);
    //image(icons[tipo[1]],x-75,y,raio,raio);
}
//keyPressed()
window.addEventListener("keydown", function(event){
    //keyCode
    switch (event.keyCode) {
        case 32: 
            //SPACEBER = 32 troca bolas
            var troca = tipo[0];
            tipo[0] = tipo[1];
            tipo[1] = troca;
        break;
        case 90: 
            //Z = 90
            //valorbooster = 2;
        break;
        case 88: 
            //X = 88
            valorbooster = 1;
        break;
    }
});

function ball(hspeed,vspeed){
    this.hspeed = hspeed;
    this.vspeed = vspeed;
    this.diametro = diametro;
    this.tipo = tipo;
    this.colisao = false;
    this.x = x;
    this.y = y;
    this.newx;
    this.newy;
    this.pode = true;
    this.permissao = true;
    this.gravidade = false;
    this.once = true;
    this.icon = function(){
        var tipos = [];
        var tiposvalidos = [];
        for(let i=0;i<bola.length;i++){
            if(this != bola[i]){
                let distancia = sqrt(pow(this.x - bola[i].x,2)+pow(this.y - bola[i].y,2));
                if(abs(int(distancia)) == diametro) tipos.push(bola[i].tipo); 
            }
        }
        for(let i=0;i<7;i++) if(tipos.indexOf(i) == -1) tiposvalidos.push(i);
        this.tipo = tiposvalidos[int(random(tiposvalidos.length))];
    }
    this.sprite = function(){
        //var xx = this.x/50; var yy = this.y/44;
        image(icons[this.tipo],this.x-this.diametro/2,this.y-this.diametro/2,this.diametro,this.diametro);
    }
    this.update = function(){
        if(this.colisao == false){
            for(let i=0;i<10;i++){
                if(this.colisao == false) this.colidido();
                if(this.colisao == false){
                    this.x+=this.hspeed;
                    this.y+=this.vspeed;
                }
                if(this.x+raio>500 || this.x-raio<0) this.hspeed=-this.hspeed;
                if(this.y-raio<0) this.colisao = true;
            }
        }
        if(this.colisao == true && this.pode == true){
            this.newpos();
            this.vspeed = 0;
            this.hspeed = 0;
            if(this.gravidade != true){
                this.x = (this.x+this.newx)/2;
                this.y = (this.y+this.newy)/2;
            }
            else{
                this.x = this.x;
                this.y = this.y;
            }
            if(this.newx == this.x && this.newy == this.y) this.pode = false;
        } 
        if(this.gravidade == false && this.y == 421) reiniciar();
        if(this.gravidade == true) this.diametro+=1;
        if(this.diametro >= 58) this.tipo = 7;
        if(this.colisao == false || this.gravidade == true) lancamento = false;
    }
    this.testetipo = function(){
        var arredo = [];
        for(let i=0;i<bola.length;i++){
            let distancia = sqrt(pow(this.x - bola[i].x,2)+pow(this.y - bola[i].y,2));
            if(abs(int(distancia)) == diametro && this.tipo == bola[i].tipo)
                    arredo.push(i);
        }
        if(arredo.length > 1){
            for(let i=0;i<arredo.length;i++) bola[arredo[i]].gravidade = true;
            this.gravidade = true;
        }
    }
    this.newpos = function(){
        var posicaox;
        var posicaoy;
        var aux = 0;
        //determinar posicao vertical
        var menor = 5000;
        for(let i=0;i<verticais;i++){
            if(abs(this.y-(raio+dist*i)) <= menor){
                menor = abs(this.y-(raio+dist*i));
                posicaoy = raio+dist*i;
                aux = (i + formaMapa) % 2;
            }
        }
        var menor = 5000;
        for(let i=aux;i<horizontais;i+=2){
            if(abs(this.x-(raio+raio*i)) <= menor){
                menor = abs(this.x-(raio+raio*i));
                posicaox = raio+raio*i;
            }
        }
        this.newx = posicaox;
        this.newy = posicaoy;
    }
    this.colidido = function(){
        for(let i=0;i<bola.length;i++){
            let distancia = sqrt(pow(this.x - bola[i].x,2)+pow(this.y - bola[i].y,2));
            if(abs(int(distancia)) <= diametro && this != bola[i]) 
                this.colisao = true;
        }
    }
    this.testeabaixo = function(){
        if(this.gravidade == true && this.permissao == true){
            for(let i=0;i<bola.length;i++){
                let distancia = sqrt(pow(this.x - bola[i].x,2)+pow(this.y - bola[i].y,2));
                
                if(abs(int(distancia)) == diametro && bola[i].y > this.y) bola[i].gravidade = true;
            
            }
            this.permissao = false;
        }
    }
}

function sozinho(){
    var vetor = [];

    for(let i=0;i<bola.length;i++) 
        if(bola[i].y == raio) 
            vetor.push(i);
    
    for(let i=0;i<vetor.length;i++){
        for(let j=0;j<bola.length;j++){
            let distancia = sqrt(pow(bola[vetor[i]].x - bola[j].x,2)+pow(bola[vetor[i]].y - bola[j].y,2));
            if(abs(int(distancia)) == diametro && vetor.indexOf(j) == -1)
                vetor.push(j);
        }
    }

    for(let i=0;i<bola.length;i++)
        if(vetor.indexOf(i) == -1 && bola[i].colisao == true && bola[i].pode == false)
            bola[i].gravidade = true;

}

function loadImagens(){
    icons = [loadImage("imagens/1f60f.png"), //safado
             loadImage("imagens/1f609.png"), //piscando 
             loadImage("imagens/1f636.png"), //bocafechada
             loadImage("imagens/1f618.png"), //beijinho
             loadImage("imagens/1f60e.png"), //deoculos
             loadImage("imagens/1f610.png"), //neutro
             loadImage("imagens/1f634.png"), //dormindo
             loadImage("imagens/1f4a5.png")] //explosao
}

function loadMapa(nivel){
    if(nivel == 1){
        obstaculos = [[0,0,0,0,1,0,1,0,0,0],
                       [0,0,0,1,1,1,1,0,0],
                      [0,0,0,0,1,1,1,0,0,0],
                       [0,0,0,0,1,1,0,0,0],
                      [0,0,0,0,0,1,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0]];
    }
    if(nivel == 2){
        obstaculos = [[0,0,1,0,0,0,0,1,0,0],
                       [0,0,1,0,0,0,1,0,0],
                      [0,0,0,1,1,1,1,0,0,0],
                       [0,0,0,1,1,1,0,0,0],
                      [0,0,0,0,1,1,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0], 
                       [0,0,0,0,0,0,0,0,0]];
    }
    if(nivel == 3){
        obstaculos = [[0,1,0,1,0,1,0,1,0,0],
                       [0,1,1,1,1,1,1,0,0],
                      [0,0,1,0,0,0,1,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0]];
    }   
    if(nivel == 4){
        obstaculos = [[0,0,0,1,0,1,0,1,0,0],
                       [0,0,0,1,1,1,1,0,0],
                      [0,0,0,0,1,0,1,0,0,0],
                       [0,0,0,1,1,1,1,0,0],
                      [0,0,0,0,1,0,1,0,0,0],
                       [0,0,0,1,1,1,1,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0]];
    }
    if(nivel == 5){
        obstaculos = [[0,0,0,1,0,1,0,1,0,0],
                       [0,0,0,1,1,1,1,0,0],
                      [0,0,1,1,0,0,1,1,0,0],
                       [0,1,1,0,0,0,1,1,0],
                      [0,0,1,1,0,0,0,1,0,0],
                       [0,1,1,1,1,1,1,1,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0]];
    }
}

function reiniciar(){
    bola = undefined;
    bola = [];
    formaMapa = 0;
    loadMapa(fase);
    tempo= 120;
    ang = 4.71;
    x = 250;
    y = 465;
    lancamento = true;
    movercanhao = false;
    //criar bolas no mapa
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            if(obstaculos[i][j]==1){
                var novabola = new ball(0,0);
                novabola.x = raio+diametro*j+(raio*(i%2));
                novabola.y = raio+dist*i;
                novabola.pode = false;
                novabola.colisao = true;
                novabola.icon();
                bola.push(novabola);
            }
        }
    }
}

function booster(choose){
    var xbooster = x;
    var ybooster = y; 
    var hbooster = cos(ang);
    var vbooster = sin(ang);
    var parar = false;
    switch(choose){
        case 1:
            while(parar == false){
                fill(0,255,0)
                ellipse(xbooster,ybooster,5,5);
                if(xbooster - raio < 0 || xbooster + raio > 500) hbooster=-hbooster;
                xbooster+=hbooster*10;
                ybooster+=vbooster*10;
                for(var i=0;i<bola.length;i++){
                    var distancia = sqrt(pow(xbooster - bola[i].x,2)+pow(ybooster - bola[i].y,2));
                    if(abs(int(distancia)) <= diametro) parar = true;
                }
                if(ybooster < 0) parar = true;
            }
        break;
        case 2:
            //movercanhao = true;
        break;
    }
}
