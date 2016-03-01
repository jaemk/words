from django.db import models

from random import randint


class RandomWordManager(models.Manager):
    def get_queryset(self):
        # add total word count cache?
        total = super(RandomWordManager, self).get_queryset().count()
        rand_id = randint(1, total)
        return super(RandomWordManager, self).get_queryset().get(pk=rand_id)


class Word(models.Model):
    text = models.CharField(max_length=500)
    definition = models.CharField(max_length=500, null=True)

    objects = models.Manager()
    random = RandomWordManager()

    def __repr__(self):
        return '<Word: {}>'.format(self.text)

    def __str__(self):
        return 'Word: {}'.format(self.text)

