from django.test import TestCase

from hangman.models import Word

class SimpleWordTest(TestCase):
    def setUp(self):
        new_word = Word(text='gob')
        new_word.save()

    def testWords(self):
        self.assertTrue(Word.objects.filter(text__startswith='g').exists())

class RandomWordTest(TestCase):
    def setUp(self):
        new_word = Word(text='blob')
        new_word.save()
        new_word = Word(text='gob')
        new_word.save()

    def testRandomWord(self):
        word = Word.random.all()
        self.assertTrue(word.text in ['blob', 'gob'])
