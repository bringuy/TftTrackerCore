from django.db import models
from users.models import User

DEAD = 'DE'
RECENTLY_PLAYED = 'RP'
ABOUT_TO_PLAY = 'ATP'
ENEMY_STATUS = [
    (DEAD, 'Dead'),
    (RECENTLY_PLAYED, 'Recently Played'),
    (ABOUT_TO_PLAY, 'About to Play')
]


class Enemy(models.Model):
    username = models.CharField(max_length=16, unique=True, primary_key=True)
    health_points = models.SmallIntegerField(default=100)
    enemy_status = models.CharField(
        max_length=3,
        choices=ENEMY_STATUS,
        default=ABOUT_TO_PLAY
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="", editable=False)
