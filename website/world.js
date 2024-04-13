// import physics from './physics.js'
import { updatePhysics, SpatialHash } from './physics.js'
import { Player } from './objects/player.js'
import { Area } from './area.js'

class World {
	constructor () {

	}

	load (scene) {
		// Rendering
		this.scene = scene;

		// Physics world
		this.spatial_hash = new SpatialHash(1000, 1000, 100);

		// Objects
		this.objects = {
			Player: {},
			Snake: {},
			Wall: {}
		};

		this.player = this.spawnObject("Player", new Player(this.spatial_hash, this.scene, 0, 0, 0));

		// Area
		this.area = new Area();
	}

	spawnObject(name, obj, id) {
		if (id === undefined) {
			id = 0;
			while (this.objects[name].hasOwnProperty(id.toString())) {
				id++
			};
		}
		this.objects[name][id] = obj;
		return obj;
	}

	update (dt) {
		// Update all objects
		for (const [objsName, objsList] of Object.entries(this.objects)) {
			for (const [ia, a] of Object.entries(objsList)) {
				a.update(dt);
			}
		}
		updatePhysics(this.objects, this.spatial_hash, dt);
	}

	render (renderer, scene, camera) {
		// Render all objects
		for (const [objsName, objsList] of Object.entries(this.objects)) {
			for (const [ia, a] of Object.entries(objsList)) {
				a.render(renderer, scene, camera);
			}
		}
	}

	keyPress(key) {
		// Key press
		this.player.keyPress(key);
	}

	keyRelease(key) {
		// Key release
		this.player.keyRelease(key);
	}
}

const world = new World();
export default world;