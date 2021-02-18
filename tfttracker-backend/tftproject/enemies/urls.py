from django.urls import path
from . import views

app_name = 'enemies'
urlpatterns = [
    path('restart/', views.restart),
    path('sidebar/', views.getSidebarPlayers),
    path('update/', views.updateSidebarPlayers),
    path('gameboard/', views.getEnemyAgainst),
]
