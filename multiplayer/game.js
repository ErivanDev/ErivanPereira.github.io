(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAcm34uIPCDcUQqbWWzU_YT370gSJYdCCI",
        authDomain: "bubble-friends-a26a8.firebaseapp.com",
        databaseURL: "https://bubble-friends-a26a8.firebaseio.com",
        projectId: "bubble-friends-a26a8",
        storageBucket: "",
        messagingSenderId: "539801767031"
    };
    
    firebase.initializeApp(config);

    console.log(firebase);

    const database = firebase.database();
    const auth = firebase.auth();

    var user = undefined;
    var players = {};

    var provider = new firebase.auth.GoogleAuthProvider();
    
    const login = function(){
        auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            user = result.user;
            console.log(user);
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

        var player = database.ref('gameOne/player/'+ auth.currentUser.uid);
        var time = database.ref('gameOne/time');

        console.log( auth.currentUser );
        player.set({
            username: auth.currentUser.displayName,
            dados: 0,
        });
        time.set({
            valor: 0
        });
        
        player.onDisconnect().update({});
    }

    //VEZ DE CADA JOGADOR
    //https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
    /*function toggleStar(postRef, uid) {
        postRef.transaction(function(post) {
            if (post) {
            if (post.stars && post.stars[uid]) {
                post.starCount--;
                post.stars[uid] = null;
            } else {
                post.starCount++;
                if (!post.stars) {
                post.stars = {};
                }
                post.stars[uid] = true;
            }
            }
            return post;
        });
    }*/

    const sender = function(){
        var player = database.ref('gameOne/player/'+ auth.currentUser.uid);
        var time = database.ref('gameOne/time');
        var newData;
        var vez;

        time.on('value',function(tempo){
            vez = tempo.val().valor;
        });

        if(vez % 4 == idNumber){
            player.on('value',function(data){
                newData = data.val().dados;
                //console.log(data.val().dados);
            });

            player.set({
                username: auth.currentUser.displayName,
                dados: newData + Math.ceil(Math.random() * 6)
            });

            time.transaction(function(tempo){
                tempo.valor++;
                return tempo;
            });
        }
        else{
            alert("Não é sua vez");
        }
    }

    var idNumber;

    const recieve = function(){
        var player = database.ref('gameOne/player');
        //var time = database.ref('gameOne/time');

        player.on('value',function(data){
            var key = Object.keys( data.val() || {} );
            for(i in key){
                players[ key[i] ] = { x: data.val()[ key[i] ].dados, name: data.val()[ key[i] ].username }; 
                if( key[i] == auth.currentUser.uid ) idNumber = i; //console.log(true);
                //console.log(data.val()[ key[i] ].dados);
            }
        })
    }();

    $(document).ready(function(){
        $("#dados").click(function(){
            sender();
        });
        $("#login").click(function(){
            login();
        });
    });
    
    const myp5 = new p5(
        function(){
            this.img;
            this.x = 100; 
            this.y = 100;

            this.setup = function(){
                this.createCanvas(600,600)
                    .parent("game");
                this.img = this.loadImage("jogoimobiliiario.png");
            }

            var cores = [[0,255,255],[255,0,255],[255,255,0],[0,255,0]];

            this.draw = function(){
                this.background(0);
                this.image(this.img,0,0,this.img.width/2,this.img.height/2);
                var key = Object.keys(players);
                for(i in key){
                    if(players[ key[i] ].x != undefined){ 
                        var pontos = players[ key[i] ].x % 40;
                        var posicoes = {x: 0, y: 0};
                        if(pontos <= 10) posicoes = {x: pontos, y: 0};
                        if(pontos > 10 && pontos <= 20) posicoes = {x: 10, y: pontos - 10};
                        if(pontos > 20 && pontos <= 30) posicoes = {x: 30 - pontos, y: 10};
                        if(pontos > 30 && pontos <= 40) posicoes = {x: 0 , y: 40 - pontos};
                        //console.log(x);
                        this.fill(cores[i][0],cores[i][1],cores[i][2]);
                        this.ellipse(50 + posicoes.x * 50,50 + posicoes.y * 50,20,20);
                    }
                }
            }
        }
    )
}())

var firebase = null;