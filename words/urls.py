from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from hangman import urls as hangman_urls

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'words.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'words/hangman/', include(hangman_urls)),

    url(r'^admin/', include(admin.site.urls)),
)
