// State Handler; Handles which "mode" the game is currently in.
// For example: the world shouldn't update if you're playing a minigame
// Functions to interact with states

class StateManager {
	constructor() {
		this.game_state = false;
		this.game_state_name = "";
	}

	set(state, args) {
		state.load(args);
		this.game_state = state;
		this.game_state_name = this.game_state.name;
	}

	get() {
		return this.game_state_name;
	}

	update(dt) {
		this.game_state.update(dt);
	}

	render(renderer, scene, camera) {
		this.game_state.render(renderer, scene, camera);
	}

	keyPress(key, code) {
		if (this.game_state.keyPress) {
			this.game_state.keyPress(key, code);
		}
	}

	keyRelease(key, code) {
		if (this.game_state.keyRelease) {
			this.game_state.keyRelease(key, code);
		}
	}

	click(button, x, y) {
		if (this.game_state.mouseClick) {
			this.game_state.mouseClick(button, x, y);
		}
	}

	clickRelease(button, x, y) {
		if (this.game_state.mouseRelease) {
			this.game_state.mouseRelease(button, x, y);
		}
	}
}

const stateManager = new StateManager();
export default stateManager;