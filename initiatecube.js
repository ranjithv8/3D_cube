var scene,renderer,camera;

function Rubiks(screen){


	var cube,materials=[],cubeWithMaterial,rubiks=[[[],[],[]],[[],[],[]],[[],[],[]]];
	var pointLight;
	var lastTime=0,angularSpeed=0.2;
	var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight,
	CUBEHEIGHT= 40,
	CUBEWIDTH = 40,
	CUBEDEPTH = 40;
	CAMERARADIUS=300;
	var unitX,unitY;

	function init(){
		camera   = new THREE.PerspectiveCamera(45,WIDTH/HEIGHT,0.1,10000);
		scene    = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();

		renderer.setSize(WIDTH, HEIGHT);
	
		camera.position.z = CAMERARADIUS;
	
		scene.add(camera);
	
		pointLight1 = new THREE.PointLight(0xFFFFFF);
		pointLight2 = new THREE.PointLight(0xFFFFFF);

		pointLight1.position.z = 400;
		pointLight1.position.x = 400;
		pointLight1.position.y = 400;
		pointLight2.position.z = -400;
		pointLight2.position.x = -400;
		pointLight2.position.y = -400;
		
		scene.add(pointLight1);
		scene.add(pointLight2);
	
		$(screen).append(renderer.domElement);
		eventBinding(screen+" canvas");
	}

	function createACube(){

		var green =	new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('green.png')});
		var	orange = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('orange.png')});
		var	red	= new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('red.png')});
		var	blue = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('blue.png')});
		var	yellow = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('yellow.png')});
		var	white =	new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('white.png')}); 
	
		var materials1=[red, blue,orange,yellow,green,white];
	
		cube=new THREE.CubeGeometry(CUBEHEIGHT,CUBEWIDTH,CUBEDEPTH);
		cube.faces[0].materialIndex = 0;
		cube.faces[1].materialIndex = 1;
		cube.faces[2].materialIndex = 2;
		cube.faces[3].materialIndex = 3;
		cube.faces[4].materialIndex = 4;
		cube.faces[5].materialIndex = 5;
		var cubeMaterial=new THREE.MeshFaceMaterial(materials1);
		cubeWithMaterial=new THREE.Mesh(cube,cubeMaterial);
		return cubeWithMaterial;
	} 

	function drawRubik(){

		
		for(var i=0;i<3;i++)
			for(var j=0;j<3;j++)
				for(var k=0;k<3;k++){
					rubiks[i][j][k] = createACube();
					rubiks[i][j][k].position.set((i-1)*40,(j-1)*40,(k-1)*40);
					scene.add(rubiks[i][j][k]);
				}
		renderer.render(scene,camera);
	}


	/*function rotateXLayer(index,shift){
	
	}

	function rotateYLayer(index,shift){
	
	}

	function rotateZLayer(index,shift){

	}

	function setUnitShift(cameraDistance,objectDistance){
		var theta = Math.atan(1/cameraDistance);
		unitX = objectDistance * Math.sin(theta);
		unitY = objectDistancc * (1-Math.cos(theta));
	}*/

	function rotateACube(cube,x,y,z){
		cube.rotation.x+=x;
		cube.rotation.y+=y;
		cube.rotation.z+=z;
	}	

	function eventBinding(rubikScreen){

		$(rubikScreen).bind('mousewheel',function(e,d){
			if(d > 0){
				camera.position.z -= 10;
				
			}else{
				camera.position.z += 10;
			}
			CAMERARADIUS=camera.position.z;
			renderer.render(scene,camera);
		});
	
		/*$(rubikScreen).on("mousedown",function(e){
			var prevX=e.pageX;
			var prevY=e.pageY;
			$(rubikScreen).on("mousemove",function(e){
				if((Math.floor(rubiks[0][1][2].rotation.x) == 6) || (Math.floor(rubiks[0][1][2].rotation.x) == -6)){
					rubiks[0][1][2].rotation.x=0;
				}else if(Math.abs(rubiks[0][1][2].rotation.x) > 1.57 && Math.abs(rubiks[0][1][2].rotation.x) < 4.71){
					rotateACube(rubiks[0][1][2],(e.pageY-prevY)/100,(prevX-e.pageX)/100,0);		
				}else{
					rotateACube(rubiks[0][1][2],(e.pageY-prevY)/100,(e.pageX-prevX)/100,0);		
				}	
				prevX=e.pageX;
				prevY=e.pageY;
				renderer.render(scene,camera);	
			});
		});

		$(rubikScreen).on("mouseup",function(){
			$(rubikScreen).unbind("mousemove");			
		});*/
	}
	init();
	drawRubik();
}