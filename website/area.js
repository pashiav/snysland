import { PhysicsObject } from './objects/object.js'
import { Shape } from './shape.js'
import Assets from './assets.js'
import { Snake } from './objects/snake.js'; // Import the Snake class


import { Wall } from './objects/wall.js';

import world from './world.js';

export class Area {
	constructor (scene, name) {
		//this.model = Assets.mesh.area.clone();
		this.scene = scene;

		//this.scene.add(this.model);

		this.json = Assets.json[name];
		console.log(Assets.json, name)

		// this.layout = [
		// 	[1,1,1,1,1],
		// 	[1,0,0,0,1],
		// 	[1,0,0,0,1],
		// 	[1,0,0,0,1],
		// 	[1,1,1,1,1]
		// ];

		this.layout = this.json.walls;

		for (let x = 0; x < this.layout.length; x++) {
			for (let y = 0; y < this.layout[x].length; y++) {
				if (this.layout[x][y] == 1) {
					world.spawnObject("Wall", new Wall(world.spatial_hash, this.scene, x*10, y*10, 0));
				}
			}
		}

		this.snakes = this.json.snakes;
		// Create Snake objects
		this.snakes.forEach(snakeData => {
			// world.spawnObject("Snake", new Snake(world.spatial_hash, this.scene, snakeData.id, snakeData.x*10, snakeData.y*10, snakeData.angle, snakeData.pivot_360, snakeData.clockwise, snakeData.start_angle, snakeData.end_angle));
			world.spawnObject("Snake", new Snake(world.spatial_hash, this.scene, snakeData.id, snakeData.x, snakeData.y));
		});
	}

	render (scene, camera, renderer) {
		
	}
}