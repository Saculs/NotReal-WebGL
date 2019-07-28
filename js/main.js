$(function () {

    // Set up the scene, camera, and renderer as global variables.
    var scene, camera, renderer;

    var logo;
    var tv;
    var skate;
    var cubee;
    var plane;

    var controls;

//var tween;

    var plane, numberOfVerticies;
    var currentWaveHeight = 10;
    var rowSize = 150;
    var maxHeight = 20;
    var t = 0.0;

    init();
    animate();

    function vertexShader() {
  return `
    varying vec3 vUv; 
    varying vec4 tvViewPosition; 
    varying vec3 vecNormal;

    void main() {
      vUv = position; 
      vec4 tvViewPosition = tvViewMatrix * vec4(position, 1.0);
      vecNormal = (tvViewMatrix * vec4(normal, 0.0)).xyz; //????????
      gl_Position = projectionMatrix * tvViewPosition; 
    }
  `
}
function fragmentShader() {
  return `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
  `
}
    // Sets up the scene.
    function init() {

      // Create the scene and set the scene size.
      scene = new THREE.Scene();

      const color = "black";
      const density = 0.1;
      const near = 8;
      const far = 20;
      scene.fog = new THREE.Fog(color, near, far);

      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;

      // Create a renderer and add it to the DOM.
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(WIDTH, HEIGHT);  


      document.body.appendChild(renderer.domElement);

      // Create a camera, zoom it out from the tv a bit, and add it to the scene.
      camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.001, 20000);
      //camera.position.set(-3,6,0);
      //camera.position.set(-3,0,0);
      camera.position.set(-400,0,0);
      animateMove(camera.position,{x:-3,y:0,z:0});
      scene.add(camera);

      var example = document.getElementById('example');
      example.textContent="Virtual";

      var vimeo = document.getElementById('player');

      // Create an event listener that resizes the renderer with the browser window.
      window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
      });


      // initialize object to perform world/screen calculations
  var raycaster = new THREE.Raycaster(); 
  var mouse = new THREE.Vector2(), INTERSECTED;
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener('touchstart',onDocumentTouchStart,false)

   function onDocumentTouchStart(event){
     event.preventDefault();
     event.clientX = event.touches[0].clientX;
     event.clientY = event.touches[0].clientY;
     onDocumentMouseDown(event);
   }

function onDocumentMouseDown( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects(scene.children);
	
	if ( intersects.length > 0 )
	{
    clicker(intersects[ 0 ].object);
    animateMove(camera.position,{x: cubee.position.x - 2, y: cubee.position.y,z: cubee.position.z},cubee.position);
    $('.text').show();
    $('.popup').append("<div class='text'><p>TEEEEEEEEXT</p></div>");
    $('.popup').show();
	}
}

function onDocumentMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
  
  raycaster.setFromCamera( mouse, camera );
  var clickable = ["tv","flag", "skate", "cubee"];
  var intersects = raycaster.intersectObjects( scene.children, true );
  var canvas = document.body.getElementsByTagName('canvas')[0];
  if (intersects.length > 0 && clickable.includes(intersects[0].object.name)) {
    console.log(intersects[0].object.name);
    if(intersects[0].object.name == "tv"){
        tv.rotation.x += 0.005;
        tv.scale.set(0.0022,0.0022,0.0022);
        canvas.style.cursor = "pointer";
    }
            if(intersects[0].object.name == "skate" ){
              skate.rotation.x += 0.005;
              skate.scale.set(0.55,0.55,0.55);
              canvas.style.cursor = "pointer";
            }
            if(intersects[0].object.name == "flag"){
              plane.rotation.x += 0.005;
              plane.scale.set(0.022,0.022,0.022);
              canvas.style.cursor = "pointer";
            }
    } else {
      tv.scale.set(0.002,0.002,0.002);
      skate.scale.set(0.5,0.5,0.5);
      plane.scale.set(0.02,0.02,0.02);
      canvas.style.cursor = "default";
    }
}
function clicker(obj){
  console.log(obj);
    console.group('intersection');
	     console.log(obj.point);
  console.log(obj.rotation)
    console.groupEnd();
  
        //window.open('http://www.pericror.com/', '_blank');

  
  if(obj.active === true){
    obj.material.color.setRGB(0,1,0);
    obj.active = false;
  }
  else{
    obj.material.color.setRGB(1,0,0);
    obj.active = true;
  }
	obj.geometry.colorsNeedUpdate = true;
}

