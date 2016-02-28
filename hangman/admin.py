from __future__ import absolute_import
from django.contrib import admin
from hangman.models import Word


#class WordAdmin(admin.ModelAdmin):
#    pass


admin.site.register(Word)
