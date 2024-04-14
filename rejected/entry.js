import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// Log all imported modules
Object.keys(window)
  .filter(key => /^three/i.test(key)) // Filter modules with names starting with 'THREE'
  .forEach(key => console.log(key));

var scene = new THREE.Scene();

var containerStyle = getComputedStyle(
  document.getElementById("model-container"),
  null
);
var SCREEN_HEIGHT = parseInt(containerStyle.getPropertyValue("height")),
  SCREEN_WIDTH = parseInt(containerStyle.getPropertyValue("width"));

var camera = new THREE.PerspectiveCamera(
  75,
  SCREEN_WIDTH / SCREEN_HEIGHT,
  0.1,
  1000
);
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(SCREEN_WIDTH - 5, SCREEN_HEIGHT);
// renderer.setSize(600,600);
document
  .getElementById("model-container")
  .appendChild(renderer.domElement);

// var controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(
  new THREE.Color("hsl(30, 100%, 75%)"),
  1.0
);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(
  new THREE.Color("hsl(240, 100%, 75%)"),
  0.75
);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath(
  "assets/object/dc46c6a5-53dc-449a-8225-f3ce4a9a79f6/"
);
mtlLoader.setPath("assets/object/dc46c6a5-53dc-449a-8225-f3ce4a9a79f6/");
mtlLoader.load(
  "dc46c6a5-53dc-449a-8225-f3ce4a9a79f6.mtl/",
  function (materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(
      "assets/object/dc46c6a5-53dc-449a-8225-f3ce4a9a79f6/"
    );
    objLoader.load(
      "dc46c6a5-53dc-449a-8225-f3ce4a9a79f6.obj",
      function (object) {
        console.log("successfully load thing");
        scene.add(object);
        object.position.y -= 60;
      }
    );
  }
);
// var objLoader = new THREE.OBJLoader();
// objLoader.setMaterials(materials);
// objLoader.setPath("assets/object/");
// objLoader.load(
//   "dc46c6a5-53dc-449a-8225-f3ce4a9a79f6.obj",
//   function (object) {
//     scene.add(object);
//     object.position.y -= 60;
//   }
// );

var animate = function () {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
};

animate();