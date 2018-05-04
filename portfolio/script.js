var slideIndex = 1;
showDivs();

// Initialize Firebase
var config = {
apiKey: "AIzaSyBUEyZjByOpXYFDP_XAfTbplaiW0kbaWm4",
authDomain: "projetos-5adf2.firebaseapp.com",
databaseURL: "https://projetos-5adf2.firebaseio.com",
projectId: "projetos-5adf2",
storageBucket: "projetos-5adf2.appspot.com",
messagingSenderId: "771078876627"
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      uid = user.uid;
      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
});
  
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

function scroll(index){
    window.scrollTo(0,document.getElementById("main").children[0].offsetTop);
}

function criarProjetos(){
    var cont = 0;
    for(var i=1;i<5;i++){
        for(var j=0;j<4;j++){
            var divExterna = document.createElement('div');
            divExterna.setAttribute("class","projetos");
            divExterna.setAttribute("onmouseout","tirar('controles')");
            divExterna.setAttribute("style","position:relative; overflow: auto; text-align:center;");
            
            var divInterna = document.createElement('div');
            divInterna.setAttribute("class","controles");
            
            var buttonLike = document.createElement('button');
            buttonLike.setAttribute("class","like count");

            var buttonDeslike = document.createElement('button');
            buttonDeslike.setAttribute("class","deslike count");

            var spanLike = document.createElement('span');
            spanLike.setAttribute("class","valor");
            spanLike.setAttribute("id","valorlike-"+ cont);            
            spanLike.innerHTML = "0";

            var spanDeslike = document.createElement('span');
            spanDeslike.setAttribute("class","valor");
            spanDeslike.setAttribute("id","valordeslike-"+ cont);            
            spanDeslike.innerHTML = "0";

            var iLike = document.createElement('i');
            iLike.setAttribute("class","fa fa-thumbs-o-up");
            iLike.setAttribute("style","color:green");
            var iDeslike = document.createElement('i');
            iDeslike.setAttribute("class","fa fa-thumbs-o-down");
            iDeslike.setAttribute("style","color:red");

            buttonLike.appendChild(spanLike);
            buttonDeslike.appendChild(spanDeslike);

            buttonLike.appendChild(iLike);
            buttonDeslike.appendChild(iDeslike);

            buttonLike.setAttribute("onClick","curtir("+ cont +")");
            buttonDeslike.setAttribute("onClick","descurtir("+ cont +")");

            divInterna.appendChild(buttonLike);
            divInterna.appendChild(buttonDeslike);
            
            var imagem = document.createElement('img');
            imagem.setAttribute("width", "100%");
            imagem.setAttribute("height", Math.floor(Math.random() * 50 + 80));
            imagem.setAttribute("src", "imagens/woman.png");

            divExterna.appendChild(divInterna);
            divExterna.appendChild(imagem);

            document.getElementById("parte-" + i).appendChild(divExterna);

            cont++;
        }
    }
}

function curtir(n){
    var database = firebase.database();
    firebase.database().ref(n +'/like/'+ uid).set({
        data: true
    });
}

function descurtir(n){
    var database = firebase.database();
    firebase.database().ref(n +'/deslike/'+ uid).set({
        data: true
    });
}

firebase.database().ref().on('value', function(snapshot){
    var objs = snapshot.val();
    var keys = Object.keys(objs);
    for(i in keys){
        var like = Object.keys(objs["0"].like);
        document.getElementById("valorlike-"+ keys[i] ).innerHTML = like.length;
        
        var deslike = Object.keys(objs["0"].deslike);
        document.getElementById("valordeslike-"+ keys[i] ).innerHTML = deslike.length;
    }
});