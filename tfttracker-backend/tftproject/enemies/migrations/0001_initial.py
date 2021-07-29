# Generated by Django 3.1.4 on 2020-12-28 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Enemy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('enemy_status', models.CharField(choices=[('DE', 'Dead'), ('RP', 'Recently Played'), ('ATP', 'About to Play')], default='ATP', max_length=3)),
            ],
        ),
    ]