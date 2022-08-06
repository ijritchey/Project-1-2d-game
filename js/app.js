// GLOBAL DOM / VARIABLES
const game = document.querySelector('#game');
const ctx = game.getContext('2d'); // creates a 2d canvas 
game.width = 960;
game.height = 500;

let runGame = false; // not sure if this is going to be used
let score = 0; // player score
let gameFrame = 0; // tracking anmiated frames ~60 per second
const keys = []; // keyboard keys array
let timer = 5; // 60 seconds



// timer countdown 

// setInterval(function(){timer--; console.log(timer);}, 1000)

// const playerCollection = [];

const foodOrder = document.querySelector('#foodOrder');
const karenComment = document.querySelector('#status');
const finalScore = document.querySelector('#score');
const canvasMain = document.querySelector('main');
const timerDisplay = document.querySelector('#top-left');
const body = document.getElementById('container');

// character class

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

    UpdateAngle() {
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        if (player.x != this.x){
            this.x -= dx/100;
        }
        if (player.y != this.y) {
            this.y -= dy/100;
        }
    }
}



// food class

const foodSrc = [
    './imgs/food1.png',
    './imgs/food2.png',
    './imgs/food3.png',
    './imgs/food4.png'
];
const foodArray = []; // for each loop
class Food {
    constructor(){
        this.x = Math.random() * game.width;
        this.y = Math.random() * 1;
        this.width = 35;
        this.height = 35;
        this.speed = Math.random() * 6 + 1;
        this.imageSrc = foodSrc[Math.floor(Math.random() * 4)]; // needs to be completed 
        this.counted = false;
        this.sound = Math.random() <= .5 ? 'sound1' : 'sound2';
    };

    update(){
        this.y += this.speed;
    };

    draw(){
        let img = new Image()
        img.src = this.imageSrc
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    };
};


// game sounds
const foodPop1 = document.createElement('audio');
foodPop1.src = './audio/crunch.5.ogg';
const foodPop2 = document.createElement('audio');
foodPop2.src = './audio/crunch.2.ogg';
const karenSlap = document.createElement('audio');
karenSlap.src = './audio/karenSlap.ogg'

// food movement handler

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

                score++; // add to score
                foodArray[i].counted = true; // only count food once
                foodArray.splice(i, 1); // remove food once hit detected
                finalScore.textContent = score; // update score on page
            }
           
        }

    }

    for (let i = 0; i < foodArray.length; i++){
        if (foodArray[i].y < 0){
            foodArray.splice(i, 1);
        
    }
}
};





// drawing player and characters to screen


const player = new Character(150, 150, 60.8, 63, 0, 0, 9, false);
const karen = new Character(900, 10, 60, 60.5, 0, 2, 9, false);


const startingPage = new Image();
startingPage.src = './imgs/startingPage.png'

const background = new Image();
background.src = "./imgs/pixil-frame-0 (1).png";

const playerSprite = new Image();
playerSprite.src = "./imgs/mainCharacter.png";

const karenSprite = new Image();
karenSprite.src = "./imgs/karenCharacter.png";



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



// ====================== PAINT INTIAL SCREEN ======================= //

    
// }


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

// display starting image and start game on click - only allow for one click
window.addEventListener('click', function(){
    if (!runGame) {
        game.style.visibility = 'visible';
        canvasMain.style.visibility = 'hidden';
        setInterval(function(){
            if (timer >= 0){
            timerDisplay.textContent = `Seconds left: ${timer--}`; 
            timerDisplay.style.fontSize = 'x-large';
            console.log(timer);
            }  
        }, 1000);
        animate();
        runGame = true;
        }
}
);



// ====================== GAME PROCESSES ======================= //
function animate() {
    if (timer <= -1) {
        cancelAnimationFrame(animate);
        if(score > 0){
            console.log('Winner winner');
            game.remove();
            karenComment.textContent = `You've won with ${score} points! Woohooo!!`;
            foodOrder.textContent = 'Winner Winner, Chicken Dinner! Refresh the page to play again!';
            foodOrder.style.color = 'yellow';
            body.style.backgroundColor = 'black';

        } else {
            game.remove();
            karenComment.textContent = `You've lost! You had ${score} points! Whomp Whomp!!`;
            foodOrder.textContent = "You have to watch out for Karen! Refresh the page to play again!";
            foodOrder.style.color = 'yellow';
            body.style.backgroundColor = 'black';
        }
        return;
        
    }
    // clearing screen to begin animation
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.drawImage(background, 0, 0, game.width, game.height);
    
    // drawing player and karen sprites
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width*1.5, player.height*1.5);  
    drawSprite(karenSprite, karen.width * karen.frameX, karen.height * karen.frameY, karen.width, karen.height, karen.x, karen.y, karen.width*1.5, karen.height*1.5);  
    
    // continual game frame counter
    gameFrame++;

    // calling helper functions

    playerMovement();
    handlePlayerFrame();
    playerHitDetection();

    handleFood();    // food movement disabled for sanity sake

    karen.UpdateAngle(); // Karen movement disabled for sanity sake

    requestAnimationFrame(animate);

    
    
};




// ====================== COLLISION DETECTION ======================= //
function playerHitDetection() {
    let hit = 
    player.y + player.height > karen.y &&
    player.y < karen.y + karen.height &&
    player.x + player.width > karen.x &&
    player.x < karen.x + karen.width;

    if (hit) {
        console.log('Karen called your manager!')
        player.x = 0;
        player.y = 0
        score = score - 2;
        finalScore.textContent = score;
        karenSlap.play();
        karenComment.textContent = "I'm calling your manager!!";
        karenComment.style.color = 'black';
    }

    if (gameFrame % 200 === 0) {
        karenComment.textContent = "Enjoy the Game! Watch out for Karen!";
        karenComment.style.color = 'yellow';
    }
};


// win condition function

// function winCondition() {
//     if (timer <= 0) {
//         cancelAnimationFrame(animate);
//         return;

//     }
// };
// winCondition();

// **********************************
// CODE STASH FOR OLD CODE
// *********************************
