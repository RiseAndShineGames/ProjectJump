"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("apply-on-press", ["onPress", "position", "size"]);
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		if (game.entities.find("intro").length > 0 || game.entities.find("outro").length > 0) {
			return;
		}

		var camera = game.entities.find("camera")[0];
		var cameraPosition = game.entities.get(camera, "position");

		var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "size");
		var mx = game.inputs.mouse.x + cameraPosition.x;
		var my = game.inputs.mouse.y + cameraPosition.y;
		if (game.inputs.buttonPressed("Selection")
				&& mx >= position.x
				&& mx < position.x + size.width
				&& my >= position.y
				&& my < position.y + size.height
				) {
			var onPress = game.entities.get(entity, "onPress");
			var script = game.require(onPress.script);
			script(entity, game);
		}
	}, "apply-on-press");
};