function animateScale(vectorToAnimate, target, options){
  console.log("animating");
    var speed = 200;
    // create the tween
    var tween = new TWEEN.Tween(vectorToAnimate).to(target, 2000)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onComplete(function(){
          setTimeout(function() {
            logo.visible = false;
            //example.style.visibility = 'visible';
            setTimeout(function() {
              example.style.visibility = 'visible';
              example.innerHTML="Augmented";
              setTimeout(function() {
                example.innerHTML="Motion";
                setTimeout(function() {
                  example.innerHTML="AI";
                  setTimeout(function() {
                    example.innerHTML="PR";
                    setTimeout(function() {
                      example.innerHTML="Creative";
                      setTimeout(function() {
                        example.innerHTML="something";
                        setTimeout(function() {
                          example.innerHTML="";
                            plane.visible = true;
                            tv.visible = true;
                            skate.visible = true;
                        }, speed);
                      }, speed);
                    }, speed);
                  }, speed);
                }, speed);
              }, speed);
            }, 200);
          }, 4000);
        });
        tween.onUpdate(function(){
          logo.scale.x = vectorToAnimate.x;
    logo.scale.y = vectorToAnimate.y;
    logo.scale.z = vectorToAnimate.z;

});
    // start the tween
    tween.start();
}

function animateMove(vectorToAnimate, target, lookAt){
  console.log("animating");
    // create the tween
    var tween = new TWEEN.Tween(vectorToAnimate).to(target, 4000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(function(){
          console.log('done');
        });
        tween.onUpdate(function(){
          console.log("tween update ", vectorToAnimate);
          camera.position.x = vectorToAnimate.x;
          camera.position.y = vectorToAnimate.y;
          camera.position.z = vectorToAnimate.z;
        if(lookAt){
            controls.target = {x:vectorToAnimate.x +2,y: vectorToAnimate.y,z:vectorToAnimate.z};
          }
        });
        /*
        if(lookAt){
      var vec = camera.lookAt;
      var tween2 = new TWEEN.Tween(vec).to(lookAt, 4000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(function(){
          console.log('done');
        });
        tween2.onUpdate(function(){
          //console.log(camera.lookAt,vec);
          //camera.lookAt(vec);
          controls.target = vec;
        });
        tween2.start(); 
      }*/
       // start the tween
  tween.start();
}

function scroll(e){
  console.log(camera.position.y);
  if(e < 0 && camera.position.y >-1 && camera.position.y < 1){
      animateMove(camera.position,{x: -3 , y: /*camera.position.y*/ - 8,z: 0},{x:0,y:-8,z:0});
    }
    else if(camera.position.y < 0){
      animateMove(camera.position,{x: -3, y: 0, z: 0},{x:0,y:0,z:0});
    }
    else if(e < 0 && camera.position.y > 1){
      animateMove(camera.position,{x: -3, y: 0, z: 0},{x:0,y:0,z:0});
    }
}

window.addEventListener("wheel", function(e) {
  var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  scroll(delta);
  
  console.log("scrolled "+ delta.toString());
  //camera.position.y += event.wheelDeltaY * 0.1;;
}, true);
        
//Space background is a large sphere
var spacetex = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/space.jpg");
  var spacesphereGeo = new THREE.SphereGeometry(15,15,15);
  var spacesphereMat = new THREE.MeshPhongMaterial();
  spacesphereMat.map = spacetex;

  var spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);
  
  //spacesphere needs to be double sided as the camera is within the spacesphere
  spacesphere.material.side = THREE.DoubleSide;
  
  spacesphere.material.map.wrapS = THREE.RepeatWrapping; 
  spacesphere.material.map.wrapT = THREE.RepeatWrapping;
  spacesphere.material.map.repeat.set( 5, 3);
  
  scene.add(spacesphere);


        let uniforms = {
        colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
        colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
    }
        let material =  new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  });


        var envMap = new THREE.TextureLoader().load('models/envMap.jpg');
        let vlajkaMat =  new THREE.MeshLambertMaterial({ map : envMap});
        plane = new THREE.Mesh(new THREE.PlaneGeometry(150, 200, rowSize, rowSize), vlajkaMat);
        plane.scale.set(0.02,0.02,0.02);
        plane.rotation.y = getRadian(-90);
        plane.rotation.z = getRadian(90);
        plane.position.set(10,3,-4);
        plane.name = "flag";
        plane.visible = false;
        numberOfVerticies = plane.geometry.vertices.length;
        initPlane();
        scene.add(plane);

        function initPlane() {
        
        for(var j = 0; j < rowSize+1; j++) {
            for(var i = 0; i < rowSize+1; i++) {
                //plane.geometry.vertices[(rowSize+1)*j + i].z = maxHeight-j%maxHeight;
                plane.geometry.vertices[(rowSize+1)*j + i].z = maxHeight*Math.sin(j/rowSize*3);
            }
        }
        
        }
        function getRadian(x) {
        return (Math.PI*x)/180;
    }

      // Set the background color of the scene.
      //renderer.setClearColorHex(0x333F47, 1);

      // Create a light, set its position, and add it to the scene.
      var light = new THREE.PointLight(0xffffff);
      light.position.set(-100,200,100);
      scene.add(light);

      var light2 = new THREE.PointLight(0xffffff);
      light2.position.set(4.6,1.8,2);
      scene.add(light2);

      var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
      var mater = new THREE.MeshBasicMaterial( {color: 0xffffff} );
      var cube = new THREE.Mesh( geometry, mater);
      //scene.add( cube );

      let ambientLight = new THREE.AmbientLight(0x505050);
      scene.add(ambientLight);

      var materiall = new THREE.MeshPhongMaterial({color: 0xffffff, roughness: 0,flatShading:true});


      // Load in the mesh and add it to the scene.
      var loader = new THREE.GLTFLoader();
      loader.load( "models/TV.glb", function(gltf){
        //var material = new THREE.MeshLambertMaterial({color: 0x55B663});
        //mesh = new THREE.Mesh(geometry, material);
        tv = gltf.scene;
        tv.rotation.x = 90;
        tv.rotation.z = 30.4;
        tv.rotation.y = 155.4;
        tv.scale.set(0.002,0.002,0.002);
        tv.position.set(4,1.2,2.5);
        tv.name="tv";
        tv.visible = false;
        tv.callback = function() { console.log("Hello world!");};
        tv.traverse(function (o) {
          if (o.isMesh) {
            o.name = "tv";
          }
        });
        scene.add(tv);
      });
      
      // Load in the mesh and add it to the scene.
      var loaderSkate = new THREE.GLTFLoader();
      loader.load( "models/skate.glb", function(gltf){
        //var material = new THREE.MeshLambertMaterial({color: 0x55B663});
        //mesh = new THREE.Mesh(geometry, material);
        skate = gltf.scene;
        skate.rotation.x = 180;
        skate.rotation.z = 45;
        skate.rotation.y = 90;
        skate.scale.set(0.5,0.5,0.5);
        skate.position.set(5,1.2,-2.5);
        skate.visible = false;
        //skate.callback = function() { console.log("Hello world!");};
        skate.traverse(function (o) {
          if (o.isMesh) {
            o.name = "skate";
          }
        });
        scene.add(skate);
      });

      var loaderLogo = new THREE.GLTFLoader();
      loaderLogo.load( "models/notReal.glb", function(gltf){
        logo = gltf.scene;
        //logo.rotation.x += 90;
        //logo.rotation.z = 90;
        logo.rotation.y = 90;
        //logo.scale.set(-0.8,0.8,0.8);
        logo.scale.set(0,0.8,0.8);
        logo.position.set(1,0,-0.8);
        logo.traverse(function (o) {
    if (o.isMesh) {
     o.material = materiall;
    }
  });
        scene.add(logo);
        animateScale({x:0.8,y:0.8,z:0},{x:-0.8,y:0.8,z:0.8} );
      });

      var geometr = new THREE.BoxGeometry( 1, 1, 1 );
      var cubee = new THREE.Mesh( geometr, mater);
      cubee.position.set(4,1.2,2.5);
      cubee.callback = function() { console.log("Hello world!");};
      cubee.name = "cubee";
      //cubee.visible = false;
      scene.add(cubee);

      var geoGround = new THREE.PlaneBufferGeometry( 100,100 );
      var ground = new THREE.Mesh( geoGround, new THREE.MeshPhongMaterial({color:"white",wireframe:true, }));
      ground.rotation.z = Math.PI/180 * -45;
      ground.rotation.x = Math.PI/180 * -90;
      ground.position.y=-0.5;
      //scene.add(ground);

      // Add OrbitControls so that we can pan around with the mouse.
      controls = new THREE.OrbitControls(camera, renderer.domElement);

    }
    // Renders the scene and updates the render as needed.
    function animate() {

      // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
      requestAnimationFrame(animate);
      if(tv) tv.rotation.z += 0.001;
      if(tv) tv.rotation.y += 0.0001;
      if(tv) tv.position.y = -0.2*Math.sin(t*0.01) + 1.5;


      if(skate){ skate.rotation.z += 0.001;
      skate.rotation.y += 0.0001;
       skate.position.z = -7*Math.sin(t*0.001);
       skate.position.y = -3*Math.sin(t*0.0005) - 1.5;
      }

      if(plane){ plane.rotation.z += 0.001;
      }


      for(var j = 0; j < rowSize+1; j++) {
            for(var i = 0; i < rowSize+1; i++) {
                plane.geometry.vertices[(rowSize+1)*j + i].z = maxHeight*Math.sin(j/rowSize*3 + t*.05);
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight/5*Math.sin(j/rowSize*12 + t*0.04);
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight/13*Math.cos(j/rowSize*18 + t*0.2);
                
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight*Math.cos(i/rowSize*3 + t*.05);
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight/5*Math.cos(i/rowSize*12 + t*0.04);
                plane.geometry.vertices[(rowSize+1)*j + i].z += maxHeight/13*Math.sin(i/rowSize*18 + t*0.2);
            }
        }
        t+=0.55;
        
        plane.geometry.verticesNeedUpdate = true;



        TWEEN.update();
      // Render the scene.
      renderer.render(scene, camera);
      controls.update();

    }
});