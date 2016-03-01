from django.conf.urls import patterns, include, url

from hangman import views


urlpatterns = patterns('',
    url(r'^$', views.main, name='main'),
    url(r'^word/$', views.get_word, name='get_word'),
    url(r'^definition/(?P<word_text>[a-z0-9_-]+)/$', 
        views.get_definition, name='get_definition'),
)
