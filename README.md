# TftTrackerCore

A live tracking application for the game TeamfightTactics that tracks enemies played recently to determine upcoming opponents.

 ## Approach ##
 
 If you don't know the rules of TeamfightTactics or need a refresher check out this link: https://mobalytics.gg/blog/tft-guide/
 
 
This project was inspired by this YouTube video https://www.youtube.com/watch?v=e8N0zUdEjLw&ab_channel=Mortdog-TFT where someone discovered the matchmaking alogithim for the game. By taking a snapshot at the beginning of each combat round, we can see
* How many opponents are alive
* Who you played against this round

Here is an example screenshot of the beginning of the combat round:

<img width="1011" alt="image" src="https://user-images.githubusercontent.com/47421937/156944868-b4e0d0d9-2514-4098-b6c0-76d14a12185f.png">

The box at the top of the screen shows the player you are playing against currently. The box on the right side displays all our opponents and shows if they are alive or dead. By using a 
