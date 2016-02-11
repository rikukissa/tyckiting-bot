"use strict";

var _ = require("lodash");
var position = require("../../position.js");

// Change botNames and teamName to your choice.
var botNames = [
  "Zero",
  "One",
  "Two"
];



function isAlive(bot) {
  return bot.alive;
}

module.exports = function Ai() {
  function makeDecisions(roundId, events, bots, config) {

    var totalSize = config.fieldRadius * 2;
    var radius = config.fieldRadius - config.radar;

    var enemyDetectedEvent = _.findWhere(events, {event: 'see'}) ||
      _.findWhere(events, {event: 'radarEcho'});

    var shouldMoveEvent = _.findWhere(events, {event: 'damaged'}) ||
      _.findWhere(events, {event: 'detected'});

    bots
    .filter(isAlive)
    .forEach(function(bot, i) {
      var x, y;

      // if(shouldMoveEvent && shouldMoveEvent.botId === bot.botId) {
      //   var maxMove = config.move;
      //   var x = bot.x + maxMove - maxMove * (Math.floor(Math.random() * maxMove));
      //   var y = bot.y + maxMove - maxMove * (Math.floor(Math.random() * maxMove));

      //   return bot.move(x, y);
      // }

      // if(enemyDetectedEvent) {
      //   return bot.cannon(enemyDetectedEvent.pos.x, enemyDetectedEvent.pos.y);
      // }

      if(i === 0) {
        y = -radius + (roundId % radius * 2);
        return bot.radar(y / 2, y);
      }

      if(i === 1) {
        y = -radius + (roundId % radius * 2);
        x = Math.max(-radius, -(y + radius));
        return bot.radar(x, y);
      }

      if(i === 2) {
        y = -radius + (roundId % radius * 2)
        x = Math.min(radius, radius - y)//Math.min(radius, (y + radius))
        return bot.radar(x, y);
      }
    });

    // _.each(events, function(event) {
    //   if (event.event === "noaction") {
    //     console.log("Bot did not respond in required time", event.data);
    //   }
    // });
  }

  function randInt(min, max) {
    var range = max - min;
    var rand = Math.floor(Math.random() * (range + 1));
    return min + rand;
  }

  return {
    // The AI must return these three attributes
    botNames: botNames,
    makeDecisions: makeDecisions
  };
};
