// game Constants & Variables
let inputDir = {x:0 , y:0};
const foodSound= new Audio('../snakegame/images/food.mp3.wav');
const gameoverSound = new Audio('../snakegame/images/dead.mp3.wav');
const moveSound = new Audio('../snakegame/images/move.mp3.mp3');
const musicSound = new Audio('../snakegame/images/epic_battle_music_1-6275.mp3');
let speed = 6;
let score= 0;
let lastPrintTime= 0;
let snakeArr =[
    {x:13 , y:15}
]
food = {x:6 , y:7 }
//food element not an array its always a object because its an partical what snake can eat and grow.


//Game Functions
function main(currenttime){
    //requestAnimationFrame gives you high quality animation.
    window.requestAnimationFrame(main);
    // console.log(currenttime);
    if((currenttime - lastPrintTime)/1000 < 1/speed){
        return;
    }
    lastPrintTime = currenttime;
    gameEngine();
    
}
function iscollide(snake){
    //if you bump into yourself
    for(let i = 1;i < snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if you bump into wall
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
            return true; 
        }
}

function gameEngine(){
    //part 1 : updating the snake array & Food
    if(iscollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game over Press any Key to Play again");
        snakeArr =[{x:13 ,y:15}];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x)
    {
        foodSound.play();
        score +=1;
        if(score > highscoreval) {
            highscoreval =score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML ="highscore" + highscoreval;
        }
        scoreBox.innerHTML ="score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x ,y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food= {x: Math.round (a+(b-a)*Math.random()), y: Math.round (a+(b-a)*Math.random())}
    }

    //Moving the snake 
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};  
    }

    snakeArr[0].x  += inputDir.x;
    snakeArr[0].y  += inputDir.y;

    //part 2: display  the snake and Food
    //Display the snake
    board.innerHTML="";
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x; 
        
        if(index === 0){
            snakeElement.classList.add('head');
        } 
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x; 
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Main logic starts here
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval=0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval= JSON.parse(highscore);
    highscoreBox.innerHTML ="highscore" + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0 , y:1} //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0 ;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0 ;
            inputDir.y= 1 ;
            break;
            
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x= -1 ;
            inputDir.y= 0 ;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
    
        default:
            break; 
    }
})