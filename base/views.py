from django.http import JsonResponse
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['GET'])
def getNotes(request):
    notes = NoteModel.objects.all()
    serializer = NoteSerializer(notes, many = True)

    return Response(serializer.data)

@api_view(['GET'])
def getNote(request, pk):
    note = NoteModel.objects.get(id = pk)
    serialzier = NoteSerializer(note, many = False)

    return Response(serialzier.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = NoteModel.objects.create(
        body = data['body']
    )
    serializer = NoteSerializer(note, many = False)

    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    note = NoteModel.objects.get(id = pk)
    serializer = NoteSerializer(instance = note, data = data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request, pk):
    note = NoteModel.objects.get(id = pk)
    note.delete()

    return Response('Note Deleted')