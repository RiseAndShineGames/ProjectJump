"use strict";
var camera = 0;
module.exports = function(entity, game) {
		var extraLives = game.entities.get(entity, "lives");
		var level = game.entities.get(camera, "level");
    game.switchScene("life", { "level": level, "lives": extraLives });
};
