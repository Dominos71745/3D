import * as THREE from "three";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader(); // Define a new loader
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Define a new renderer

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
        object.position.y = -0.3;
        let cameras = gltf.cameras;
        scene.add(object);

        if (cameras && cameras.length > 0) {
            cameras.forEach(function (loadedCamera) {
                console.log("Camera found:", camera);
                camera = loadedCamera;
            });
        }

        controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
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
document.getElementById("container3D").addEventListener("mousemove", function (event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
});

renderer.shadowMap.enabled = true; // Enable shadow rendering in the renderer

function animate() {
    requestAnimationFrame(animate);
    if (isMouseClicked) {
        // Obliczamy różnicę kąta obrotu na podstawie pozycji myszy
        let targetRotationX = (mouseY / window.innerHeight) * Math.PI * 2;
        let targetRotationY = (mouseX / window.innerWidth) * Math.PI * 2;

        // Obracamy obiekt w kierunku docelowego obrotu
        object.rotation.x += (targetRotationX - object.rotation.x) * 0.05;
        object.rotation.y += (targetRotationY - object.rotation.y) * 0.05;
    }
    renderer.render(scene, camera);
}

animate();
