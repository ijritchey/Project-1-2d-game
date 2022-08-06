# Project-1-2d-game
SEI621 Project-1: "Karen's Revenge" 

A classic arcade game where your goal is to collect as many falling fruits as possible while avoiding the enemy (Karen). 

To play Karen's Revenge [ijritchey.github.io/Project-1-2d-game/](ijritchey.github.io/Project-1-2d-game/)

## How to Play

This game is relatively straightforward;  all you need to do is collect as many of the falling foods as you can within the 45 seconds allowed! However, much like the dangerous environment in a lot of restaurants… there is an agitated “Karen” that is trying to catch you. If she catches you she’ll give you a good smack and call your manager. Each food is worth 1 point, but if Karen catches you, you’ll be deducted 2 points. 

When the game loads up, click anywhere on the screen to begin. Use the arrow keys or (‘w’, ‘a’, ‘s’, ‘d’) to move your character around the screen. You now have 45 seconds to accomplish great things, GO! Once your 45 seconds are over you’ll win if you have any points above 0, you will lose with anything less than 0. Try to beat your own high score! To restart the game, you must refresh your page.


## How to Install

1. `Fork` and `Clone` this respository to your local machine
2. Open `index.html` in your browser to play or
3. Open the directory in your text editor of choice to view or edit the code

##### Please note: All icons used in this game are free downloads from various sources online
These are not intended for commercial use. This is an educational and personal project.

This project was created as classwork for General Assembly's Software Engineering Immersive. I do not mean to affend with the use of 'Karen.' If your name is Karen and you are offended, I apologize, I hope you still at least enjoy the game. 

## How it Works

"Karen's Revenge" runs within a js/html canvas element, the game is continually being animated by the `animate()` function. This function contains nearly all other ‘helper’ functions that control things like game board display, player movement, player animation frames, Karen movement, food spawning, collision detection, scoring, win conditions.

The most challenging function was `handleFood()` - this function controls how often and where the food spawns in the game. It also includes selecting random pixel art for 4 different types of food as well as collision detection for each food. Each newly created food is added to an array that eventually gets looped through in order to accurately detect collisions for each. There is a Character and Food class

```
function handleFood(){
    if (gameFrame % 50 === 0){
        foodArray.push(new Food());

    }

    for (let i = 0; i < foodArray.length; i++){
        foodArray[i].update();
        foodArray[i].draw();

        let hit = 
        player.y + player.height > foodArray[i].y &&
        player.y < foodArray[i].y + foodArray[i].height &&
        player.x + player.width > foodArray[i].x &&
        player.x < foodArray[i].x + foodArray[i].width; // hit detection algorithm 


        if (hit) {
            console.log('contact!');
            if (!foodArray[i].counted) {
                
                if (foodArray[i].sound === 'sound1') {  // sound1 sound2 if statment
                    foodPop1.play();
                } else {
                    foodPop2.play();
                }
```

#### Unsolved Problems

The first unsovled problem I would tackle would be to create a function that allows the player to restart the game without having to refresh the browser. I got a little too creative when it came to displaying a win/lose screen leading to me removing the canvas pretty aggresively.

The next problem I'd solve would bea more advanced way of winning, meaning I'd like to add a requirement to collect random combinations of food in order to get a point - maybe that would be a "hard" mode. 

The last unsolved problem I'd like to complete would be to not allow Karen to bully you into the upper left hand corner, if you don't move after being reset she will eventually box you into a corner - this is certainly buggy, but also can be considered an ultimate "losing" condition - bug or feature, I'll let you decide. 

Not a problem, but an improvment would be to make the the game board (display) look a bit better, more like a restaurant. 

#### Working Notes

I initially started this project with a much more advanced game in mind - due to my lack of starting knowledge (and time constraints) I needed to pull back and simplify the game a bit. The notes below show my thinking on day one. 

![Mock-Drawing](./2D%20game%20mock%20up.drawio%20(1).png)

Cooking recipe fulfillment game - serve food to the customers at different tables. 
Recipes will consist of specifically combined ingredients
Enemy Karen walking around the restaurant floor tries to intercept the server - points will be reset if Karen calls the manager on you. 
The goal: You have a 1 minute timer and need to get as many recipes combined and delivered to customers as possible. 


Phase 1: Start Screen
Welcome to the Game
Enter your name for Player One - replace in game name with whatever was entered
Click “Start” to start the game
How to: Could be a separately rendered canvas entirely or just a small function that displays an overlaid box to interact with. 


Phase 2: 
Game renders kitchen and a popup window that provides instructions
Click or press "w" to start the game
Game starts... 
User is given a recipe to match in the upper right hand corner 
Ex: Customer at table 1 wants Spaghetti = noodles + beef + tomatoes. Cooked on the stove, then serve to table 1
1 - Random groceries will appear at the different countertops throughout the game board. The ingrediant will only exist on screen for a short amount of time.
2 - Player will grab all ingriedents that are required for recipe
3 - player takes ingridents to cooking surface to cook food - wait a small amount of time 
4 - Once food is ready player will take food to the correct table - receive points
5 - Watch out for the roaming 'Karen' as she is trying to actively block the player and call your manager

Lose scenario:
If a player does not complete any recipies or if they get stopped by Karen
Action: Gordon Ramsay will appear on screen sharing one of his many enlightening quotes from his career - "My gran moves faster than you" 

Win scenario:
Player is able to complete any recipes for hungry customers - any point ammount wins but highest score earns bragging rights
Action: display how many many recipies a player was able to complete during their game time

Phase 3:
Click button to restart game. 
