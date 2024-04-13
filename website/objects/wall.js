// Player object
import { PhysicsObject } from './object.js'
import { Shape } from '../shape.js'
import Assets from '../assets.js'
import { vec2Unit, vec2Norm } from '../vec2.js'

export class Wall extends PhysicsObject {
	constructor (spatialHash, scene, x, y, z) {
		super(spatialHash, x, y)

		this.x = x;
		this.y = y;
		this.z = z;

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
		this.model.position.y = z;
		this.model.position.z = -y;

		this.model.scale.x = 10.0;
		this.model.scale.z = 10.0;

		scene.add(this.model);

		this.setPosition(x, y);
	}

	update(dt) {
	}

	render(render, scene, camera) {
	}

	// Collision
	collide(name, obj, nx, ny) {
		return true
	}

	startCollide(name, obj) {

	}

	stopCollide(name, obj) {

	}
}