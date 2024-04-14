import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { ColladaLoader } from 'ColladaLoader';


class AssetsClass {
	constructor() {
		this.image = {}

		this.startLoading();
		
		this.model_loader = new GLTFLoader();
		this.model_loader_collada = new ColladaLoader();

		this.material = {} 
		this.material.green = new THREE.MeshLambertMaterial({
			color: 0x00ffff, // green
		});
		this.material.white = new THREE.MeshLambertMaterial({
			color: 0xffffff, // white
		});
		this.material.missing = new THREE.MeshLambertMaterial({
			color: 0xff69b4, // green
		});

		this.mesh = {};
		//this.mesh.player = this.loadModel("assets/ball.glb");
		
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		this.mesh.block = new THREE.Mesh(geometry, this.material.missing);

		this.loadModel("assets/ball.glb", "player");
		this.loadModel("assets/snake.glb", "snake");
		this.loadModel("assets/codec_screen.glb", "codec");
		this.loadModel("assets/clns1.glb", "clns1");
		this.loadModel("assets/clns3.glb", "clns3");
		this.loadModel("assets/clns5.glb", "clns5");
		this.loadModel("assets/clns7.glb", "clns7");
		this.loadModel("assets/bgt2.glb", "bgt2");
		this.loadModel("assets/bgt4.glb", "bgt4");
		this.loadModel("assets/bgt6.glb", "bgt6");
		//this.loadModel("assets/level1entrancephase.glb", "area");

		// JSONs
		this.json = {};
		this.loadJSON("areas/area1.json", "area1");
		this.loadJSON("areas/area2.json", "area2");
		this.loadJSON("areas/area3.json", "area3");
		this.loadJSON("areas/area4.json", "area4");

		this.waitLoading();
	}
	loadModel(filename, name, loader = this.model_loader) {
		this.mesh[name] = false // Temporary model

		const assetsList = this;

		this.addLoading();
		new Promise((resolve, reject) => {
			loader.load(
				// resource URL
				filename,
				// called when the resource is loaded
				function (gltf) {
					gltf.scene.traverse(function (child) {
						if (child.isMesh && !assetsList.mesh[name]) {
							assetsList.mesh[name] = child; // Set the mesh to the loaded mesh
							resolve(child);
							assetsList.progressLoading();
							return;
						}
					});
				},
				// called while loading is progressing
				function (xhr) {
					console.log(`Loading model ${name} ${Math.floor(xhr.loaded / xhr.total * 100)}%`);
				},
				// called when loading has errors
				function (error) {
					console.log('An error happened', error);
					reject(error);
				}
			);
		});
	}

	loadJSON(filePath, name) {
		// JSON file must be loaded asynchronously
		this.json[name] = false;

		const assetsList = this;
		this.addLoading();

		fetch(filePath).then(response => {
			if (!response.ok) {
				console.log("JSON Network response was not ok")
			}
			return response.json()
		})
		.then(data => {
			console.log("JSON loaded: ", data)
			assetsList.json[name] = data;
			assetsList.progressLoading();
			//callBack(data)
		})
		.catch(error => {
			console.log("There was a problem loading the JSON file:", error)
		})
	}

	// Loading screen
	startLoading() {
		this.loading = true;
		this.loading_waiting = false;
		this.loading_done = 0;
		this.loading_count = 0;
	}

	waitLoading() {
		console.log("officially waiting")
		this.loading_waiting = true
		if (this.loading_done >= this.loading_count) {
			this.loading_done = 0;
			this.loading_count = 0;
			this.loading = false;
		}
	}

	addLoading() {
		this.loading_count++;
		console.log("Loading count: " + this.loading_count)
	}

	progressLoading() {
		this.loading_done++;
		if (this.loading_waiting && this.loading_done >= this.loading_count) {
			this.loading_done = 0;
			this.loading_count = 0;
			this.loading = false;
			console.log("done loading")
		}
	}
}

const Assets = new AssetsClass();
export default Assets;