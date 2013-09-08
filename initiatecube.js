var scene,renderer,camera;

(function($,THREE){
	var WIDTH,HEIGHT,CUBEHEIGHT,CUBEWIDTH,CUBEDEPTH;
	var pointLight = [];
	var rubiks=[[[],[],[]],[[],[],[]],[[],[],[]]];
	var lastTime=0,angularSpeed=0.2;
	var unitX,unitY;
	var contentSpace;

	Rubiks = function(config){
		if ("contentSpace" in config){
			contentSpace = config['contentSpace'];
		}else{
			console.error("contentSpace parameter is mandatory");
			return;
		}
		WIDTH = config['width'] || 400;
		HEIGHT = config['width'] || 400;
		CUBEHEIGHT= config['cubeHeight'] || 40;
		CUBEWIDTH = config['cubeWidth'] || 40;
		CUBEDEPTH = config['cubeDepth'] || 40;
		CAMERARADIUS= config['cameraRadius'] || 300;

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
		init();
		drawRubik();
	};

	function createACube(){
		var textures = [];
		var materials = [];
		var cube=new THREE.CubeGeometry(CUBEHEIGHT,CUBEWIDTH,CUBEDEPTH);
		textures.push(new THREE.Texture(new gcanvas("green")));
		textures.push(new THREE.Texture(new gcanvas("orange")));
		textures.push(new THREE.Texture(new gcanvas("red")));
		textures.push(new THREE.Texture(new gcanvas("blue")));
		textures.push(new THREE.Texture(new gcanvas("yellow")));
		textures.push(new THREE.Texture(new gcanvas("white")));

		for (i=0;i<textures.length;i++){
			materials.push(new THREE.MeshLambertMaterial({map:textures[i]}));
			textures[i].needsUpdate = true;
		}

		var cubeMaterial=new THREE.MeshFaceMaterial(materials);
		var cubeWithMaterial=new THREE.Mesh(cube,cubeMaterial);
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

	function rotateACube(cube,x,y,z){
		cube.rotation.x+=x;
		cube.rotation.y+=y;
		cube.rotation.z+=z;
	}

	function init(){
		camera   = new THREE.PerspectiveCamera(45,WIDTH/HEIGHT,0.1,10000);
		scene    = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();

		renderer.setSize(WIDTH, HEIGHT);
	
		camera.position.z = CAMERARADIUS;
	
		scene.add(camera);
	
		pointLight.push(new THREE.PointLight(0xFFFFFF));
		pointLight.push(new THREE.PointLight(0xFFFFFF));

		pointLight[0].position.z = 400;
		pointLight[0].position.x = 400;
		pointLight[0].position.y = 400;
		pointLight[1].position.z = -400;
		pointLight[1].position.x = -400;
		pointLight[1].position.y = -400;
		
		scene.add(pointLight[0]);
		scene.add(pointLight[1]);
		$(contentSpace).append(renderer.domElement);
		eventBinding(contentSpace+" canvas");
	}

	function gcanvas(color){
		var canva = document.createElement("canvas");
		var context = canva.getContext("2d");
		canva.height=115;
		canva.width=115;
		context.fillStyle = color;
		context.lineWidth = "20";
		context.strokeStyle="black";
		context.rect(5,5,100,100);
		context.stroke();
		context.fill();
		return canva;
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
})(jQuery,THREE);