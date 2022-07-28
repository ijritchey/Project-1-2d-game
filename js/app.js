// GLOBAL DOM / VARIABLES
const game = document.querySelector('#game');
const ctx = game.getContext('2d'); // creates a 2d canvas 
game.width = 960;
game.height = 500;

const keys = [];
const customers = ['David Stomach', 'Sarah Culture', 'Greg Tabasco', 'Lauren Knife', 'Jeff Boyardee']


const foodOrder = document.querySelector('#foodOrder');
const status = document.querySelector('#status');
const score = document.querySelector('#score');

let ingredient1;
let ingredient2;
let ingredient3;
let drink; 

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

const player = new Character(0, 0, 60.8, 63, 0, 0, 9, false);
const karen = new Character(450, 200, 60, 60.5, 0, 0, false);


const background = new Image();
background.src = "/Users/ianritchey/Desktop/SEI-621/unit-1/deliverable/project-1-2d-game/imgs/pixil-frame-0 (1).png";
const playerSprite = new Image();
playerSprite.src = "/Users/ianritchey/Desktop/SEI-621/unit-1/deliverable/project-1-2d-game/imgs/mainCharacter.png";
const karenSprite = new Image();
karenSprite.src = "/Users/ianritchey/Desktop/SEI-621/unit-1/deliverable/project-1-2d-game/imgs/karenCharacter.png"


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){ 
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

};



function playerMovement(){
    if(keys['ArrowUp'] && player.y > 5) {
        player.y -= player.speed;
        player.frameY = 0;
        player.moving = true;
    } ;
    if(keys['ArrowDown'] && player.y < game.height - player.height) {
        player.y += player.speed;
        player.frameY = 2;
        player.moving = true;
    };
    if(keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    };
    if(keys['ArrowRight'] && player.x < game.width - player.width) {
        player.x += player.speed;
        player.frameY = 3;
        player.moving = true;
    }
};

function handlePlayerFrame(){
    if (player.frameX < 4 && player.moving) {
        player.frameX++;
    } else {
        player.frameX = 0;
    }
}
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

// class Crawler {
//     constructor(x, y, color, width, height){
//         this.x = x;
//         this.y = y;
//         this.color = color;
//         this.width = width;
//         this.height = height;
//         this.alive = true;

//         this.render = function() {
//             ctx.fillStyle = this.color;
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     }
// };

// class Food extends Crawler {
//     super(x, y, width, height)
// }

// ====================== HELPER FUNCTIONS ======================= //

// GUI

//  KEYBOARD INTERACTION LOGIC

// ====================== GAME PROCESSES ======================= //
function animate() {
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.drawImage(background, 0, 0, game.width, game.height);
    
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width*1.5, player.height*1.5);  
    drawSprite(karenSprite, karen.width * karen.frameX, karen.height * karen.frameY, karen.width, karen.height, karen.x, karen.y, karen.width*1.5, karen.height*1.5);  
   
    playerMovement();
    handlePlayerFrame();
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


// **********************************
// CODE STASH FOR OLD CODE
// **********************************
