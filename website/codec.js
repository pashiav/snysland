import Assets from './assets.js'
import stateManager from './state.js';
import world from './world.js';
class Codec {
	constructor () {

	}
	load (scene) {
		// Rendering
        this.texti = 1;
		this.scene = scene;
        this.scene.add(Assets.mesh.codec);
        // Assets.mesh.codec.rotation.z = Math.PI*.5;
        Assets.mesh.codec.rotation.y = Math.PI;
        Assets.mesh.codec.position.set(320, 40, 0);
        Assets.mesh.codec.scale.set(.5, .5, .7);
        
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
        this.scene.remove(Assets.mesh.codec);
		stateManager.set(world, this.scene);


	}

	keyRelease(key) {
		// Key release
	}
}

const codec = new Codec();
export default codec;