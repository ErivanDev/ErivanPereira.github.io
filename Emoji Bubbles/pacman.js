var mapa = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,1,0,1,1,1,0,0,1,1,1,0,1,1,0,1,0,0,0,0,0],
    [1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

class pacman{
    constructor(x,y,raio){
        this.x = x;
        this.y = y;
        this.raio = raio;
        this.direcao = 0;
    }
    update(){
        //ellipse(this.x,this.y,this.raio,this.raio);
        rect(this.x,this.y,20,20);
        if(keyIsPressed){
            switch(keyCode){
                case 39: if(mapa[int(this.y/20)][int((this.x)/20)+1] == 0 && this.y % 20 == 0) this.direcao = 39; break;
                case 37: if(mapa[int(this.y/20)][int((this.x-1)/20)] == 0 && this.y % 20 == 0) this.direcao = 37; break;
                case 38: if(mapa[int((this.y-1)/20)][int(this.x/20)] == 0 && this.x % 20 == 0) this.direcao = 38; break;
                case 40: if(mapa[int((this.y)/20)+1][int(this.x/20)] == 0 && this.x % 20 == 0) this.direcao = 40;  break;
            }
        }

        switch(this.direcao){
            case 39: if(mapa[int(this.y/20)][int((this.x)/20)+1] == 0 && this.y % 20 == 0) this.x++; break;
            case 37: if(mapa[int(this.y/20)][int((this.x-1)/20)] == 0 && this.y % 20 == 0) this.x--; break;
            case 38: if(mapa[int((this.y-1)/20)][int(this.x/20)] == 0 && this.x % 20 == 0) this.y--; break;
            case 40: if(mapa[int((this.y)/20)+1][int(this.x/20)] == 0 && this.x % 20 == 0) this.y++; break;
        }
    }
}

class ghost{
    constructor(x,y,raio){
        this.x = x;
        this.y = y;
        this.raio = raio;
        this.direcao = 0;
    }
    update(){
        var movimentos = [];
        var movel = false;
        var count = 0;

        line(this.x,this.y,player.x,player.y);
        count++;

        if(mapa[int(this.y/20)][int((this.x)/20)+1] == 0 && this.y % 20 == 0) movimentos.push(39); 
        if(mapa[int(this.y/20)][int((this.x-1)/20)] == 0 && this.y % 20 == 0) movimentos.push(37);  
        if(mapa[int((this.y-1)/20)][int(this.x/20)] == 0 && this.x % 20 == 0) movimentos.push(38); 
        if(mapa[int((this.y)/20)+1][int(this.x/20)] == 0 && this.x % 20 == 0) movimentos.push(40);

        if(player.x > this.x && movimentos.indexOf(39) != -1){ this.direcao = 39; movel = true; } 
        if(player.x < this.x && movimentos.indexOf(37) != -1){ this.direcao = 37; movel = true; } 
        if(player.y < this.y && movimentos.indexOf(38) != -1){ this.direcao = 38; movel = true; } 
        if(player.y > this.y && movimentos.indexOf(40) != -1){ this.direcao = 40; movel = true; } 

        if(movel == false){
            if(player.x < this.x && movimentos.indexOf(39) != -1){ this.direcao = 39; movel = true; } 
            if(player.x > this.x && movimentos.indexOf(37) != -1){ this.direcao = 37; movel = true; } 
            if(player.y > this.y && movimentos.indexOf(38) != -1){ this.direcao = 38; movel = true; } 
            if(player.y < this.y && movimentos.indexOf(40) != -1){ this.direcao = 40; movel = true; } 
        }



        rect(this.x,this.y,20,20);
        switch(this.direcao){
            case 39: 
                this.x++;
                line(this.x,this.y,this.x+20,this.y);
            break;
            case 37: 
                this.x--;
                line(this.x,this.y,this.x-20,this.y);
            break;
            case 38: 
                this.y--;
                line(this.x,this.y-20,this.x,this.y);
            break;
            case 40: 
                this.y++;
                line(this.x,this.y+20,this.x,this.y);
            break;
        }
        console.log(this.direcao);
        ellipse(this.x,this.y,this.raio,this.raio);
    }
}

var player = new pacman(20,20,18,18);
var fantasma = new ghost(400,400,18,18);

function setup(){
    createCanvas(621,561);
}

function draw(){
    background(255);
    for(let i=0;i<mapa.length;i++)
        for(let j=0;j<mapa[i].length;j++)
            if(mapa[j][i] == 1) rect(i*20,j*20,20,20);
    
    player.update();
    fantasma.update();
}