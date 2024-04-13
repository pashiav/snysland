// Player object
import { PhysicsObject } from './object.js'
import { Shape } from '../shape.js'
import Assets from '../assets.js'
import { vec2Unit, vec2Norm } from '../vec2.js'

export class Snake extends PhysicsObject {
    constructor (spatialHash, scene, id, x, y) {
        // constructor (spatialHash, scene, id, x, y, angle, pivot_360, clockwise, start_angle = null, end_angle = null) {

        super(spatialHash, x, y)
        this.scene = scene;
        
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = 0;

        // this.angle = angle * (Math.PI / 180); // Convert degrees to radians

        // this.pivot_360 = pivot_360;
        // this.clockwise = clockwise;
        // this.start_angle = start_angle ? start_angle * (Math.PI / 180) : null; // Convert degrees to radians
        // this.end_angle = end_angle ? end_angle * (Math.PI / 180) : null; // Convert degrees to radians


		this.walking = false;
        // collision true
		this.active = true; 
        // if they don't move it is static
		this.static = false;

		this.speed = 20;

		this.size = 1;
        // shape of the hit box dont delete
		this.shape = new Shape(
			-this.size/2,-this.size/2,
			this.size/2,-this.size/2,
			this.size/2,this.size/2,
			-this.size/2,this.size/2
		);
        
		this.model = Assets.mesh.snake.clone();
        this.model.position.x = this.x;
		this.model.position.y = this.y;
		this.model.position.z = this.z;



        this.model.scale.x = 10;
		this.model.scale.z = 10;
		scene.add(this.model);

		this.setPosition(x, y);
        console.log(x,y);
        
	}

    update(dt) {
        this.model.position.set(this.x, this.y, this.z);
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