import * as THREE from "three";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader(); // Define a new loader
const renderer = new THREE.WebGLRenderer(); // Define a new renderer

const scene = new THREE.Scene(); // Define a new scene
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); // Define a new camera
renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the renderer
document.body.appendChild(renderer.domElement); // Add the renderer to the DOM

let object;

let controls;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let isMouseClicked = false;

document.getElementById("container3D").addEventListener("click", function () {
    isMouseClicked = true;
});

document.getElementById("container3D").addEventListener("click", function () {
    isMouseClicked = false;
});

loader.load(
    "models/desk/scene.gltf",
    function (gltf) {
        object = gltf.scene;
        object.position.y = -1;
        let cameras = gltf.cameras;
        scene.add(object);
        // You can now access the cameras and lights if they are present
        if (cameras && cameras.length > 0) {
            // Cameras are available, you can iterate over them if needed
            cameras.forEach(function (loadedCamera) {
                // Do something with each camera
                console.log("Camera found:", camera);
                camera = loadedCamera;
            });
        }
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
        console.error(error);
    }
);

document.getElementById("container3D").appendChild(renderer.domElement); // Add the renderer to the DOM

renderer.shadowMap.enabled = true; // Enable shadow rendering in the renderer

function animate() {
    requestAnimationFrame(animate);
    if (isMouseClicked) {
        object.rotation.y = -2 + (mouseX / window.innerWidth) * 3;
        object.rotation.x = -0.9 + (mouseY * 2.5) / window.innerHeight;
    }
    renderer.render(scene, camera);
}

animate();
