// Input Handler; This passes user inputs to the game with useful functions
import stateManager from './state.js';
import { canvasContainer } from './main.js';

// Recieve keyboard inputs
window.addEventListener("keydown", keyPressed)
window.addEventListener("keyup", keyReleased)

// Recieve mouse inputs
canvas.addEventListener("mousedown", mouseClicked)
canvas.addEventListener("mouseup", mouseReleased)
document.addEventListener("mousemove", mouseMoved)

// Keyboard inputs
function keyPressed(event) {
	if (event.target.tagName.toLowerCase() === 'input') {
		// Input field is focused, allow default action
		return;
	}
	event.preventDefault()
	stateManager.keyPress(event.key, event.code)
}
function keyReleased(event) {
	if (event.target.tagName.toLowerCase() === 'input') {
		// Input field is focused, allow default action
		return;
	}
	event.preventDefault()
	stateManager.keyRelease(event.key, event.code)
}

// Mouse inputs
let mouseScreenX = 0
let mouseScreenY = 0
function convertMouseCoordsToScreen(mouseX, mouseY) {
	var rect = canvasContainer.getBoundingClientRect() // abs. size of element
	let scaleX = 1280 / rect.width	// relationship bitmap vs. element for x
	let scaleY = 720 / rect.height  // relationship bitmap vs. element for y
	
	let screenX = Math.max(0, Math.min(1280, (mouseX - rect.left) * scaleX))   // scale mouse coordinates after they have
	let screenY = Math.max(0, Math.min(720, (mouseY - rect.top) * scaleY))	 // been adjusted to be relative to element
	return [screenX, screenY]
}

function mouseMoved(event) {
	event.preventDefault();
	var pos = [event.clientX, event.clientY];
	
	let oldX = mouseScreenX
	let oldY = mouseScreenY
	let [mouseScreenX2, mouseScreenY2] = convertMouseCoordsToScreen(pos[0], pos[1])
	mouseScreenX = mouseScreenX2
	mouseScreenY = mouseScreenY2
	
	// show difference
	
	let mouseMovementX = event.movementX || event.mozMovementX || 0;
	let mouseMovementY = event.movementY || event.mozMovementY || 0;
	stateManager.mouseMoved(mouseScreenX, mouseScreenY, mouseMovementX, mouseMovementY)
}

// Postion; returns [x, y]
function getMousePos() {
	return [mouseScreenX, mouseScreenY]
}

function mouseClicked(event) {
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock();

	event.preventDefault();
	let [x, y] = getMousePos()
	stateManager.click(event.button, x, y)
}

function mouseReleased(event) {
	let [x, y] = getMousePos()
	stateManager.clickRelease(event.button, x, y)
}

function checkMouseInside(x, y, w, h) {
	// Check if mouse is inside a box
	return ((mouseScreenX > x) && (mouseScreenX < x+w) && (mouseScreenY > y) && (mouseScreenY < y+h))
}

// Add a pointer lock change event listener to the document
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
    if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
    } else {
        console.log('The pointer lock status is now unlocked');  
    }
}