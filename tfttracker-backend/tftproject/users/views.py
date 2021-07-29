from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .models import User
import json


def queryDict_to_String(queryDict):
    temp_var = json.loads(queryDict.dict()['0'])
    return temp_var


# functional views
@api_view(['GET'])
def saveUser(request):
    paramDict = queryDict_to_String(request.query_params)
    username = paramDict['username']
    resolution = paramDict['resolution']
    canLogin = False
    try:
        newUser = User.objects.get(username=username)
        newUser.resolution = resolution
        newUser.save()
        canLogin = True
    except ObjectDoesNotExist:
        newUser = User(username=username, resolution=resolution)
        newUser.save()
        message = 'New User Saved!'
    return Response({
        'message': message
    })
