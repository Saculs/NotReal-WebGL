var archloader = new THREE.GLTFLoader();
  archloader.load( "models/arch.glb", function(gltf){
      arch = gltf.scene;
    //arch.rotation.x = 90;
    arch.rotation.z = 30.4;
    arch.rotation.y = 158.4;
    arch.scale.set(0.4,0.4,0.4);
    arch.position.set(2,0.2,-2.5);
    arch.name="arche";
    arch.visible = true;
    //arch.callback = function() { console.log("Hello world!");};
    arch.traverse(function (o) {
      if (o.isMesh) {
        o.name = "arch";
      }
    });
    scene.add(arch);
  });

  if(arch){ arch.rotation.z += 0.001;
    arch.rotation.y += 0.0001;
    }