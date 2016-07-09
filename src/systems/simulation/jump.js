"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("playerAcceleration", ["player", "acceleration"]);
    ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
        // var acceleration = game.entities.get(entity, "acceleration");
        // var animation = game.entities.get(entity, "animation");
        // if (game.entities.get(entity, "grounded")) {
        //     if (game.inputs.button("up") && game.entities.get(entity, "isControllable")) {
        //         acceleration.y = -0.195;
        //         animation.name = "baby-jump";
        //     }
        // } else {
        //     acceleration.y += 0.003;
        // }
    }, "playerAcceleration");
};
