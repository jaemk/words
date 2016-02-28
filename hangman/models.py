from django.db import models


class Word(models.Model):
    text = models.CharField(max_length=500)

    def __repr__(self):
        return '<Word: {}>'.format(self.text)

    def __str__(self):
        return 'Word: {}'.format(self.text)
