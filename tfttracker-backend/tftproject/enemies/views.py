from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .models import Enemy
from users.models import User
from .serializers import EnemySerializer
from Naked.toolshed.shell import execute_js
from fuzzywuzzy import fuzz
import math
import json
# Vision Api
import os
import io
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
# Cropping Image
from PIL import Image


# helper functions
def is_number(var):
    try:
        float(var)
        return True
    except ValueError:
        return False


def queryDict_to_String(queryDict):
    temp_var = json.loads(queryDict.dict()['0'])
    return temp_var


# deletes all users in database
@api_view(['GET'])
def restart(request):
    Enemy.objects.all().delete()
    return Response({
        'message': 'All Enemies Deleted'
    })


@api_view(['GET'])
def getSidebarPlayers(request):
    # SETUP TO GET SIDEBAR IMAGE
    os.environ[
        'GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot/ServiceAccountToken.json'

    client = vision_v1.ImageAnnotatorClient()

    paramDict = queryDict_to_String(request.query_params)
    username1 = paramDict['username']
    width = 0
    height = 0
    user = User.objects.get(username=username1)
    print(user.resolution)
    if user.resolution == '1920x1080':
        width = 1920
        height = 1080
    elif user.resolution == '2560x1440':
        width = 2560
        height = 1440

    success = execute_js('./screenshot/screenshot.js')
    if success:
        print('hello')
    else:
        print('goodbye')

    file_name = '../screenshot/image.png'
    image_path = f'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot/{file_name}'

    # cropping image
    im1 = Image.open(image_path)
    # change these depending on user's screen
    left = width * .89
    top = height * .16
    right = width * 1
    bottom = height * .74

    new_image_path = f'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot' \
                     f'/sidebar.png'
    im_crop = im1.crop((left, top, right, bottom))
    im_crop.save(new_image_path, 'PNG')

    with io.open(new_image_path, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)
    response = client.document_text_detection(image=image)
    texts = response.text_annotations

    enemies = []
    username = ''
    x_index_health = math.floor(width * 0.066)  # stores coordinates of enemy health
    # print(x_index_health)
    x_index_user_health = math.floor(width * 0.058)  # stores coordinates of user health (start and end)
    # print(x_index_user_health)
    # if its a number check the vertex if its enemy health of user health or none

    for i in range(1, len(texts)):
        # print(username)
        if is_number(texts[i].description):
            health = float(texts[i].description)
            x_vertex_beginning = texts[i].bounding_poly.vertices[0].x
            x_vertex_ending = texts[i].bounding_poly.vertices[1].x
            # print(health)
            # print(x_vertex_beginning)
            # print(x_vertex_ending)
            if x_vertex_ending > x_index_health:  # makes sure
                # current user's hp isn't being tracked
                # print(health)
                enemy = Enemy.objects.create(username=username, health_points=health, enemy_status='ATP', user=user)
                enemy.save()
                enemies.append(enemy)
                username = ''
            elif x_vertex_ending >= x_index_user_health:
                # do nothing here!
                print('hi')
            else:
                username += texts[i].description
        else:
            username += texts[i].description
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

    list_of_enemies = Enemy.objects.all()
    serializer = EnemySerializer(list_of_enemies, many=True)
    # print(serializer.data)
    return Response({'enemies': serializer.data})


# updates database with players, specifically:
# parameter: username of enemy you're currently playing against (THIS VERSION IS WITHOUT THE MAIN BOARD SCREENSHOT)
@api_view(['GET'])
def updateSidebarPlayers(request):
    paramDict = queryDict_to_String(request.query_params)
    enemyPlayed = paramDict['enemyPlayed']
    enemyTracker = paramDict['enemyTracker']

    # SETUP TO GET SIDEBAR IMAGE
    os.environ[
        'GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot/ServiceAccountToken.json'

    client = vision_v1.ImageAnnotatorClient()

    paramDict = queryDict_to_String(request.query_params)
    username1 = paramDict['username']
    width = 0
    height = 0
    user = User.objects.get(username=username1)
    if user.resolution == '1920x1080':
        width = 1920
        height = 1080
    elif user.resolution == '2560x1440':
        width = 2560
        height = 1440

    success = execute_js('./screenshot/screenshot.js')
    if success:
        print('hello')
    else:
        print('goodbye')

    file_name = '../screenshot/image.png'
    image_path = f'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot/{file_name}'

    # cropping image
    im = Image.open(image_path)
    # change these depending on user's screen
    left = width * .89
    top = height * .16
    right = width * 1
    bottom = height * .74

    new_image_path = f'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot' \
                     f'/sidebar.png'
    im_crop = im.crop((left, top, right, bottom))
    im_crop.save(new_image_path, 'PNG')

    with io.open(new_image_path, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)
    response = client.document_text_detection(image=image)
    texts = response.text_annotations

    matchmaking_data = [(7, 4), (6, 3), (5, 2), (4, 1)]  # this players alive and players
    alive_players = Enemy.objects.exclude(enemy_status='DE').count()
    max_not_played = 0
    for i in range(len(matchmaking_data)):
        if matchmaking_data[i][0] == alive_players:
            max_not_played = matchmaking_data[i][1]
    enemyTracker.append(enemyPlayed)
    x_index_health = math.floor(width * 0.066)  # stores coordinates of enemy health
    # print(x_index_health)
    x_index_user_health = math.floor(width * 0.058)  # stores coordinates of user health (start and end)
    # print(x_index_user_health)
    username = ''
    enemies = Enemy.objects.all()

    # if its a number check the vertex if its enemy health of user health or none

    for i in range(1, len(texts)):
        # print(texts[i].description)
        if is_number(texts[i].description) or texts[i].description.lower() == 'o':
            if texts[i].description.lower() == 'o':
                health = 0
            else:
                health = int(texts[i].description)
            # x_vertex_beginning = texts[i].bounding_poly.vertices[0].x
            x_vertex_ending = texts[i].bounding_poly.vertices[1].x
            # print(health)
            # print(x_vertex_ending)
            if x_vertex_ending >= x_index_health:  # makes sure current user's hp isn't being tracked
                # update enemy's hp
                try:
                    updated_enemy = Enemy.objects.get(username=username)  # get enemy from db
                except ObjectDoesNotExist:
                    for enemy in enemies:
                        ratio = fuzz.ratio(enemy.username, username)
                        if ratio > 60:
                            updated_enemy = Enemy.objects.get(username=enemy.username)
                            break
                if updated_enemy.username == enemyPlayed:
                    # checking if the first round of players have been played before repeats
                    if len(enemyTracker) >= max_not_played:
                        updated_enemy_2 = Enemy.objects.get(username=enemyTracker[0])
                        updated_enemy_2.enemy_status = 'ATP'
                        updated_enemy_2.save()
                        enemyTracker.pop(0)
                    updated_enemy.enemy_status = 'RP'
                if health <= 0:
                    updated_enemy.health_points = -99
                    updated_enemy.enemy_status = 'DE'
                else:
                    updated_enemy.health_points = health
                updated_enemy.save()
                # resetting username
                username = ''
            elif x_vertex_ending > x_index_user_health:
                # reset username here
                username = ''
            else:
                username += texts[i].description
        else:
            username += texts[i].description
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

    list_of_enemies = Enemy.objects.filter(enemy_status='ATP', user=user)
    serializer = EnemySerializer(list_of_enemies, many=True)

    return Response({'enemies': serializer.data, 'playingOrder': enemyTracker})


@api_view(['GET'])
def getEnemyAgainst(request):
    temp_username = json.loads(request.query_params.dict()['0'])
    username = temp_username['username']

    os.environ[
        'GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot/ServiceAccountToken.json'

    client = vision_v1.ImageAnnotatorClient()

    file_name = '../screenshot/image.png'
    image_path = f'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot/{file_name}'

    success = execute_js('./screenshot/screenshot.js')
    if success:
        print('hello')
    else:
        print('goodbye')

    paramDict = queryDict_to_String(request.query_params)
    username1 = paramDict['username']
    width = 0
    height = 0
    user = User.objects.get(username=username1)
    if user.resolution == '1920x1080':
        width = 1920
        height = 1080
    elif user.resolution == '2560x1440':
        width = 2560
        height = 1440

    # cropping image
    im = Image.open(image_path)
    # change these depending on user's screen (gameboard dimensions)
    left = width * .16
    top = height * .035
    right = width * .86
    bottom = height * .81

    playing_username = ''

    new_image_path = f'C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot' \
                     f'/gameboard.png'
    im_crop = im.crop((left, top, right, bottom))
    im_crop.save(new_image_path, 'PNG')

    with io.open(new_image_path, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)
    response = client.document_text_detection(image=image)
    texts = response.text_annotations

    enemies = Enemy.objects.filter(user=user)
    enemies_username = []
    for enemy in enemies:
        enemies_username.append(enemy.username)

    maxRatio = 0
    maxLine = ''
    for line in texts[0].description.splitlines():
        for enemy in enemies:
            ratio = fuzz.ratio(enemy.username, line)
            if ratio > maxRatio and ratio > 60 and enemy.username is not username:
                maxRatio = ratio
                maxLine = enemy.username

    return Response({'enemyPlayed': maxLine})
