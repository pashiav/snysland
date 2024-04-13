import { PhysicsObject } from './objects/object.js'
import { Shape } from './shape.js'
import Assets from './assets.js'

import { Wall } from './objects/wall.js';

import world from './world.js';

export class Area {
	constructor (scene) {
		//this.model = Assets.mesh.area.clone();
		this.scene = scene;

		//this.scene.add(this.model);

		this.layout = [
			[1,1,1,1,1],
			[1,0,0,0,1],
			[1,0,0,0,1],
			[1,0,0,0,1],
			[1,1,1,1,1]
		];

		for (let x = 0; x < this.layout.length; x++) {
			for (let y = 0; y < this.layout[x].length; y++) {
				if (this.layout[x][y] == 1) {
					console.log("Spawning wall at " + x + ", " + y);
					world.spawnObject("Wall", new Wall(world.spatial_hash, this.scene, x*10, y*10, 0));
				}
			}
		}
	}

	render (scene, camera, renderer) {
		
	}
}