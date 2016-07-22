const ChordData = require('./chord_data.js'),
      Chord = require('./chord.js');

const PotentialChords = function () {
  this.head = new Chord();
  this.buildTree();
}

PotentialChords.BASE_CHORDS = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']
PotentialChords.SPECIAL_CHORDS = ['A/C#', 'A/E', 'A/F', 'A/G', 'A/G#', 'Am/C', 'Am/E', 'Am/F',
                  'Am/F#', 'Am/G', 'Am/G#', 'C/E', 'C/F', 'C/G', 'D/A', 'D/B',
                  'D/Bb', 'D/C', 'D/F#', 'E/B', 'E/C#', 'E/D', 'E/D#', 'E/F',
                  'E/F#', 'E/G', 'E/G#', 'Em/B', 'Em/C#', 'Em/D', 'Em/D#',
                  'Em/F', 'Em/F#', 'Em/G', 'Em/G#', 'F/A', 'F/C', 'F/D', 'F/D#',
                  'F/E', 'F/G', 'Fm/C', 'G/B', 'G/D', 'G/E', 'G/F', 'G/F#']

PotentialChords.prototype.buildTree = function () {
  potential_chords = ChordData.data
  PotentialChords.BASE_CHORDS.forEach( chord => {
    this.head.addChild( new Chord(chord) )
  })
  this.head.children.forEach( child => {
    potential_chords.forEach( potential_chord => {
      if (potential_chord.chord.match(/`${child}`/) >= 0) {
        new Chord(potential_chord, child);
      }
    })
  })
};

PotentialChords.prototype.randomChord = function () {
  let randomIdx = Math.floor(Math.random()*PotentialChords.BASE_CHORDS.length);
  const cordFamily = PotentialChords.BASE_CHORDS[randomIdx];
  const potentialChords = this.chordsInFamily(cordFamily);
  randomIdx =  Math.floor(Math.random()*potentialChords.length);
  return potentialChords[randomIdx];
};


PotentialChords.prototype.randomEasyChord = function () {
  let randomIdx = Math.floor(Math.random()*PotentialChords.BASE_CHORDS.length);
  const cordFamily = PotentialChords.BASE_CHORDS[randomIdx];
  const potentialChords = this.findWhere({modifier: 'major'});
  randomIdx =  Math.floor(Math.random()*potentialChords.length);
  return potentialChords[randomIdx];
};

PotentialChords.prototype.chordsInFamily = function (family) {
  this.head.children.forEach( noteFamily => {
    if (noteFamily.chord === family) {
      return noteFamily.children;
    }
  })
  return [];
};

PotentialChords.prototype.findWhere = function (chordOptions) {
  const matchingNodes = [];
  this.head.children.forEach( noteFamily => {
    noteFamily.children.forEach( chord => {
      if (chord.meetsCriteria(chordOptions)) {
        matchingNodes.push(chord);
      }
    })
  })
  return matchingNodes;
};

module.exports = PotentialChords;
