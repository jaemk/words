from django.shortcuts import render

from hangman.models import Word

from django.shortcuts import render
from django.http import HttpResponse as httpresp


def main(request):
    return httpresp('main view')


def get_word(request):
    return httpresp('new word')


