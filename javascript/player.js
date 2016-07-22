const Song = require('./song.js'),
      readline = require('readline');


const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Player = function () {
  this.chordCount = 0
};

Player.prototype.play = function () {
  console.log("Hooray! I'm so proud of you for practicing!");
  this.startTime = Date.now();
  this.selectDifficulty(difficultySelected);

  const self = this;
  function difficultySelected() {
    self.playNewSong(songPlayed);

    function songPlayed() {
      self.playAgainChoice(choiceMade);

      function choiceMade(answer) {
        switch (answer) {
          case 'a':
            self.replay(songPlayed);
            break;
          case 'b':
            self.selectDifficulty(difficultySelected);
            break;
          case 'c':
            self.endPractice();
            break;
        }
      }
    }
  }
};

Player.prototype.selectDifficulty = function (completionCallback) {
  reader.question('Please select a difficulty: hard(h) or easy(e).\n', processAnswer)

  function repromt() {
    reader.question("I'm afraid that wasn't quite right - try tapping 'h' or 'e' again! Then hit enter.\n", processAnswer)
  }

  function processAnswer(answer) {
    if (['h', 'e'].indexOf(answer) < 0) {
      repromt();
    } else {
      this.difficulty = (answer === 'h') ? 'hard' : 'easy';
      completionCallback();
    }
  }

};

Player.prototype.playNewSong = function (completionCallback) {
  this.currentSong = new Song(this.difficulty);
  this.chordCount += this.currentSong.length();
  this.currentSong.render(completionCallback);
};

Player.prototype.replay = function (completionCallback) {
  this.currentSong.render(completionCallback);
  this.chordCount += this.currentSong.length();
};

Player.prototype.playAgainChoice = function (completionCallback) {
  reader.question('Would you like to try that song again (a), play a new song (b), or are you done for the day (c)?\n', processAnswer)

  function repromt() {
    reader.question("I'm afraid that wasn't quite right - try tapping a, b, or c again! Then hit enter.\n", processAnswer)
  }

  function processAnswer(answer) {
    if (['a', 'b', 'c'].indexOf(answer) < 0) {
      repromt();
    } else {
      completionCallback(answer);
    }
  }
};

Player.prototype.endPractice = function () {
  this.endTime = new Date();
  reader.close()
  console.log(`Great job practiciting! You played for ${(this.endTime - this.startTime)/(1000*60)} minutes and played ${this.chordCount} chords!`);
};


module.exports = Player;
