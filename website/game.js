import * as THREE from 'three';

import { GLTFLoader } from 'GLTFLoader';
import { ColladaLoader } from 'ColladaLoader';

import stateManager from './state.js';


import Assets from './assets.js'

import './input.js';
import codec from './codec.js';

export class GameClass {
	constructor(renderer, scene, camera) {
		this.renderer = renderer;

		this.scene = scene;
		this.camera = camera;

		this.started = false;
	}

	start() {
		// call this after loading is done
		this.started = true;

		// Create a point light
		const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
		directionalLight.position.set(1, 1, 1); // default; light shining from top
		const light = new THREE.AmbientLight( 0x404040 ); // soft white light
		this.scene.add( light );

		this.scene.add(directionalLight); // Add the light to the scene

		// Start game world
		stateManager.set(codec, this.scene);
		
	}

	update(dt) {
		if (Assets.loading) {
			return;
		} else if (!this.started) {
			this.start();
		}
		stateManager.update(dt);
	}

	render() {
		if (Assets.loading) {
			// Loading screen
			this.renderer.setClearColor(0x000000, 1); // Set background color to black
	
			// Create the loading bar if it doesn't exist yet
			if (!this.loadingBar) {
				const geometry = new THREE.BoxGeometry( 1, 1, 1 );
				const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color
				this.loadingBar = new THREE.Mesh(geometry, material);
				this.loadingBar.position.set(0, 0, 0); // Center of the screen
				this.scene.add(this.loadingBar);
			}
	
			// Scale the loading bar according to the loading progress
			const progress = Assets.loading_done / Assets.loading_count;
			this.loadingBar.scale.x = progress*10;
	
			this.renderer.render(this.scene, this.camera);
			return;
		}

		// Remove the loading bar from the scene once loading is complete
		if (this.loadingBar) {
			this.scene.remove(this.loadingBar);
			this.loadingBar = null;
		}

		stateManager.render(this.renderer, this.scene, this.camera);

		this.renderer.render( this.scene, this.camera );
	}
}