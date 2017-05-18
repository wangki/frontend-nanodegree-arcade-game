// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var sprites = ['images/enemy-bug.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];


    this.sprite = sprites[Math.floor(Math.random()*sprites.length)];
    this.speed = Math.random();

    lanes = [215,135,55];
    var item = lanes[Math.floor(Math.random()*lanes.length)];
    this.x = -120;
    this.y = item;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
    this.x = this.x+(11*dt+this.speed*10);
    if (this.x > 505){
        this.x = -120;
        this.speed = Math.random();
        this.y = lanes[Math.floor(Math.random()*lanes.length)];
    };

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*  Start : Written by WK
 *  player Definition.
 *  Set player image
 */

var player = function () {
    this.sprite = 'images/char-boy.png';
};
// player is inherited from Enemy prototype
player.prototype = Object.create(Enemy.prototype);

player.prototype.checkCollisions = function () {
};

player.prototype.update = function(dt) {
};


player.prototype.set = function() {
    player.x = 202;
    player.y = 375;
};
// player.checkCollisions = function(){
//     if ((this.x = player.x)){
//         return true;
//     }
//     return false;
//
// };
// player definition done.
// initiate player.
player = new player();
//player handle Input function.



player.checkCollisions = function () {
    for (var i=0; i<allEnemies.length; ++i) {
        item = allEnemies[i];
        if (((parseInt(item.y))==(parseInt(this.y)))&&((item.x+70 > this.x)&&(item.x-50<this.x))){
            allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy()];
            player.x = 202;
            player.y = 375;
        }else{
            console.log("hellooo");
        };

    };

};
player.update = function(){
    player.checkCollisions();
};


player.handleInput = function (key) {
    if (key == 'down'){
        if (player.y ===375 ){
        }else {
            player.y = player.y + 80;
            player.update();

        };
    };
    if (key == 'up'){
        player.y = player.y - 80;//
        // console.log(player.y);
        if (player.y <= 0 ){
            player.set();
            allEnemies.push(new Enemy());
        }else{
            player.update();

        };

    };
    if (key == 'right'){

        if (player.x==404 ){
        }else {
            player.x = player.x + 101;//101
            player.update();
        };
    };
    if (key == 'left'){
        if (player.x==0 ){
        }else {
            player.x = player.x - 101;//101
            player.update();
        };
    };
};




// *  Created new enemy and put into allEnemies list.
var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];

// FIN : written by WK


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
