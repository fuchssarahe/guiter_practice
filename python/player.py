from song import Song
from time import time

class Player(object):
    """docstring for Player"""
    def __init__(self):
        self.chord_count = 0

    def play(self):
        print("Hooray! I'm so proud of you for practicing!")
        self.select_difficulty()
        self.start_time = time()
        self.play_new_song()
        answer = self.play_again_choice()
        while answer != 'c':
            if answer == 'a':
                self.replay()
            elif answer == 'b':
                self.select_difficulty()
                self.play_new_song()
            elif answer == 'c':
                self.end_practice()
            answer = self.play_again_choice()
        self.end_practice()

    def select_difficulty(self):
        answer = raw_input('Please select a difficulty: hard(h) or easy(e): ')
        while answer not in ['h', 'e']:
            answer = raw_input("I'm afraid that wasn't quite right - try tapping 'h' or 'e' again! Then hit enter: ")
        self.difficulty = 'hard' if answer == 'h' else 'easy'

    def play_new_song(self):
        self.current_song = Song(self.difficulty)
        self.current_song.render()
        self.chord_count += self.current_song.length()

    def replay(self):
        self.current_song.render()
        self.chord_count += self.current_song.length()

    def play_again_choice(self):
        answer = raw_input('Would you like to try that song again (a), play a new song (b), or are you done for the day (c)? ')
        while answer not in ['a', 'b', 'c']:
            answer = raw_input("I'm afraid that wasn't quite right - try tapping a, b, or c again! Then hit enter: ")
        return answer

    def end_practice(self):
        self.end_time = time()
        print("Great job practiciting! You played for " + str((self.end_time - self.start_time)/60) + " minutes and played " + str(self.chord_count) + " chords!")
