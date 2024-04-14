// import physics from './physics.js'
import { updatePhysics, SpatialHash } from './physics.js'
import { Player } from './objects/player.js'
import { Area } from './area.js'

class World {
	constructor () {

	}

	load (scene, area="area1") {
		// Rendering
		this.scene = scene;

		// Physics world
		this.spatial_hash = new SpatialHash(1000, 1000, 100);

		// Objects
		this.objects = {
			Player: {},
			Snake: {},
			Wall: {dontUpdate: true},
			Exit: {}
		};

		this.player = this.spawnObject("Player", new Player(this.spatial_hash, this.scene, 20, 20, 0));

		// Area
		this.area = new Area(this.scene, area);
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
				if (a.update) {
					a.update(dt);
				}
			}
		}
		updatePhysics(this.objects, this.spatial_hash, dt);
		this.area.update(dt);
	}

	render (renderer, scene, camera) {
		// Render all objects
		for (const [objsName, objsList] of Object.entries(this.objects)) {
			for (const [ia, a] of Object.entries(objsList)) {
				if (a.render) {
					a.render(renderer, scene, camera);
				}
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

	mouseMoved(x, y, dx, dy) {
		// Mouse move
		this.player.mouseMoved(x, y, dx, dy);
	}
}

const world = new World();
export default world;