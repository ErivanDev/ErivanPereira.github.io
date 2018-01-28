var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );
var clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth * 0.6, window.innerHeight * 0.6);
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube;
//new THREE.Mesh( geometry, material );

var android;
// the following code is from
//    http://catchvar.com/threejs-animating-blender-models
var animOffset      = 0,   // starting frame of animation
	walking         = false,
	duration        = 1000, // milliseconds to complete animation
	keyframes       = 20,   // total number of animation frames
	interpolation   = duration / keyframes, // milliseconds per frame
	lastKeyframe    = 0,    // previous keyframe
	currentKeyframe = 0;

//scene.add( cube );
var x = 6;

var keyboard = new THREEx.KeyboardState();
var angulo = 0;
var area = [[1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
    	    [1,0,0,0,0,0,0,0,0,1],
    	    [1,0,0,0,0,0,0,0,0,1],
    	    [1,0,0,0,0,0,0,0,0,1],
    	    [1,0,0,0,0,0,0,0,0,1],
   	        [1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]];

var blocks = [];

var init = function(){
	scene.background = new THREE.Color( 0x0000FF );
	var geometr = new THREE.BoxGeometry( 320, -2, 320 );
	var materia = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
	var chao = new THREE.Mesh( geometr, materia );

	blocks.push( chao );
	scene.add( chao );

	var ambientLight = new THREE.AmbientLight( 0xffffff, 0.7 );
    scene.add( ambientLight );

	carregar( "Tree low.mtl", "Tree low.obj", 64, 32, 1);
	carregar( "lowpolytree.mtl", "lowpolytree.obj", 40, 200, 20);
	carregar( "low-poly-mill.mtl", "low-poly-mill.obj", 100, 200, 2);

	var jsonLoader = new THREE.JSONLoader();
	jsonLoader.load( "android-animations.js", addModelToScene );

	for(var i=0;i<area.length;i++)
		for(var j=0;j<area[i].length;j++)
			if(area[i][j] == 1){
				var forma = new THREE.BoxGeometry( 32, 32, 32 );
				var textura = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
				var bloco = new THREE.Mesh( forma, textura );
				bloco.position.x = (j - 5) * 32 + 16;
				bloco.position.z = (i - 5) * 32 + 16;
				bloco.position.y = 16;
				blocks.push( bloco );
				scene.add( bloco );
			}
}

var contador = [];

var move = function () {
	var delta = clock.getDelta(); // seconds
	var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
	var moveDistance = (32*4) * delta; // 4 pixel per second	
	var aux = 0;

	cube.vetor = new THREE.Vector3(cube.position.x,cube.position.y - cube.vspeed * delta,cube.position.z);
	
	if(colission(cube,blocks)){  
		cube.position.y += cube.vspeed * delta;
		cube.vspeed -= cube.gravidade * delta;
	}
	else{
		cube.vspeed = 0;
	}

	cube.vetor = new THREE.Vector3(cube.position.x,cube.position.y - cube.vspeed * delta,cube.position.z);

	if(keyboard.pressed("space") && !colission(cube,blocks)){
		cube.vspeed += 180; 
	}
	if ( keyboard.pressed("left") ) angulo += rotateAngle;
	if ( keyboard.pressed("right") ) angulo -= rotateAngle;
	if ( keyboard.pressed("up") ){

		var movel = false;
		var auxY = 0;
		while(auxY <= 12 && movel == false){ 

			cube.vetor = new THREE.Vector3(cube.position.x,cube.position.y - auxY,cube.position.z - Math.cos(angulo)*moveDistance);
			if(colission(cube,blocks)){ 
				cube.position.z += Math.cos(angulo)*moveDistance; 
				movel = true;
			}

			cube.vetor = new THREE.Vector3(cube.position.x - Math.sin(angulo)*moveDistance,cube.position.y - auxY,cube.position.z);
			if(colission(cube,blocks)){ 
				cube.position.x += Math.sin(angulo)*moveDistance; 
				movel = true;
			}

			if(movel) cube.position.y += auxY; 

			auxY+=4;
		}

	}
	if ( keyboard.pressed("down") ){

		var movel = false;
		var auxY = 0;
		while(auxY <= 12 && movel == false){

			cube.vetor = new THREE.Vector3(cube.position.x,cube.position.y - auxY,cube.position.z + Math.cos(angulo)*moveDistance);
			if(colission(cube,blocks)){ 
				cube.position.z -= Math.cos(angulo)*moveDistance; 
				movel = true;
			}

			cube.vetor = new THREE.Vector3(cube.position.x + Math.sin(angulo)*moveDistance,cube.position.y - auxY,cube.position.z);
			if(colission(cube,blocks)){ 
				cube.position.x -= Math.sin(angulo)*moveDistance; 
				movel = true;
			}

			if(movel) cube.position.y += auxY; 

			auxY+=4;

		}

	}
	
	android.position.x = cube.position.x;
	android.position.y = cube.position.y - 16;
	android.position.z = cube.position.z;
	android.rotation.y = angulo;

	cube.rotation.y = angulo;
};

var animate = function () {
	requestAnimationFrame(animate);
	if ( cube && android ){ // exists / is loaded
		move();
		// Alternate morph targets

			time = new Date().getTime() % duration;
			keyframe = Math.floor( time / interpolation ) + animOffset;
			if ( keyframe != currentKeyframe ) {
				android.morphTargetInfluences[ lastKeyframe ] = 0;
				android.morphTargetInfluences[ currentKeyframe ] = 1;
				android.morphTargetInfluences[ keyframe ] = 0;
				lastKeyframe = currentKeyframe;
				currentKeyframe = keyframe;
			}
			android.morphTargetInfluences[ keyframe ] = ( time % interpolation ) / interpolation;
			android.morphTargetInfluences[ lastKeyframe ] = 1 - android.morphTargetInfluences[ keyframe ];
	

		var relativeCameraOffset = new THREE.Vector3(0,160,-160);
		var cameraOffset = relativeCameraOffset.applyMatrix4( cube.matrixWorld );
	
		camera.position.x = cameraOffset.x;
		camera.position.y = cameraOffset.y;
		camera.position.z = cameraOffset.z;
		camera.lookAt(cube.position);
		renderer.render(scene, camera);
	}
};

function colission(objum,objdois){
    var pode = true;
	var originPoint = objum.position.clone();
	
	for (var vertexIndex = 0; vertexIndex < objum.geometry.vertices.length; vertexIndex++)
	{		
		var localVertex = objum.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( objum.matrix );
		var directionVector = globalVertex.sub( objum.vetor );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( objdois );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
			pode = false;
	}	

	return pode;
}

function addModelToScene( geometry, materials ){
	// for preparing animation;
	for (var i = 0; i < materials.length; i++)
		materials[i].morphTargets = true;
		
	var material = new THREE.MeshFaceMaterial( materials );
	android = new THREE.Mesh( geometry, material );
	android.scale.set(3,3,3);
	android.position.y = 0;
	scene.add( android );
	
	//geometry = new THREE.SphereGeometry( 32, 12, 12 );
    geometry = new THREE.CylinderGeometry( 12, 12, 32, 16 );
	material = new THREE.MeshFaceMaterial( { } ); // wireframe: true, transparent: true,
	cube = new THREE.Mesh( geometry, material );
	cube.position.y = 64;
	cube.pulo = false;
	cube.colidido = true;
    cube.gravidade = 400;
	cube.vspeed = 0;
	scene.add( cube );
}

function carregar( mtl , obj, x, z, vezes){
	var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

	var onError = function ( xhr ) { };

	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

	var mtlLoader = new THREE.MTLLoader();
		
	mtlLoader.load( mtl , function( materials ) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
			//objLoader.setPath( 'obj/male02/' );
		objLoader.load( obj , function ( object ) {
			object.scale.set(vezes,vezes,vezes);
			object.position.x = x;
			object.position.z = z;
			scene.add( object );
			for(var i=0 ; i<object.children.length; i++)
				blocks.push( object.children[i] );
		}, onProgress, onError );
	});
}

init();
animate();

/* colisao ponto com ponto 
var originPoint = cube.position.clone();
var voltar = false;

for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++){		
	var localVertex = cube.geometry.vertices[vertexIndex].clone();
	var globalVertex = localVertex.applyMatrix4( cube.matrix );
	var directionVector = globalVertex.sub( cube.position );
			
	var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
	var collisionResults = ray.intersectObjects( blocks );
	if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) voltar = true;
}
if(voltar) cube.position.x += Math.sin(angulo)*moveDistance;

for(var i=0;i<aux.length;i++){
        //if(aux[i] != me){
        //abaixo estÃƒÂ¡ uma soluÃƒÂ§ÃƒÂ£o criativa (-1)
            /*if(me.y + me.depth >= aux[i].y && me.y <= aux[i].y + aux[i].depth
			&& me.x + me.width >= aux[i].x && me.x <= aux[i].x + aux[i].width 
            && me.z + me.height >= aux[i].z && me.z <= aux[i].z + aux[i].height){
                pode = false;
            }*/
			//var originPoint = objum.position.clone();
		//	var voltar = false;*/
