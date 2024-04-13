import * as THREE from 'three';

export class GameClass {
	constructor(renderer, scene, camera) {
		this.renderer = renderer;

		this.scene = scene;
		this.camera = camera;
		
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		// Create a point light
		const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight.position.set(1, 1, 1); // default; light shining from top


		this.scene.add(directionalLight); // Add the light to the scene
		const material = new THREE.MeshLambertMaterial({
			color: 0x00ff00, // green
		});

		this.objects = {};

		for (let i = 0; i < 10; i++) {
			let b = new THREE.Mesh(geometry, material);
			this.objects[i] = b;
			b.position.y = Math.random() * 10 - 5;
			this.scene.add( this.objects[i] );
		}

		this.scale = 1;
	}

	update(dt) {
		this.scale = (this.scale + 10*dt)%(Math.PI*2);
		for (let i in this.objects) {
			let b = this.objects[i];
			b.position.x = Math.sin(this.scale + i)*2;
			b.position.z = Math.cos(this.scale + i)*2;
			b.rotation.x = b.rotation.x + 1*dt;
			b.scale.x = Math.sin(this.scale)*0.5+1;
			b.scale.y = Math.sin(this.scale)*0.5+1;
		}
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}
}