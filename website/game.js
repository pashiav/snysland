import * as THREE from 'three';

import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

export class GameClass {
	constructor(renderer, scene, camera) {
		this.renderer = renderer;

		this.scene = scene;
		this.camera = camera;
		
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		// Create a point light
		const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight.position.set(1, 1, 1); // default; light shining from top
		const light = new THREE.AmbientLight( 0x404040 ); // soft white light
		scene.add( light );

		this.scene.add(directionalLight); // Add the light to the scene
		const material = new THREE.MeshLambertMaterial({
			color: 0x00ff00, // green
		});

		this.objects = {};

		for (let i = 0; i < 10; i++) {
			let b = new THREE.Mesh(geometry, material);
			this.objects[i] = b;
			b.position.y = i * 2 - 10;
			this.scene.add( this.objects[i] );
		}

		this.scale = 1;

		this.snake = null;

		const loader = new GLTFLoader();

		const game = this;
		loader.load(
			// resource URL
			'assets/crate.glb',
			// called when the resource is loaded
			function ( gltf ) {
				game.snake = gltf.scene;
				game.scene.add( game.snake );
			},
			// called while loading is progressing
			function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				console.log( 'An error happened', error );
			}
		);
	}

	update(dt) {
		console.log(this.snake)
		this.scale = (this.scale + 1*dt)%(Math.PI*2);
		for (let i in this.objects) {
			let b = this.objects[i];
			b.position.x = Math.sin(this.scale + i)*2;
			b.position.z = Math.cos(this.scale + i)*2;
			b.rotation.x = b.rotation.x + 1*dt;
			b.scale.x = Math.sin(this.scale)*0.5+1;
			b.scale.y = Math.sin(this.scale)*0.5+1;
			b.scale.z = Math.sin(this.scale)*0.5+1;
		}
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}
}