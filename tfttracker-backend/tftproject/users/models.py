from django.db import models

USER_RESOLUTION = [
    ('1920x1080', '1080p'),
    ('2560x1440', '1440p'),
]


class User(models.Model):
    username = models.CharField(max_length=16, unique=True)
    resolution = models.CharField(
        max_length=9,
        choices=USER_RESOLUTION,
        default=''
    )
