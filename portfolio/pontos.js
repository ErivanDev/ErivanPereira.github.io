var icons = [];
var person;

function setup(){
    var canvas = createCanvas(325, 500);
    canvas.parent("canvas");
    canvas.id("banner-canvas");
    document.getElementById("banner-canvas").style.width = "100%";
    document.getElementById("banner-canvas").style.height = "100%";
    var requestURL = 'new.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    grupo = [];
    for(var i=0;i<255;i++) grupo.push(new group(i)); 
    request.onload = function(){
        var p = request.response;
        for(var i = 0; i<p.length; i++) grupo[p[i].cor].children.push(new points(p[i].x*5,p[i].y*5,p[i].cor));
    }
    noStroke();
}

function draw(){
    background(255);
    for(var i=0; i<grupo.length; i++) grupo[i].update();
    //console.log(cont);
}

function group(cor){
    this.children = [];
    this.cor = cor;
    this.update = function(){
        fill(this.cor);
        for(var i=0;i<this.children.length;i++){
            this.children[i].update();
        }
    }
}

function points(x,y,cor){
    this.x = x;
    this.y = y;
    this.cor = cor;
    this.xinicial = x;
    this.yinicial = y;
    this.update = function(){
        //cont++;
        var distancia = dist(mouseX,mouseY,this.x,this.y);
        if(distancia <=50){ 
            var t = coordenadasTan(this.x,this.y);
            this.x -= Math.cos(t) * (100 - distancia)/2; 
            this.y -= Math.sin(t) * (100 - distancia)/2;
        }
        else{
            this.x = (this.x + this.xinicial)/2; 
            this.y = (this.y + this.yinicial)/2; 
        }
        rect(this.x,this.y,5,5);
    }
}

function coordenadasTan(x,y){
    var yy = mouseY-y;
    var xx = mouseX-x;
    if (xx != 0){
        t = Math.atan(yy/xx);
        if (xx<0) t+=PI;
        else if (xx>0 && yy<0) t+=TWO_PI;
    }
    return t;
}