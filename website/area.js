import { PhysicsObject } from './objects/object.js'
import { Shape } from './shape.js'
import Assets from './assets.js'
import { Snake } from './objects/snake.js'; // Import the Snake class


import { Wall } from './objects/wall.js';

import world from './world.js';

export class Area {
	constructor (scene, name) {
		this.model = false;
		this.scene = scene;
		this.name = name;
		console.log(Assets.mesh_collection.area1);
		Assets.mesh_collection.area1.forEach((model) => {
			model.rotation.x = Math.PI*1.5;
			model.rotation.z = Math.PI*1.5;
			this.scene.add(model);
		});

		this.json = Assets.json[name];

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
					world.spawnObject("Wall", new Wall(world.spatial_hash, this.scene, (x+0.5)*10, (y+0.5)*10, 0));
				}
			}
		}

		this.snakes = this.json.snakes;
		// Create Snake objects
		this.snakes.forEach(snakeData => {
			world.spawnObject("Snake", new Snake(world.spatial_hash, this.scene, snakeData.id, (snakeData.y+0.5)*10, (snakeData.x+0.5)*10, snakeData.angle, snakeData.pivot_360, snakeData.clockwise, snakeData.start_angle, snakeData.end_angle));
		});
	}

	render (scene, camera, renderer) {
		
	}
}