import chord_tree
import os
import time
import chord

class Song(object):
    """docstring for Song"""
    def __init__(self, difficulty):
        self.difficulty = difficulty
        self.potential_chords = chord_tree.PotentialChords()
        self.chords = []
        while self.is_over() != True:
            self.get_chord()

    def get_chord(self):
        if self.difficulty == 'hard':
            self.chords.append(self.potential_chords.random_chord())
        else:
            self.chords.append(self.potential_chords.random_easy_chord())

    def length(self):
        return len(self.chords)

    def is_over(self):
        return self.length() > 5
        # and self.chords[-1].eq_to(self.chords[0])

    def render(self):
        for chord in self.chords:
            os.system('clear')
            chord.render()
            time.sleep(1)
