require_relative 'chord_tree'

class Song
  attr_reader :chords

  def initialize(difficulty)
    @difficulty = difficulty
    @potential_chords = PotentialChords.new
    @chords = []
    until over?
      get_chord
    end
  end

  def get_chord
    if @difficulty == 'hard'
      @chords.push(@potential_chords.random_chord)
    else
      @chords.push(@potential_chords.random_easy_chord)
    end
  end

  def length
    @chords.length
  end

  def over?
    @chords.length > 5
    # && @chords.last == @chords.first
  end

  def render
    @chords.each do |chord|
      system('clear')
      chord.render
      sleep(1)
    end
  end

end
