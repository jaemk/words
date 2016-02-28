from django.shortcuts import render
from django.http import HttpResponse as httpresp

from hangman.models import Word

import json


def main(request):
    ''' render main page '''
    return render(request, 'hangman/main.html')


def get_word(request):
    ''' get a random word for ajax requests '''
    word = Word.random.all()
    data = {'word': word.text}
    return httpresp(json.dumps(data), content_type='application/json')

