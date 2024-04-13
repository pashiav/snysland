import Assets from './assets.js'
import * as THREE from 'three';
import { FontLoader } from 'https://www.unpkg.com/three@0.156.1/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://www.unpkg.com/three@0.156.1/examples/jsm/geometries/TextGeometry.js';
class Codec {
	constructor () {

	}

	load (scene) {
		// Rendering
		this.scene = scene;
        this.scene.add(Assets.mesh.codec);
        // Assets.mesh.codec.rotation.z = Math.PI*.5;
        Assets.mesh.codec.rotation.y = Math.PI;
        Assets.mesh.codec.position.set(320, 40, 0);
        Assets.mesh.codec.scale.set(.5, .5, .7);
        const loader = new FontLoader();
        const font = loader.load(
            // resource URL
            'https://www.unpkg.com/three@0.156.1/examples/fonts/helvetiker_bold.typeface.json',

            // onLoad callback
            function ( font ) {
                // do something with the font
                console.log( font );
            },

            // onProgress callback
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

            // onError callback
            function ( err ) {
                console.log( 'An error happened' );
            }
        );
        fetch('codec.json')
          .then(response => response.json())
          .then(data => {
            var textContent = data.text;
            console.log(textContent);
            // Create a new text geometry
            var textGeo = new TextGeometry(textContent, {
              font: font, // Assuming you have loaded a font
              size: 20,
              height: 5,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 2,
              bevelSize: 1,
              bevelSegments: 5
            });

            // Create a material
            var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

            // Create a mesh
            var textMesh = new THREE.Mesh(textGeo, material);

            // Position the text
            textMesh.position.set(0, 100, 1); // Adjust position as needed

            // Add the text to the scene
            this.scene.add(textMesh);

            // Set initial visibility to false
            textMesh.visible = false;

            // Initialize index for revealing letters
            var index = 0;

            // Function to reveal text letter by letter
            function revealText() {
              // Set visibility to true
              textMesh.visible = true;

              // Check if there are still letters to reveal
              if (index < textContent.length) {
                // Get the substring up to the current index
                var partialText = textContent.substr(0, index + 1);
                textMesh.geometry = new TextGeometry(partialText, textMesh.geometry.parameters);
                index++;
              } else {
                // All letters have been revealed
                cancelAnimationFrame(animationId);
              }

              // Request the next frame
              animationId = requestAnimationFrame(revealText);
            }

            // Start revealing text
            var animationId = requestAnimationFrame(revealText);
          })
          .catch(error => {
            console.error('Error fetching text:', error);
          });
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
		this.player.keyPress(key);
	}

	keyRelease(key) {
		// Key release
		this.player.keyRelease(key);
	}
}

const world = new Codec();
export default world;