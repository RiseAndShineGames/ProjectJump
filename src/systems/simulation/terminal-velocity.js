"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("termVel",["terminalVelocity", "velocity"]);
    ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
        var velocity = game.entities.get(entity, "velocity");
        var terminalVelocity = game.entities.get(entity, "terminalVelocity");
        if (terminalVelocity.x != 0) {
            if (velocity.x > 0) {
                if (velocity.x >= terminalVelocity.x) {
                    velocity.x = terminalVelocity.x;
                }
            } else {
                if (velocity.x <= terminalVelocity.x) {
                    velocity.x = terminalVelocity.x;
                }
            }
        }
        if (terminalVelocity.y != 0) {
            if (velocity.y > 0) {
                if (velocity.y >= terminalVelocity.y) {
                    velocity.y = terminalVelocity.y;
                }
            } else {
                if (velocity.y <= -terminalVelocity.y) {
                    velocity.y = -terminalVelocity.y;
                }
            }
        }
    }, "termVel");
};
