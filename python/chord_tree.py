import chord_data
from chord import Chord
import random

class PotentialChords(object):
    """tree containing all potential chords"""
    BASE_CHORDS = 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'
    SPECIAL_CHORDS = 'A/C#', 'A/E', 'A/F', 'A/G', 'A/G#', 'Am/C', 'Am/E', 'Am/F', 'Am/F#', 'Am/G', 'Am/G#', 'C/E', 'C/F', 'C/G', 'D/A', 'D/B', 'D/Bb', 'D/C', 'D/F#', 'E/B', 'E/C#', 'E/D', 'E/D#', 'E/F', 'E/F#', 'E/G', 'E/G#', 'Em/B', 'Em/C#', 'Em/D', 'Em/D#', 'Em/F', 'Em/F#', 'Em/G', 'Em/G#', 'F/A', 'F/C', 'F/D', 'F/D#', 'F/E', 'F/G', 'Fm/C', 'G/B', 'G/D', 'G/E', 'G/F', 'G/F#'

    def __init__(self):
        self.head = Chord(None, None)
        self.build_tree()

    def build_tree(self):
        potential_chords = chord_data.data
        for notes in PotentialChords.BASE_CHORDS:
            self.head.add_child(Chord(notes, None))
        for child in self.head.children:
            for potential_chord in potential_chords:
                if child.chord in potential_chord['chord']:
                    Chord(potential_chord, child)

    def random_chord(self):
        chord_family = PotentialChords.BASE_CHORDS[random.randrange(0, len(PotentialChords.BASE_CHORDS))]
        potential_chords = self.chords_in_family(chord_family)
        return potential_chords[random.randrange(0, len(potential_chords))]

    def random_easy_chord(self):
        chord_family = PotentialChords.BASE_CHORDS[random.randrange(0, len(PotentialChords.BASE_CHORDS))]
        potential_chords = self.find_where({'modifier': 'major'})
        return potential_chords[random.randrange(0, len(potential_chords))]

    def chords_in_family(self, family):
        for note_family in self.head.children:
            if note_family.chord == family:
                return note_family.children

    def find_where(self, chord_options):
        matching_nodes = []
        for note_family in self.head.children:
            for chord in note_family.children:
                if chord.matches_critera(chord_options):
                    matching_nodes.append(chord)
        return matching_nodes
