// Player object
import { PhysicsObject } from './object.js'
import { Shape } from '../shape.js'
import Assets from '../assets.js'
import { vec2Unit, vec2Norm } from '../vec2.js'

export class Player extends PhysicsObject {
	constructor (spatialHash, scene, x, y, z) {
		super(spatialHash, x, y)

		this.x = x;
		this.y = y;
		this.z = z;

		this.sx = 0;
		this.sy = 0;

		this.angle = 0;
		this.walking = false;
		this.buttons = {
			up: false,
			down: false,
			left: false,
			right: false
		}

		this.speed = 10;

		this.size = 20;
		this.shape = new Shape(
			-this.size/2,-this.size/2,
			this.size/2,-this.size/2,
			this.size/2,this.size/2,
			-this.size/2,this.size/2
		);

		this.model = Assets.mesh.player.clone();
		scene.add(this.model);
	}

	update(dt) {
		// movement
		let but = this.buttons;
		if (but.up || but.down || but.left || but.right) {
			this.walking = true;
			let angle = 0; // radians
			let vx = 0;
			let vy = 0;
			if (but.up) {
				vy = -1;
			}
			if (but.down) {
				vy = 1;
			}
			if (but.left) {
				vx = -1;
			}
			if (but.right) {
				vx = 1;
			}
			angle = Math.atan2(-vy, vx);

			this.sx = Math.cos(angle) * this.speed;
			this.sy = Math.sin(angle) * this.speed;
		} else {
			this.walking = false;
			this.sx = 0;
			this.sy = 0;
		}
	}

	render(render, scene, camera) {
		// called every frame
		let model = this.model;
		if (model) {
			model.position.x = this.x;
			model.position.y = this.y;
			model.position.z = this.z;
		}
	}

	keyPress(key) {
		if (key === "w") {
			this.buttons.up = true;
		}
		if (key === "a") {
			this.buttons.left = true;
		}
		if (key === "s") {
			this.buttons.down = true;
		}
		if (key === "d") {
			this.buttons.right = true;
		}
	}

	keyRelease(key) {
		if (key === "w") {
			this.buttons.up = false;
		}
		if (key === "a") {
			this.buttons.left = false;
		}
		if (key === "s") {
			this.buttons.down = false;
		}
		if (key === "d") {
			this.buttons.right = false;
		}
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