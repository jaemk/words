from django.shortcuts import render
from django.http import HttpResponse as httpresp

from hangman.models import Word

import json


def main(request):
    """ render main page """
    return render(request, 'hangman/main.html')


def get_word(request):
    """ get a random word for ajax requests """
    word = Word.random.all()
    data = {'word': word.text}
    return httpresp(json.dumps(data), content_type='application/json')


def get_definition(request, word_text):
    """ get word defintion """
    word = Word.objects.filter(text=word_text)
    word_def = ''
    if word.exists():
        word_def = word[0].definition

    data = {'definition': word_def}
    return httpresp(json.dumps(data), content_type='application/json')

