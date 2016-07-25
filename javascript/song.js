const PotentialChords = require('./chord_tree.js');

const Song = function (difficulty) {
  this.difficulty = difficulty;
  this.potentialChords = new PotentialChords();
  this.chords = [];

  while (!this.isOver()) {
    this.getChord();
  };
};

Song.prototype.getChord = function () {
  if (this.difficulty === 'hard') {
    this.chords.push(this.potentialChords.randomChord());
  } else {
    this.chords.push(this.potentialChords.randomEasyChord());
  }
};

Song.prototype.length = function () {
  return this.chords.length;
};

Song.prototype.isOver = function () {
  return this.chords.length > 5;
  //   && this.chords[-1].eqTo(this.chords[0])
};

Song.prototype.render = function (completionCallback) {
  console.log(this.chords);
  this.chords.forEach( (chord, i) => {
    const endIdx = this.chords.length - 1;
    setTimeout(() => {
      console.log('\033c');
      chord.render();
        if (i == endIdx) {
          console.log('we`re at the end!' );
          completionCallback()
        };
      }, 1000*i)
  });
};

module.exports = Song;
