"use strict";

function wasLeft(entityLastPosition, entitySize, otherPosition) {
    return entityLastPosition.x + entitySize.width <= otherPosition.x;
}
function wasRight(entityLastPosition, otherPosition, otherSize) {
    return entityLastPosition.x >= otherPosition.x + otherSize.width;
}
function wasAbove(entityLastPosition, entitySize, otherPosition) {
    return entityLastPosition.y + entitySize.height <= otherPosition.y;
}
function wasBelow(entityLastPosition, otherPosition, otherSize) {
    return entityLastPosition.y >= otherPosition.y + otherSize.height;
}
var collisions, entityPosition, entitySize, entityVelocity, entityAcceleration, entityLastPosition, other, otherPosition, otherSize;
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
    game.entities.registerSearch("playerCollisions", ["player", "collisions", "velocity"]);
		game.entities.registerSearch("shotCollisions",["shot","collisions"]);
    ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars

			// end remove
        collisions = game.entities.get(entity, "collisions");
        var restart = game.entities.get(entity, "timers").restart;
        var camera = 0;
        entityPosition = game.entities.get(entity, "position");
        entitySize = game.entities.get(entity, "size");
        entityVelocity = game.entities.get(entity, "velocity");
        entityAcceleration = game.entities.get(entity, "acceleration");
				//fix /hack to make sure entityAcceleration exists
				if (!entityAcceleration) {
					entityAcceleration = { "x": 0, "y": 0 };
				}
        entityLastPosition = game.entities.get(entity, "lastPosition");
        game.entities.set(entity, "grounded", false);
        var canvasHeight = game.entities.get(game.entities.find("container"), "size").height;
        if (entitySize.height + entityPosition.y >= canvasHeight) {
            if (game.entities.get(camera, "running")) {
                game.entities.set(camera, "shake", { "duration": 250, "magnitude": 10 });
                game.entities.set(camera, "running", false);
								game.entities.set(entity, "lives", game.entities.get(entity, "lives") - 1);
            }
            restart.running = true;
        }
        for (var i = 0; i < collisions.length; i++) {
            other = collisions[i];
            otherPosition = game.entities.get(other, "position");
            otherSize = game.entities.get(other, "size");
            //collisions for player with standable objects
            if (game.entities.get(other,"standable")) {
                if (wasLeft(entityLastPosition, entitySize, otherPosition)) {
                    entityPosition.x = otherPosition.x - entitySize.width;
                    entityVelocity.x = 0;
                    entityAcceleration.x = 0;
                }
                if (wasRight(entityLastPosition, otherPosition, otherSize)) {
                    entityPosition.x = otherPosition.x + otherSize.width;
                    entityVelocity.x = 0;
                    entityAcceleration.x = 0;
                }
                if (wasAbove(entityLastPosition, entitySize, otherPosition)) {
                    entityPosition.y = otherPosition.y - entitySize.height;
                    entityVelocity.y = 0;
                    entityAcceleration.y = 0;
                    game.entities.set(entity, "grounded", true);
                }
                if (wasBelow(entityLastPosition, otherPosition, otherSize) && game.entities.get(other,"item")) {
                    entityPosition.y = otherPosition.y + otherSize.height;
                    entityVelocity.y = 0;
                    entityAcceleration.y = 0;
										if (!game.entities.get(other,"used")) {
											var oscillate = game.entities.get(other, "oscillate");

											game.entities.set(other,"activated", true);
											game.entities.set(other, "selectedIndex", 0);
											game.entities.set(other, "navigable", false);
											var timers = game.entities.get(other,"timers");
											timers.navigable.running = true;
											oscillate.running = true;
											game.pause = true;
											//timers.managePauseTemp.running = true;
										}
                }
            } else if (game.entities.get(other,"ghost")) {
                //var knockBack = require("./handleKnockBackCollision");
                //knockBack(entity, other, game);

            }
        }

    }, "playerCollisions");
    ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars

        collisions = game.entities.get(entity, "collisions");
        entityPosition = game.entities.get(entity, "position");
        entitySize = game.entities.get(entity, "size");
        entityVelocity = game.entities.get(entity, "velocity");
        entityAcceleration = game.entities.get(entity, "acceleration");
        entityLastPosition = game.entities.get(entity, "lastPosition");

        for (var i = 0; i < collisions.length; i++) {
            other = collisions[i];
            if (game.entities.get(other,"ghost")) {
                //Todo: handle ghost animation
                game.entities.destroy(other);
                game.entities.destroy(entity);
            } else if (game.entities.get(other,"standable")) {
                //TOdo: handle wall collisions
                game.entities.destroy(entity);
            }
            //Todo: handle ink animation
        }
    }, "shotCollisions");
};
