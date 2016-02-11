"use strict";

var botNames = [
  "Zero",
  "One",
  "Two"
];

module.exports = function Ai() {
  function makeDecisions(roundId, events, bots) {
    // fix hexgrid
    bots.forEach(function(bot) {
      var xMove = randInt(-2, 2);
      var yMove = randInt(-2, 2);
      bot.move(bot.x + xMove, bot.y + yMove);
    });
    console.log(events);
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
