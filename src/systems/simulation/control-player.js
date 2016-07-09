"use strict";

var particles = require("splat-ecs/lib/particles.js");
var config = new particles.Config();
config.qtyMin = 6;
config.qtyMax = 8;
config.velocityMin = 0.05;
config.velocityMax = 0.10;
config.sizeMin = 0.5;
config.angle = Math.PI * 1.25;
config.arcWidth = -Math.PI * 0.5;
config.lifeSpanMin = 250;
config.lifeSpanMax = 500;
config.prefab = "dust";
var player = 1;

module.exports = function(ecs, game) {
	game.entities.registerSearch("applyMovement2d", ["velocity", "movement2d"]);
	ecs.addEach(function applyMovement2d(entity, elapsed) { // eslint-disable-line no-unused-vars
		var velocity = game.entities.get(entity, "velocity");
		var movement2d = game.entities.get(entity, "movement2d");
		var isControllable = game.entities.get(entity, "isControllable");
        var wasRight = game.entities.get(entity, "wasRight");
        config.origin = player;
		if (movement2d.up && velocity.y > movement2d.upMax && isControllable) {
			velocity.y += movement2d.upAccel;
		}
		if (movement2d.down && velocity.y < movement2d.downMax && isControllable) {
			velocity.y += movement2d.downAccel;
		}
		if (movement2d.left && velocity.x > movement2d.leftMax && isControllable) {
			velocity.x += movement2d.leftAccel;
            if (wasRight) {
                config.angle = Math.PI * 1.75;
                config.arcWidth = Math.PI * 0.5;
                particles.create(game, config);
                game.entities.set(entity, "wasRight", false);
            }
		}
		if (movement2d.right && velocity.x < movement2d.rightMax && isControllable) {
			velocity.x += movement2d.rightAccel;
            if (!wasRight) {
                config.angle = Math.PI * 1.25;
                config.arcWidth = -Math.PI * 0.5;
                particles.create(game, config);
                game.entities.set(entity, "wasRight", true);
            }
		}
	}, "applyMovement2d");
};
