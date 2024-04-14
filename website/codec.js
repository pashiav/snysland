import Assets from './assets.js'
import stateManager from './state.js';
import world from './world.js';
import AudioSystem from './audio.js';
class Codec {
	constructor () {

	}
	load (scene) {

		// Rendering
        this.texti = 1;
		this.scene = scene;
        this.scene.add(Assets.mesh.title);
        Assets.mesh.title.rotation.x = Math.PI*.35;
        Assets.mesh.title.position.set(0, 4, -4.25);
        Assets.mesh.title.scale.set(.5, .5, .5);
        
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
		
	}

	render (renderer, scene, camera) {

	}

	keyPress(key) {
		// Key press
        this.scene.remove(Assets.mesh.title);
		stateManager.set(world, this.scene);


	}

	keyRelease(key) {
		// Key release
	}
}

const codec = new Codec();
export default codec;