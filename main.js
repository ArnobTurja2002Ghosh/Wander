import * as THREE from 'three';
import { Character } from './Character.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const orbitControls = new OrbitControls(camera, renderer.domElement);

// Create clock
const clock = new THREE.Clock();

// Create NPC
let npc = new Character(0xff0000);



// Setup our scene
function setup() {

	scene.background = new THREE.Color(0x88d5ff);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.y = 35;
	camera.lookAt(0,0,0);

	//Create Light
	let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	directionalLight.position.set(0, 5, 5);
	scene.add(directionalLight);

	// Helper functions
	scene.add(new THREE.AxesHelper(50));
	scene.add(new THREE.GridHelper(50, 50));

	// Add the NPCs to the scene
	scene.add(npc.gameObject);
	scene.add(npc.targetMesh);
	

	// First call to animate
	animate();
}


// animate
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	let deltaTime = clock.getDelta();


	// Update our two characters
	npc.update(deltaTime);


	// Update our orbit controls
	orbitControls.update();
}

setup();