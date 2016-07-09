"use strict";
var shot, adult, animation, position, size, shotPosition, shotSize, timers;
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
    ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
				adult = game.entities.get(entity,"adult");
				animation = game.entities.get(entity,"animation");
				position = game.entities.get(entity,"position");
				size = game.entities.get(entity,"size");
				timers = game.entities.get(entity,"timers");
				if (adult && game.inputs.button("shoot") && game.entities.get(entity,"canShoot") && !game.pause) {
					if (animation.name.indexOf("left") > -1) {
						shot = game.instantiatePrefab("player_shot_left");
						shotPosition = game.entities.get(shot,"position");
						shotSize = game.entities.get(shot,"size");
						shotPosition.x = position.x + shotSize.width * 3 / 4;
						shotPosition.y = position.y + size.height / 4;

					} else {
						shot = game.instantiatePrefab("player_shot_right");
						shotPosition = game.entities.get(shot,"position");
						shotSize = game.entities.get(shot,"size");
						shotPosition.x = position.x + size.width - shotSize.width * 3 / 4;
						shotPosition.y = position.y + size.height / 4;
					}
					game.entities.set(entity,"canShoot",false);
					timers.setCanShoot.time = 0;
					timers.setCanShoot.running = true;
				}
    },
    "player");
};
