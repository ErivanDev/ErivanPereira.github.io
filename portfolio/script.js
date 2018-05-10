var slideIndex = 1;
showDivs();
  
var tituloGames = [
    ["Emoji Bubble",
     "Emoji Bubble é fruto de um trabalho da cadeira de Programação II do curso de SMD, onde o professor " +
     "pediu para os discentes criarem um Bubble Shoot, então o Bubble que desenvolvi leva os rostos dos queridos emojis."
    ],
    ["Jornada da Fé",
     "Jornada da Fé é um jogo desenvolvido com outros colegas na faculdade, onde conta a jornada " +
     "de um romeiro até a estatua do Padre Cicero."
    ],
    ["Fortaleza 2100",
     "Fortaleza 2100 é um jogo desenvolvido em equipe no segundo semestre, tendo como parceira a ong Verde Luz, " + 
     "que conta a historia de Luiza, jovem que tem como missão resolver alguns dos problemas ambientais."
    ]
];

function plusDivs(n){
    slideIndex = n;
    document.getElementById("tituloGame").innerHTML = tituloGames[slideIndex][0];
    document.getElementById("descricaoGame").innerHTML = tituloGames[slideIndex][1];
    showDivs();
}

function showDivs(){
    var x = document.getElementsByClassName("mySlides");
    if(slideIndex > x.length - 1) slideIndex = x.length - 1;   
    
    if(slideIndex < 0) slideIndex = 0;
    
    for(var i = 0; i < x.length; i++) x[slideIndex].className = "mySlides invisivel"; 
    
    if(x[slideIndex] != undefined) x[slideIndex].className = "mySlides ativo center"; //centraliza
    
    if(x[slideIndex-1] != undefined) x[slideIndex-1].className = "mySlides inativo left";
    else if(x[slideIndex+2] != undefined) x[slideIndex+2].className = "mySlides inativo left";

    if(x[slideIndex+1] != undefined) x[slideIndex+1].className = "mySlides inativo right";
    else if(x[slideIndex-2] != undefined) x[slideIndex-2].className = "mySlides inativo right";
}
