from django.test import TestCase

from hangman.models import Word

class SimpleWordTest(TestCase):
    def setUp(self):
        print('setup pass')

    def testWords(self):
        return Word.objects.filter(text__startswith='g').exists()
