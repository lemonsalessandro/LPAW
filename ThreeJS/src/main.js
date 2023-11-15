import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

let aspecto = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera(
	75, //campo de visao vertical
	aspecto, //aspecto da imagem (Largura/Altura)
	0.1, //Plano proximo
	100//Plano distante
);
camera.position.z = 35

//LUZES
var light = new THREE.AmbientLight(0xffffff, .5);
scene.add(light);

//lightpoint
var plight = new THREE.PointLight(0xffffff, 1);
plight.position.set(10, 100, 0);
scene.add(plight);

//carregamento assets
let car;
const modelPath = 'models/'
const mtlFile = '1377 Car.mtl'
const objFile = '1377 Car.obj'

const manager = new THREE.LoadingManager();
manager.onProgress = (item, loaded, total) => {
	console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

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
	car.position.z = 0;
	car.rotation.y = 0;
	car.rotateX(.5);
	car.scale.setScalar(.4);
	scene.add(car);
	animate();
}

function animate() {
	renderer.render(scene, camera)
	car.rotation.y += .01;
	requestAnimationFrame(animate)
}