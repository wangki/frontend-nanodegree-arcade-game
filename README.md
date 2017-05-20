frontend-nanodegree-arcade-game
===============================

# About the project

This JavaScript project is building a frogger game. The purpose of this game is to reach the river. When you reach the river, You will be moved to the starting position and one more enemy will be added. So it means it will be harder and harder as you playing the game. When you collide to an enemy, your progress will be lost, and the game will restart. Let's see how many enemies you can defeat.


# Starting the game

You can run this game by opening up the `index.html`. I suggest you to open up the file with `chrome` browser. The game starts as soon as the browser finish loading `index.html` 
 
## Interface

You are character is in the bottom of the screen. He is on the grass. You can move your character with the keyboard. 
 - Up arrow key - move your character to one block up
 - Down arrow key - move your character to one block down
 - Right arrow key - move your character to one block right
 - Left arrow key - move your character to one block left



---

# Developer guide

First, I suggest you to read the code. There are three JavasCript code in the file, 

-  `Engine.js` defines the map and basic function that you can use. 
-  `resources.js` will call out the resources that we use. 
-  `app.js` is where you will define `Player` and `Enemy` .

# Enemy Constructor

I suggest you to create the `Enemy` constructor something like this. The `sprites` array will give a selection of enemy character, And using `Math.random` in `sprite` will randomly set the character. 

Just like character, Its speed and lane will be randomly set with the method `speed` and `SetY` respectively. 

	var Enemy = function() {
	 // Variables applied to each of our instances go here,
	 // we've provided one for you to get started
	
	 // The image/sprite for our enemies, this uses
	 // a helper we've provided to easily load images
	 // set of sprite
	 var sprites = ['images/enemy-bug.png',
	 'images/char-cat-girl.png',
	 'images/char-horn-girl.png',
	 'images/char-pink-girl.png',
	 'images/char-princess-girl.png'];
	
	 // gives random sprite to the enemies
	 this.sprite = sprites[Math.floor(Math.random()*sprites.length)];
	 this.speed = Math.random();
	 // Setting lanes for enemies
	 var lanes = [215,135,55];
	 // Random lane
	 var SetY = function () {
	 return lanes[Math.floor(Math.random()*lanes.length)];
	 };
	 // Default x value
	 this.x = -120;
	 // Default y value
	 this.y = SetY();
	
	};

Every instance of `Enemy` should have method `update` , `render` . 
Method `render` , `update` are already defined inside the code. You can to develop `update` function like below. As its definition the `update` function randomly changes the speed of character when it reaches the right end.

	Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	 // speed varies
	 this.x = this.x + dt * this.speed * 550;
	
	 // if the enemy reaches the end, go back to the first place
	 // change speed.
	 if (this.x > 505){
	 this.x = -120;
	 this.speed = Math.random();
	 }
	
	};
	

# Player Constructor

 `Player` constructor is much complex than the `Enemy` constructor. You may consider to build it something like this. The constructor only needs to contain the image of the character. 

	var Player = function () {
	 this.sprite = 'images/char-boy.png';
	};

## Player Prototype

Since most of the `Player` function is already defined in `Enemy` prototype, You can inherit the prototype from `Enemy` . Using `Object.create` method. 

 `checkCollisions` method is what checks if the player collides with the Enemy, when collide, It will call `reset` method. 

 `reset` method which is inherited from `Engine` function, will set the position of instance to the default. 

 `update` does the same thing as the `update` in the `Enemy` , While updating It checks if there is collision. 

	// player is inherited from Enemy prototype
	Player.prototype = Object.create(Enemy.prototype);
	// check collision between enemy and character
	Player.prototype.checkCollisions = function () {
	 // loop through the enemy array
	 for (var i=0; i<allEnemies.length; ++i) {
	 var item = allEnemies[i];
	 // if any of the enemy is close to the character,
	 // enemy list return to the default
	 // reset the player position
	 if (((parseInt(item.y))==(parseInt(this.y)))&&((item.x+30 > this.x)&&(item.x-20<this.x))){
	 allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy()];
	 this.reset();
	 }
	 }
	
	};
	// update player's status
	Player.prototype.update = function(dt) {
	 this.checkCollisions();
	};
	
	// set player to default position
	Player.prototype.reset = function() {
	 this.x = 202;
	 this.y = 375;
	};
	

 `handleInput` method takes pressed key as an Input, It updates the instance's position. The player cannot move outside of the map, and once it reaches the end, It will reposition to the default position, add one more enemy to the game. 

	Player.prototype.handleInput = function (key) {
	 // if a key is selected, move the character and update.
	 // player cannot located outside of the map
	 if (key == 'down'){
	 if (this.y ===375 ){
	 }else {
	 this.y = this.y + 80;
	 this.update();
	
	 }
	 }
	 if (key == 'up'){
	 this.y = this.y - 80;
	 // when player reaches the end, add new enemy to the list
	 if (this.y <= 0 ){
	 this.reset();
	 allEnemies.push(new Enemy());
	 }else{
	 this.update();
	
	 }
	
	 }
	 if (key == 'right'){
	
	 if (this.x!=404 ){
	 this.x = this.x + 101;
	 this.update();
	 }
	 }
	 if (key == 'left'){
	 if (this.x!=0 ){
	 this.x = this.x - 101;
	 this.update();
	 }
	 }
	};