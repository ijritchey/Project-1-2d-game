// GLOBAL DOM / VARIABLES
console.log("this works, we're starting a game");
const game = document.querySelector('#game');
const ctx = game.getContext('2d'); // creates a 2d canvas 

const foodOrder = document.querySelector('#foodOrder');
const status = document.querySelector('#status');
const score = document.querySelector('#score');

const customers = ['David Stomach', 'Sarah Culture', 'Greg Tabasco', 'Lauren Knife', 'Jeff Boyardee']
let player;
let karen;
let ingredient1;
let ingredient2;
let ingredient3;
let drink; 



// ====================== PAINT INTIAL SCREEN ======================= //





// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function() {
    player = new Crawler(10, 20, 'grey', 20, 20);
    karen = new Crawler(100, 200, '#bada55', 40, 80);
    
    const runGame = setInterval(gameLoop, 60);

});

   

// ====================== SETUP FOR CANVAS RENDERING ======================= //

game.setAttribute('height',getComputedStyle(game)['height']);
game.setAttribute('width',getComputedStyle(game)['width']);


// ====================== ENTITIES ======================= //

class Crawler {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
};

// class Food extends Crawler {
//     super(x, y, width, height)
// }

// ====================== HELPER FUNCTIONS ======================= //

// GUI

//  KEYBOARD INTERACTION LOGIC

// ====================== GAME PROCESSES ======================= //
function gameLoop() {
    
    // clear canvas 
    ctx.clearRect(0, 0, game.width, game.height);
    // check for correct food pickup

    // render player and karen
    player.render();
    karen.render();

};
    


// ====================== COLLISION DETECTION ======================= //


// **********************************
// CODE STASH FOR OLD CODE
// **********************************
