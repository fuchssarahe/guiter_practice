require_relative "chord_data"
require_relative 'chord'

class PotentialChords
  attr_reader :head, :prev_song

  BASE_CHORDS = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']

  SPECIAL_CHORDS = ['A/C#', 'A/E', 'A/F', 'A/G', 'A/G#', 'Am/C', 'Am/E', 'Am/F',
                    'Am/F#', 'Am/G', 'Am/G#', 'C/E', 'C/F', 'C/G', 'D/A', 'D/B',
                    'D/Bb', 'D/C', 'D/F#', 'E/B', 'E/C#', 'E/D', 'E/D#', 'E/F',
                    'E/F#', 'E/G', 'E/G#', 'Em/B', 'Em/C#', 'Em/D', 'Em/D#',
                    'Em/F', 'Em/F#', 'Em/G', 'Em/G#', 'F/A', 'F/C', 'F/D', 'F/D#',
                    'F/E', 'F/G', 'Fm/C', 'G/B', 'G/D', 'G/E', 'G/F', 'G/F#']

  def initialize()
    @head = Chord.new(nil, nil)
    build_tree
  end

  def build_tree
    potential_chords = ChordData.data
    BASE_CHORDS.each do |chord|
      @head.add_child(Chord.new(chord, nil))
    end
    @head.children.each do |child|
      potential_chords.each do |potential_chord|
        next unless potential_chord['chord'].match(child.chord)
        Chord.new(potential_chord, child)
      end
    end
  end

  def random_chord
    chord_family = BASE_CHORDS[rand(BASE_CHORDS.length)]
    potential_chords = chords_in_family(chord_family)
    potential_chords[rand(potential_chords.length)]
  end

  def random_easy_chord
    chord_family = BASE_CHORDS[rand(BASE_CHORDS.length)]
    potential_chords = find_where(modifier: 'major')
    potential_chords[rand(potential_chords.length)]
  end

  protected
  def chords_in_family(family)
    @head.children.each do |note_family|
      next unless note_family.chord == family
      return note_family.children
    end
    nil
  end

  def find_where(chord_options)
    matching_nodes = []
    @head.children.each do |note_family|
      note_family.children.each do |chord|
        if (chord.matches_critera(chord_options))
          matching_nodes << chord
        end
      end
    end

    matching_nodes
  end

end

# base_chords: ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A ', 'A#', 'Bb', B]
# special_chords: ['A/C#', 'A/E', 'A/F', 'A/G', 'A/G#', 'Am/C', 'Am/E', 'Am/F', 'Am/F#', 'Am/G', 'Am/G#', 'C/E', 'C/F', 'C/G', 'D/A', 'D/B', 'D/Bb', 'D/C', 'D/F#', 'E/B', 'E/C#', 'E/D', 'E/D#', 'E/F', 'E/F#', 'E/G', 'E/G#', 'Em/B', 'Em/C#', 'Em/D', 'Em/D#', 'Em/F', 'Em/F#', 'Em/G', 'Em/G#', 'F/A', 'F/C', 'F/D', 'F/D#', 'F/E', 'F/G', 'Fm/C', 'G/B', 'G/D', 'G/E', 'G/F', 'G/F#']


# conditions for a song to be over?
# song ends on the same chord as it starts
# song must be at least 35 chords long

# conditions for a valid chord
# chord must be played no more than 4 times in a row

# what constitues an easy path
# number of chords cannot exceed 4
# chords cannot have modifiers other than minor and major
# no special chords can be included

# what constitues a medium path
# number of chords cannot exceed 7
# between 1 and 3 chords should have modifiers other than minor and major
# songs contain one special chord

# what constitues a hard path
# number of chords must exceed 4
# at least 3 chords must have modifiers other than minor and major
# songs contain 2 special chords
