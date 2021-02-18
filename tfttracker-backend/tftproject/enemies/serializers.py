from rest_framework import serializers
from enemies.models import Enemy


class EnemySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enemy
        fields = ['username', 'health_points', 'enemy_status']
