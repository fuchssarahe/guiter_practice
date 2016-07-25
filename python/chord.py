class Chord(object):
    """chord class"""
    def __init__(self, chord_options, parent):
        if isinstance(chord_options, dict):
            self.chord = chord_options['chord']
            self.modifier = chord_options['modf']
            self.strings = {"e2": chord_options['e2'], "b": chord_options['b'], "g": chord_options['g'], "d": chord_options['d'], "a": chord_options['a'], "e": chord_options['e']}
        else:
            self.chord = chord_options
        self.children = []
        if parent == None:
            self.parent = None
        else:
            parent.add_child(self)

    def add_child(self, chord):
        if hasattr(chord, 'parent') and chord.parent != None:
            chord.parent.remove_child(chord)
        self.children.append(chord)
        chord.parent = self

    def remove_child(self, child):
        self.children.remove(child)

    def eq_to(self, chord):
        self.chord == chord.chord and self.modifier == chord.modifier

    def render(self):
        print('    ' + self.chord + self.modifier)
        potential_strings = "e2", "b", "g", "d", "a", "e"
        for fret in range(1, 12):
            line = str(fret) + ' '
            if fret < 10:
                line = '0' + line
            for string in potential_strings:
                value = self.strings[string]
                if value == str(fret):
                    line += ' o'
                elif value == 'x':
                    line += ' x'
                else:
                    line += ' |'
            print(line)

    def matches_critera(self, chord_options):
        for option in chord_options:
            if chord_options[option] != getattr(self, option):
                return False
        return True
