import * as THREE from 'three';

const gameWidth = 1280;
const gameHeight = 720;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, gameWidth/gameHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(gameWidth, gameHeight);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

console.log("let there be light")

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();