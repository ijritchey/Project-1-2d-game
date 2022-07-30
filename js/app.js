// GLOBAL DOM / VARIABLES
const game = document.querySelector('#game');
const ctx = game.getContext('2d'); // creates a 2d canvas 
game.width = 960;
game.height = 500;

let gameFrame = 0;
const keys = [];
const customers = ['David Stomach', 'Sarah Culture', 'Greg Tabasco', 'Lauren Knife', 'Jeff Boyardee'];
const foodRecipies = {

};
const playerCollection = [];

const foodOrder = document.querySelector('#foodOrder');
const status = document.querySelector('#status');
const score = document.querySelector('#score');

let ingredient1;
let ingredient2;
let ingredient3;


class Character{
    constructor(x, y, width, height, frameX, frameY, speed, moving){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.frameX = frameX;
        this.frameY =frameY;
        this.speed = speed;
        this.moving = moving;
    }
};



// class created for food objects

const foodArray = [];
class Food {
    constructor(){
        this.x = Math.random() * game.width;
        this.y = Math.random() * 1;
        this.width = 20;
        this.height = 20;
        this. speed = Math.random() * 5 + 1;
        this.distance;

    };

    update(){
        this.y += this.speed;
    };

    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    };
};

// food movement handler

function handelFood(){
    if (gameFrame % 50 === 0){
        foodArray.push(new Food());
        console.log(foodArray.length);
    }
    for (let i = 0; i < foodArray.length; i++){
        foodArray[i].update();
        foodArray[i].draw();
        
    }
    for (let i = 0; i < foodArray.length; i++){
        if (foodArray[i].y < 0){
            foodArray.splice(i, 1);
        }
    }
};

// drawing player and characters to screen


const player = new Character(150, 150, 60.8, 63, 0, 0, 9, false);
const karen = new Character(450, 250, 60, 60.5, 0, 0, false);


const background = new Image();
background.src = "/Users/ianritchey/Desktop/SEI-621/unit-1/deliverable/project-1-2d-game/imgs/pixil-frame-0 (1).png";
const playerSprite = new Image();
playerSprite.src = "/Users/ianritchey/Desktop/SEI-621/unit-1/deliverable/project-1-2d-game/imgs/mainCharacter.png";
const karenSprite = new Image();
karenSprite.src = "/Users/ianritchey/Desktop/SEI-621/unit-1/deliverable/project-1-2d-game/imgs/karenCharacter.png"


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){ 
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

};

// player movement keyboard

function playerMovement(){
    if((keys['ArrowUp'] || keys['w']) && player.y > 5) {
        player.y -= player.speed;
        player.frameY = 0;
        player.moving = true;
    } ;
    if((keys['ArrowDown'] || keys['s']) && player.y < game.height - player.height) {
        player.y += player.speed;
        player.frameY = 2;
        player.moving = true;
    };
    if((keys['ArrowLeft'] || keys['a']) && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    };
    if((keys['ArrowRight'] || keys['d']) && player.x < game.width - player.width) {
        player.x += player.speed;
        player.frameY = 3;
        player.moving = true;
    }
};

// player movment handle funcion

function handlePlayerFrame(){
    if (player.frameX < 4 && player.moving) {
        player.frameX++;
    } else {
        player.frameX = 0;
    }
};

// karen movement random

function karenMovement(){


};

// food movement - limitted to the kitchen

function foodMovement() {

};

// ====================== PAINT INTIAL SCREEN ======================= //





// EVENT LISTENERS
window.addEventListener('keydown', function(e){
    keys[e.key] = true;
    player.moving = true;
    console.log(keys);
});

window.addEventListener('keyup', function(e){
    delete keys[e.key];
    player.moving = false;
});


// window.addEventListener('DOMContentLoaded', function() {
//     player = new Crawler(10, 20, 'grey', 20, 20);
//     karen = new Crawler(100, 200, '#bada55', 40, 80);
    
//     // const runGame = setInterval(gameLoop, 60);

// });


   

// ====================== SETUP FOR CANVAS RENDERING ======================= //

// game.setAttribute('height',getComputedStyle(game)['height']);
// game.setAttribute('width',getComputedStyle(game)['width']);


// ====================== ENTITIES ======================= //

// 



// ====================== HELPER FUNCTIONS ======================= //

// GUI

//  KEYBOARD INTERACTION LOGIC

// ====================== GAME PROCESSES ======================= //
function animate() {
    // clearing screen to begin animation
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.drawImage(background, 0, 0, game.width, game.height);
    
    // drawing player and karen sprites
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width*1.5, player.height*1.5);  
    drawSprite(karenSprite, karen.width * karen.frameX, karen.height * karen.frameY, karen.width, karen.height, karen.x, karen.y, karen.width*1.5, karen.height*1.5);  
    
    // calling helper functions
    playerMovement();
    handlePlayerFrame();
    playerHitDetection();
    gameFrame++;
    handelFood()
    // console.log(gameFrame);
    requestAnimationFrame(animate);
    
}

animate();


// setInterval(function(){
//     ctx.clearRect(0, 0, game.width, game.height);
//     ctx.drawImage(background, 0, 0, game.width, game.height);
    
//     drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width*1.5, player.height*1.5);  
   
//     playerMovement();
//     handlePlayerFrame();
//     requestAnimationFrame(animate);

// }, 100);


// ====================== COLLISION DETECTION ======================= //
function playerHitDetection() {
    let hit = 
    player.y + player.height > karen.y &&
    player.y < karen.y + karen.height &&
    player.x + player.width > karen.x &&
    player.x < karen.x + karen.width;

    if (hit) {
        console.log('too far left!')
        player.x = 0;
        player.y = 0
    }
};


// **********************************
// CODE STASH FOR OLD CODE
// **********************************
