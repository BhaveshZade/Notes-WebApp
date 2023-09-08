from django.urls import path
from .views import *

urlpatterns = [
    path('notes/', getNotes, name = 'get-notes'),
    path('note/<str:pk>', getNote, name = 'get-note'),
    path('create/', createNote, name = 'create-note'),
    path('update/<str:pk>', updateNote, name = 'update-note'),
    path('delete/<str:pk>', deleteNote, name = 'delete-note'),
]