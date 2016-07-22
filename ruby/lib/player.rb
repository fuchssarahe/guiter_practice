require_relative 'song'

class Player
  def initialize
    @chord_count = 0
  end

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

  def select_difficulty
    puts 'Please select a difficulty: hard(h) or easy(e).'
    input = gets.chomp
    until ['h', 'e'].include?(input)
      puts "I'm afraid that wasn't quite right - try tapping 'h' or 'e' again! Then hit enter."
      input = gets.chomp
    end
    @difficulty = (input == 'h') ? 'hard' : 'easy'
  end

  def play_new_song
    @current_song = Song.new(@difficulty)
    @current_song.render
    @chord_count += @current_song.length
  end

  def replay
    @current_song.render
    @chord_count += @current_song.length
  end

  def play_again_choice
    puts 'Would you like to try that song again (a), play a new song (b), or are you done for the day (c)?'
    input = gets.chomp
    until ['a', 'b', 'c'].include?(input)
      puts "I'm afraid that wasn't quite right - try tapping a, b, or c again! Then hit enter."
      input = gets.chomp
    end
    input
  end

  def end_practice
    @end_time = Time.new
    puts "Great job practiciting! You played for #{(@end_time - @start_time)/60} minutes and played #{@chord_count} chords!"
  end

end
