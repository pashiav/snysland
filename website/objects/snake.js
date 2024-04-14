// Player object
import { PhysicsObject } from './object.js'
import { Shape } from '../shape.js'
import Assets from '../assets.js'
import { vec2Unit, vec2Norm } from '../vec2.js'

export class Snake extends PhysicsObject {
	constructor (spatialHash, scene, id, x, y, angle, pivot_360, clockwise, start_angle = null, end_angle = null) {

        super(spatialHash, x, y)
        this.scene = scene;
        
		// Initialize all parameters
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = 7;

        this.angle = angle * (Math.PI / 180); // Convert degrees to radians

        this.pivot_360 = pivot_360;
        this.clockwise = clockwise;
        this.start_angle = start_angle ? start_angle * (Math.PI / 180) : null; // Convert degrees to radians
        this.end_angle = end_angle ? end_angle * (Math.PI / 180) : null; // Convert degrees to radians


		this.walking = false;
        // collision true
		this.active = true; 
        // if they don't move it is static
		this.static = false;

		this.speed = 20;

		this.size = 8.5;
        // shape of the hit box dont delete
		this.shape = new Shape(
			-this.size/2,-this.size/2,
			this.size/2,-this.size/2,
			this.size/2,this.size/2,
			-this.size/2,this.size/2
		);
        
		this.model = Assets.mesh.snake.clone();
        this.model.position.x = this.x;
		this.model.position.y = this.z;
		this.model.position.z = -this.y;
		
		// Scale up the size of snake .5
		this.model.scale.x = .45;
		this.model.scale.y = .45;
		this.model.scale.z = .45;

		// if snake is not rotating 360: then start at given angle, else: start at this.angle
		if (!this.pivot_360) {
			this.model.rotation.y = this.start_angle;
		} else {
			this.model.rotation.y = this.angle;
		}
		
		scene.add(this.model);

		this.setPosition(this.x, this.y);
        
	}

    update(dt) {
        this.model.position.set(this.x, this.z, -this.y+4);
    }

	render (scene, camera, renderer) {
		
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