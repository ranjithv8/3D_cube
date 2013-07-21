var i=0,j=0,k=0,PI=3.14;
var theta,xshift,yshift,zshift;

$(window).on("mousedown",function(e){
	var prevX=e.pageX;
	var prevY=e.pageY;
	$(window).on("mousemove",function(e){
		camera.lookAt(scene.position);
		
		if(camera.position.x > CAMERARADIUS || camera.position.x < (-1*CAMERARADIUS))
			++i;
		if(i%2){
			
			camera.position.x+=	(e.pageX-prevX);
			
		}
		else{
			
			camera.position.x-=(e.pageX-prevX);
			
		}
		
		if(camera.position.y > CAMERARADIUS || camera.position.y < (-1*CAMERARADIUS))
			++j;
		if(j%2){
			
			camera.position.y-= (e.pageY-prevY);
		}
		else{
			
			camera.position.y+= (e.pageY-prevY);
		}
		
		
		
		theta = (Math.asin(camera.position.x/CAMERARADIUS))*(180/PI);
		zshift= CAMERARADIUS*(1-Math.cos(theta*(PI/180)));
		var phi = (Math.asin(camera.position.y/CAMERARADIUS))*(180/PI);
		zshift+= CAMERARADIUS*(1-Math.cos(phi*(PI/180)));
		
		if(camera.position.z > CAMERARADIUS || camera.position.z < (-1*CAMERARADIUS))
			++k;
		if(k%2){
			camera.position.z= CAMERARADIUS+zshift;
		}
		else{
			camera.position.z= CAMERARADIUS-zshift;
		}
		camera.lookAt(scene.position);
		prevX = e.pageX;
		prevY = e.pageY;
		console.log("x:"+camera.position.x+" y:"+camera.position.y+" z:"+camera.position.z +" theta:"+theta);
		renderer.render(scene,camera);
	});
});



$(window).on("mouseup",function(){
	$(window).unbind("mousemove");
			
});