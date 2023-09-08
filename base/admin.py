from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(NoteModel)
class NoteAdmin(admin.ModelAdmin):
    fields = ['body']
    list_display = ['body', 'updated', 'created']