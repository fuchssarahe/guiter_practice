const Chord = function (chordOptions, parent) {
  if (chordOptions && chordOptions.chord) {
    this.chord = chordOptions.chord;
    this.modifier = chordOptions.modf;
    this.strings = {"e2": chordOptions['e2'], "b": chordOptions['b'], "g": chordOptions['g'], "d": chordOptions['d'], "a": chordOptions['a'], "e": chordOptions['e']}
  } else {
    this.chord = chordOptions
  }

  this.children = [];
  if (parent) {
    parent.addChild(this)
  }
};

Chord.prototype.addChild = function (chord) {
  if (chord.parent) {
    node.parent.removeChild(chord);
  }
  this.children.push(chord);
  chord.parent = this;
};

Chord.prototype.removeChild = function (chord) {
  const index = this.children.indexOf(chord)
  this.children.splice(index, 1)
};

Chord.prototype.eqTo = function (chord) {
  this.chord === chord.chord && this.modifier === chord.modifier;
};

Chord.prototype.render = function () {
  console.log('    ' + this.chord + this.modifier);
  const potentialStrings = ["e", "a", "d", "g", "b", "e2"];
  for (let fret = 1; fret < 12; fret++) {
    let line = fret + ' ';
    if (fret <10) {
      line = '0' + line;
    }
    potentialStrings.forEach( string => {
      const value = this.strings[string]
      switch (value) {
        case fret.toString():
          line += ' o'
          break;
        case 'x':
          line += ' x'
          break;
        default:
          line += ' |'
      }
    });
    console.log(line);
  }
};

Chord.prototype.meetsCriteria = function (chordOptions) {
  Object.keys(chordOptions).forEach( option => {
    const value = chordOptions[option];
    if (value !== this[option]) {
      return false;
    }
  })
  return true;
};

module.exports = Chord;
