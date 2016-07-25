# Guitar Practicer

## The Vision
Guitar Practicer is a command-line tool designed to teach musicians new guitar chords. The user plays chords in small batches, selecting the difficulty of the chords, whether they want to play chords again, or would like to try new chords. The same project is currently implemented in three different languages - Ruby, JavaScript, and Python.

## The Future
Moving forward, I'll continue to add new implementations of this project in various languages to this repo. Because the project touches on so many core programming concepts, it's a great way to pick up the syntax for many programming languages. I'm most excited to write the application using a functional language. As the current logic of the tool is heavily object-oriented, the functional approach will most certainly look quite a bit different.

## Tools
  - Ruby
  - JavaScript
  - Python

## Interesting Tidbits
### Major differences between implementations
As synchronous languages, Ruby and Python have fairly similar implementations. The JavaScript implementation, however, relies heavily on nested callbacks in order to interface with the user appropriately. These differences are most apparent in the `play` function found in the `Player` class.

```javascript
// /javascript/player.js

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
```
Note that the Ruby and Python versions of this function require fail-safes of a sort, calling `end_practice` or `play_again_choice` in order to accommodate the `until`/`while` loops in the function. Because the Javascript version of the function relies on the callbacks, this looping is unnecessary.

```ruby
# /ruby/player.rb
def play
  puts "Hooray! I'm so proud of you for practicing!"

  select_difficulty
  @start_time = Time.new
  play_new_song

  input = play_again_choice

  until input == 'c'
    case input
    when 'a'
      replay
    when 'b'
      select_difficulty
      play_new_song
    when 'c'
      end_practice
    end

    input = play_again_choice
  end

  end_practice
end
```

### Tree structure for guitar chords
Each time the application is run, all possible chords are placed within a tree structure. This allows for faster filtering of chords as potential candidates for inclusion in a song.

## Instructions
- **JavaScript**:
Download node (written for v6.2.0) and run `node run_practice.js` from within the project's `javascript` directory
- **Ruby**:
Download ruby (written for v2.2.3) and run `ruby run_practice.rb` from within the project's `ruby` directory
- **Python**:
Download python (written for v2.7.10) and run `python run_practice.py` from within the project's `python` directory

<!--
# Notes:

- conditions for a song to be over?
- song ends on the same chord as it starts
- song must be at least 35 chords long

- conditions for a valid chord
- chord must be played no more than 4 times in a row

- what constitutes an easy path
- number of chords cannot exceed 4
- chords cannot have modifiers other than minor and major
- no special chords can be included

- what constitutes a medium path
- number of chords cannot exceed 7
- between 1 and 3 chords should have modifiers other than minor and major
- songs contain one special chord

- what constitutes a hard path
- number of chords must exceed 4
- at least 3 chords must have modifiers other than minor and major
- songs contain 2 special chords -->


## Resources
- All chord data was collected using the following API:  http://pargitaru.id.lv/api/?request=chords&chord=Ab
