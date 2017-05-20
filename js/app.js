// Enemies our player must avoid
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

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
 *  player Definition.
 *  Set player image
 *  set player default functions
 */

var Player = function () {
    this.sprite = 'images/char-boy.png';
};
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

// initiate player.
player = new Player();
player.reset();
//player handle Input function.


// while updating the player status, check collision.
// read keyboard input
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




// *  Created new enemy and put into allEnemies list.
var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
