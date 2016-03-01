from __future__ import absolute_import
from __future__ import print_function
import io

import os
import json
from hangman.models import Word

WORD_FILE = 'words.txt'
DICTIONARY_FILE = 'dictionary.json'

LOC = os.path.normpath(os.path.dirname(os.path.realpath(__file__)))


def add_defs():
    with io.open(os.path.join(LOC, DICTIONARY_FILE), 'r') as f:
        info = json.load(f)
    for word in Word.objects.all():
        word_text = word.text.upper()
        if word_text in info:
            word_def = info[word_text].split('.')[0].encode('utf8')[:499]
            word.definition = word_def
            word.save()
            print('{}: {}'.format(word_text, word_def))


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
