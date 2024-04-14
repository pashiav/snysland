// Player object
import { PhysicsObject } from './object.js'
import { Shape } from '../shape.js'
import Assets from '../assets.js'
import { vec2Unit, vec2Norm } from '../vec2.js'
import world from '../world.js';
import * as THREE from 'three';

export class Exit extends PhysicsObject {
	constructor (spatialHash, scene, x, y, to) {
		super(spatialHash, x, y)

		this.x = x;
		this.y = y;
		this.z = 0;

		this.to = to;
		
		this.size = 10;
		this.shape = new Shape(
			-this.size/2,-this.size/2,
			this.size/2,-this.size/2,
			this.size/2,this.size/2,
			-this.size/2,this.size/2
		);

		this.active = true;
		this.static = true;

		this.model = Assets.mesh.block.clone();
		this.model.position.x = x;
		this.model.position.y = 0;
		this.model.position.z = -y;

		this.model.scale.x = 8.0;
		this.model.scale.y = 8.0;
		this.model.scale.z = 8.0;

		scene.add(this.model);

		this.setPosition(x, y);
	}

	update(dt) {
	}

	render(render, scene, camera) {
	}

	// Collision
	collide(name, obj, nx, ny) {
		if (name == "Player") {
			world.scene = new THREE.Scene();

			world.load(world.scene, this.to)
			return true
		}
		return true
	}

	startCollide(name, obj) {

	}

	stopCollide(name, obj) {

	}
}