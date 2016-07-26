class Chord
  attr_reader :children, :parent, :chord, :modifier, :strings

  def initialize(chord_options, parent = nil)
    if chord_options.is_a?(Hash)
      @chord = chord_options['chord']
      @modifier = chord_options['modf']
      @strings = {"e2"=>chord_options['e2'], "b"=>chord_options['b'], "g"=>chord_options['g'], "d"=>chord_options['d'], "a"=>chord_options['a'], "e"=>chord_options['e']}
    else
      @chord = chord_options
    end

    @children = []
    if parent
      parent.add_child(self)
    end
  end

  def add_child(node)
    if node.parent
      node.parent.remove_child(node)
    end
    @children.push(node)
    node.parent = self
  end

  def remove_child(node)
    @children.delete(node)
  end

  def parent=(new_parent)
    @parent = new_parent
  end

  def ==(node)
    self.chord == node.chord && self.modifier == node.modifier
  end

  def render
    puts '    ' + self.chord + self.modifier
    potential_strings = ["e", "a", "d", "g", "b", "e2"]
    (1..11).each do |fret|
      line = fret.to_s + ' '
      if fret < 10
        line = '0' + line
      end
      potential_strings.each do |string|
        value = @strings[string]
        if value == fret.to_s
          line += ' o'
        elsif value == 'x'
          line += ' x'
        else
          line += ' |'
        end
      end
      puts line
    end
  end

  def matches_critera(chord_options)
    chord_options.each do |option, value|
      return false unless value == self.send(option)
    end
    true
  end

end
