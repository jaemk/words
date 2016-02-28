from __future__ import absolute_import
from __future__ import print_function
import io

import os
from hangman.models import Word

WORD_FILE = 'words.txt'
LOC = os.path.normpath(os.path.dirname(os.path.realpath(__file__)))
print(LOC)


def add_words():
    count = 0
    with io.open(os.path.join(LOC, WORD_FILE), 'r') as f:
        for line in f:
            word = line.strip('\n').strip().lower()
            if "'" in word or Word.objects.filter(text=word).exists():
                print('skipping: {}'.format(word))
                continue

            new_word = Word(text=word)
            new_word.save()
            count += 1
            print('Added: {:<15}, words: {}'.format(word, count))


def main():
    try:
        add_words()
    except Exception as e:
        print(e)
        print('exit on exception, added: {}'.format(count))


if __name__ == '__main__':
    main()
