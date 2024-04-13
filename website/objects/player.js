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
		this.z = 10;

		this.sx = 0;
		this.sy = 0;

		this.angle = 0;

		this.facing = 0; // radians
		this.pitch = Math.PI/2; // Between 0 and PI

		this.walking = false;
		this.buttons = {
			up: false,
			down: false,
			left: false,
			right: false,

			turnLeft: false,
			turnRight: false
		}

		this.active = true;
		this.static = false;

		this.speed = 20;

		this.size = 1;
		this.shape = new Shape(
			-this.size/2,-this.size/2,
			this.size/2,-this.size/2,
			this.size/2,this.size/2,
			-this.size/2,this.size/2
		);

		this.model = Assets.mesh.player.clone();
		scene.add(this.model);

		this.setPosition(x, y);
	}

	update(dt) {
		let but = this.buttons;
		// turning
		if (but.turnLeft) {
			this.facing += Math.PI/2 * dt;

		} else if (but.turnRight) {
			this.facing -= Math.PI/2 * dt;
		}

		// movement
		if (but.up || but.down || but.left || but.right) {
			// FPS movement
			this.walking = true;
			let angle = this.facing; // radians
			if (but.up) {
				if (but.left) {
					angle += Math.PI/4;
				} else if (but.right) {
					angle -= Math.PI/4;
				}
			} else if (but.down) {
				if (but.left) {
					angle += Math.PI*0.75;
				} else if (but.right) {
					angle -= Math.PI*0.75;
				} else {
					angle += Math.PI;
				}
			} else if (but.left) {
				angle += Math.PI/2;
			} else if (but.right) {
				angle -= Math.PI/2;
			}

			this.sx = Math.cos(angle) * this.speed;
			this.sy = Math.sin(angle) * this.speed;

			this.angle = angle;
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
			camera.position.x = this.x;
			camera.position.y = this.z;
			camera.position.z = -this.y;

			// set rotation to current angle
			camera.rotation.y = this.facing-Math.PI/2;
			//camera.rotation.z = this.pitch;
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

		if (key === "ArrowLeft") {
			this.buttons.turnLeft = true;
		}
		if (key === "ArrowRight") {
			this.buttons.turnRight = true;
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

		if (key === "ArrowLeft") {
			this.buttons.turnLeft = false;
		}
		if (key === "ArrowRight") {
			this.buttons.turnRight = false;
		}
	}

	mouseMoved(x, y, dx, dy) {
		this.facing += dx/100;

		this.pitch = Math.max(0, Math.min(Math.PI, this.pitch + dy/100));
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