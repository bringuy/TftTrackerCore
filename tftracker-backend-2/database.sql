CREATE DATABASE tfttracker;

CREATE TABLE enemies(
  "enemy_id" SERIAL PRIMARY KEY,
  "username" VARCHAR(16),
  "health_points" INT(100),
  "enemy_status" VARCHAR(255)
);

CREATE TABLE player(
  "username" VARCHAR(16),
  "resolution" VARCHAR(20)
)