// UI Elements should go here
manager.onMouseDown = function(button) {
	if (runtime) {
		if (ink.amount > 0) {
			var success = placeObj(gInput.mouse.x, gInput.mouse.y, this.mode);
			if (success) {
				switch(this.mode) {
				case "wall":
					changeInk(-32);
					break;
				case "bridge":
					changeInk(-64);
					break;
				case "bomb":
					changeInk(-96);
					break;
				default:
					break;
				}
			}
		}
	}
};
