import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createSkyBox } from './skybox';


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 40

//lightpoint
let light = new THREE.AmbientLight(0xffffff, .5);
scene.add(light);

let lightP = new THREE.PointLight(0xffffff, 1);
lightP.position.set(10, 100, 0);
scene.add(lightP);

//carregamento assets
let car;
const carJoystick = { x: null, y: null }
const modelPath = 'models/'
const mtlFile = '1377 Car.mtl'
const objFile = '1377 Car.obj'
const controls = new OrbitControls(camera, renderer.domElement)

const manager = new THREE.LoadingManager();
manager.onProgress = (item, loaded, total) => {
	console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

//SKYBOX
const skybox = await createSkyBox('dark', 1000)
// skybox.position.y = 300
scene.add(skybox)

mtlLoader.setPath(modelPath).load(mtlFile, handleMaterialLoaded)

function handleMaterialLoaded(materials) {
	materials.preload()
	objLoader.setMaterials(materials)
	objLoader.setPath(modelPath)
		.load(objFile, handleObjectLoaded)
}

function handleObjectLoaded(object) {
	car = object
	car.position.x = 0;
	car.position.y = 0;
	car.position.z = .1;
	car.rotateX(.5);
	car.scale.setScalar(.4);
	scene.add(car);
	animate();
}

let keys = []

window.addEventListener('keydown', event => {
	if ((
		event.key === 'w' ||
		event.key === 'a' ||
		event.key === 's' ||
		event.key === 'd' ||
		event.key === ' ' ||
		event.key === 'c'
	) && keys.indexOf(event.key) === -1) {
		keys.push(event.key)
	}
})

window.addEventListener('keyup', event => {
	let keyPos = keys.indexOf(event.key)
	keys.splice(keyPos, 1)
})

animate();

function animate() {
	controls.update();
	renderer.render(scene, camera)
	moveCar();
	requestAnimationFrame(animate)

	if (keys.indexOf('w') !== -1) {
		car.position.z -= .5
	}
	if (keys.indexOf('s') !== -1) {
		car.position.z += .5
	}
	if (keys.indexOf('a') !== -1) {
		car.position.x -= .5
	}
	if (keys.indexOf('d') !== -1) {
		car.position.x += .5
	}
	if (keys.indexOf('c') !== -1) {
		car.position.y -= .5
	}
	if (keys.indexOf(' ') !== -1) {
		car.position.y += .5;
	}
}

function updateJoystick(event) {
	if (!event.buttons) {
		carJoystick.x = event.clientX
		carJoystick.y = event.clientY
		console.log(carJoystick)
	} else {
		carJoystick.x = null
		carJoystick.y = null
	}
}

function moveCar() {
	if (car && carJoystick.x && carJoystick.y) {
		let wh = window.innerHeight;
		let ww = window.innerWidth;

		// Rotação horizontal baseada no movimento horizontal do joystick
		car.rotation.y -= (carJoystick.x - ww / 2) / ww / 25;

		// Limitação da rotação horizontal entre 0 e 2PI para permitir 360 graus
		car.rotation.y = (car.rotation.y + Math.PI * 2) % (Math.PI * 2);

		// Rotação vertical baseada no movimento vertical do joystick
		car.rotation.x += (carJoystick.y - wh / 2) / wh / 25;

		// Limitação da rotação vertical entre -PI/2 e PI/2 para evitar inversões
		car.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, car.rotation.x));
	}
}

// window.addEventListener('click', evento => {
// 	console.log(evento.clientX)
// });

window.addEventListener('mousemove', updateJoystick)

