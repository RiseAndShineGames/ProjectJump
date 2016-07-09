"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("playerVelocity", ["player", "velocity"]);
    ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
        //var image = game.entities.get(entity, "image");
        // var grounded = game.entities.get(entity, "grounded");
        // var velocity = game.entities.get(entity, "velocity");
        // var state = game.entities.get(entity,"adult") ? "adult" : "baby";
        // var isControllable = game.entities.get(entity, "isControllable");
        // if (game.entities.get(entity, "isControllable")) {
        //     if (grounded) {
        //         if (velocity.x > 0) {
        //             animation.name = state + "-idle-right";
        //         } else {
        //             animation.name = state + "-idle-left";
        //         }
        //         if (game.inputs.button("left") && isControllable) {
        //             animation.name = state + "-walk-left";
        //             game.entities.set(entity, "wasRight", false);
        //         } else if (game.inputs.button("right") && isControllable) {
        //             animation.name = state + "-walk-right";
        //             game.entities.set(entity, "wasRight", true);
        //         }
        //     } else {
        //         if (velocity.x > 0) {
        //             animation.name = state + "-jump-right";
        //         } else {
        //             animation.name = state + "-jump-left";
        //         }
        //     }
        // }

    }, "playerVelocity");
};
