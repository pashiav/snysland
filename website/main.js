import * as THREE from 'three';
import { GameClass } from './game.js';

const gameWidth = 1280;
const gameHeight = 720;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, gameWidth/gameHeight, 0.1, 1000 );

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(gameWidth, gameHeight);
const canvasContainer = document.getElementById('canvas');
canvasContainer.appendChild(renderer.domElement);

console.log("let there be light")

const Game = new GameClass(renderer, scene, camera);

var FPS = 0
var lastTimestamp = 0
function gameLoop(timestamp) {
	const dt = Math.min((timestamp - lastTimestamp) / 1000, 1/15); // Delta time; should be capped (currently at 15FPS)
	FPS = 1/((timestamp - lastTimestamp) / 1000);
	lastTimestamp = timestamp;
	
	Game.update(dt);
	Game.render();

	requestAnimationFrame( gameLoop );
}
requestAnimationFrame( gameLoop );