"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
    game.scaleCanvasToFitRectangle(1280,960);

    var file = require("../data/Beach1.json");

    var importer = require("splat-ecs/lib/import-from-tiled.js");
    importer(file, game.entities);
    var player = 1;
    var camera = 0;

    var spawn_pos;
		// game.entities.set(player,"lives", game.arguments.lives);
		// game.entities.set(camera, "level", level);
    var spawn = game.entities.find("spawn");
    if (game.arguments.player_pos) {
        spawn_pos = game.arguments.player_pos;
    } else if (spawn.length > 0) {
        spawn_pos = game.entities.get(spawn, "position");
    } else {
        spawn_pos = { "x": 0, "y": 0 };
    }
    game.entities.set(player, "position", spawn_pos);
    var container = game.entities.find("container");
    game.entities.set(player, "constrainPosition", { "id": container });
    game.entities.set(camera, "constrainPosition", { "id": container });

		//set coin animations
		var score_coin = game.entities.find("coin_score");
		for (var i = 0; i < score_coin.length; i++) {
			game.entities.set(score_coin[i],"animation", {
				"time": 0,
				"frame": 0,
				"loop": true,
				"speed": 1,
				"name": "score_coin"
			});
		}
		//set up boxes
		var boxes = game.entities.find("item");
		for (var l = 0; l < boxes.length; ++l) {
			game.entities.set(boxes[l],"oscillate",
				{
					"running": false,
					"image": true,
					"duration": 0,
					"max": 200,
					"magnitudeY": 10,
					"standable": true,
					"used": false
				}
			);
			game.entities.set(boxes[l], "timers", {
				"navigable": {
					"running": false,
					"time": 0,
					"pauseExempt": true,
					"max": 200,
					"script": "./scripts/reset-navigable"
				}
			});
			game.entities.set(boxes[l],"standable",true);
		}

		//set enemies
		var enemy_spawn = game.entities.find("enemy_spawn");
		for (var k = 0; k < enemy_spawn.length; k++) {
			spawn_pos = game.entities.get(enemy_spawn[k], "position");
			var ghost = game.instantiatePrefab("ghost");
			var ghost_position = game.entities.get(ghost,"position");
			ghost_position.x = spawn_pos.x;
			ghost_position.y = spawn_pos.y + 30;
            ghost_position.z = spawn_pos.z;

		}
};
