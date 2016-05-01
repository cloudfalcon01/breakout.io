
//THIS IS THE GAME CODE YOU IDIOT
var canvas = document.getElementById("Break2");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed =false;
var brickRowCount = 9;
var brickColumnCount = 12;
var brickWidth = 65;
var brickHeight = 15;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var colorRed = "#D50525";
var colorYellow = "#EEB211";
var colorGreen = "#009925";
var colorBlue = "#3369E8";
var brickX = (col*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
var brickIncrease = 1;
var brickDecrease = 1;
var ballSize = ballRadius;
var row = 0;
var col = 0;
var frameCounter = 0;
var countFrames = false;
var audioDeadBlue = new Audio('MP5_SMG-GunGuru-703432894.mp3');
var audioDeadRed = new Audio('deadred.wav');
var skinColor;
var RedButton = document.getElementById('RED');
var YellowButton = document.getElementById('YELLOW');
var GreenButton = document.getElementById('GREEN');
var BlueButton = document.getElementById('BLUE');
//var color = prompt("Please enter your favorite color out of red, yellow, green, and blue!", "green"); 



//The array for colors.
var brickColors=[//START_BRICKCOLORS	
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"],
["E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E","E"]
];//END_BRICKCOLORS

var brickColor = brickColors [row][col];

//calculations for brick columns
var bricks = [];
for(var col=0; col<brickColumnCount; col++) {//START_FOR1
	bricks[col]  = [];
	for (var row=0; row<brickRowCount; row++) {//START_FOR2
		bricks[col][row] = {//START_BRICKSCOLROW
			x: (col*(brickWidth+brickPadding))+brickOffsetLeft, 
			y: (row*(brickHeight+brickPadding))+brickOffsetTop,
			status: 1
		}//END_BRICKSCOLROW
	}//END_FOR2
}//END_FOR1

var brickColor = brickColors [row][col];
//deciding the color using an MOD

function decideColor() {//START_DECIDECOLOR


	var colorResult = (Math.random()*100) % 4; 
	var colorResult = Math.floor(colorResult);

	if (colorResult == 0) {//START_IFRED
		return colorRed;
	}//END_IFRED
	else if (colorResult == 1) {//START_IFYELLOW
		return colorYellow;
	}//END_IFYELLOW
	else if (colorResult == 2) {//END_IFGREEN
		return colorGreen;
	}//END_IFGREEN
	else if (colorResult == 3) {//START_COLORBLUE
		return colorBlue;
	}//END_COLORBLUE

}//END_DECIDECOLOR

//the SPLAT brick

//function splatBrick() {
//	ctx.beginPath();
//	ctx.rect(brickX, brickY, brickWidth, brickHeight);
//	ctx.fillStyle = splatColor;
//	ctx.fill();
//	ctx.closePath();
//}



//drawing the bricks
function drawBricks() {//START_DRAWBRICKS

	for(var col=0; col<brickColumnCount; col++) {//START_FOR1
		for(var row=0; row<brickRowCount; row++) {//START_FOR2

			if (bricks [col][row].status == 1) {//START_IF1
				brickX = (col*(brickWidth+brickPadding))+brickOffsetLeft;
				brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
				ctx.beginPath();
				ctx.rect(brickX,brickY, brickWidth, brickHeight);
				var brickColor = brickColors[row][col];
				if (brickColors[row][col] == "E") {//START_IF2
					console.log(brickColors[row][col]);
					console.log(row);
					console.log(col);
					brickColors[row][col] = decideColor();
				}//END_IF3
				ctx.fillStyle = brickColor;
				ctx.fill();
				ctx.closePath();
			}//END_IF1
			
		}//END_FOR2
	}//END_FOR1
}//END_DRAWBRICKS

//the calculations for breaking the bricks when the ball hits them and telling you when you win
function collisionDetection() {//START_COLLISION
    for(col=0; col<brickColumnCount; col++) {//START_FOR1
        for(row=0; row<brickRowCount; row++) {//START_FOR2
            var bck = bricks[col][row];
            if(bck.status == 1) {//START_IF1
            	// BEGIN_BRICK_COLLISSION
            	// if the x value of the ball is greater than the x value of the individual brick 
            	//and if the x value of the ball is less than the brick's width
            	// and the y value of the ball is greather than the y balue of the individual brick
            	//and the y value of the ball is less than the brick's height
                if(x > bck.x && x < bck.x+brickWidth && y > bck.y && y < bck.y+brickHeight) {//START_IF2
                    dy =-dy;
                    bck.status = 0;
                    score++;

                    //This if statement tells what to do if a brick is red.  
                		if(brickColors [row] [col] ==[colorRed] ) {
                    		bck.status = 0;
                    		document.getElementById('deadRed').play();
                    		//this asks to decrease the ball's radius
                    		ballRadius -= brickDecrease;
                    		                 
                		}
                		//This if statement tells what to do if a brick is green.
	                	if(brickColors [row] [col] ==[colorGreen] ) {
	                    	bck.status = 0;
	                    	document.getElementById('deadGreen').play();
	                    	//this asks to increase the balls radius
	                    	ballRadius += brickIncrease;
               	 		}
               	 		//This if statement tells what to do if a brick is yellow.
               	 		if(brickColors [row] [col] ==[colorYellow] ) {
                    		bck.status = 0;
                    		document.getElementById('deadYellow').play();
                    		countFrames = true;
                    		var img = document.getElementById("DBan");
							img.style.visibility = 'visible';
							canvas.style.visibility = 'hidden';
                		}
                		if(brickColors [row] [col] ==[colorBlue] ) {
                    		bck.status = 0;
                    		audioDeadBlue.play();  
                		}
                    // BEGIN_SUCCESS
                    if(score == brickRowCount*brickColumnCount) {// BEGIN_SUCCESS
                    	alert("YOU'VE DONE IT! YOU HAVE BEAT THIS GAME! GONGRATS. YOU HAVE SURVIVED FAIL AFTER FAIL, INSULT AFTER INSULT, YOU HAVE DONE IT ALL. CONGRATULAIONS!");
                    	document.location.reload();
                	} //END_SUCCESS
                } //END_IF2


            }//END_IF1
        }//END_FOR2
    }//END_FOR1
}//END_COLLISION

//shwowing the score
function drawScore() {
	ctx.font = "16px Georgia";
	ctx.fillStyle = "#9484FF";
	ctx.fillText("Score: "+score, 8, 20);
}
//showing the lives
function drawLives() {
	ctx.font = "16px Georgia";
	ctx.fillStyle = "#9484FF";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

//showing Ball Mass
function drawBallMass(){
	ctx.font = "16px Georgia";
	ctx.fillStyle = "#9484FF";
	ctx.fillText("Ball Mass: "+ballRadius, 90,20)
}

//the event listeners 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("touchmove",touchMoveHandler, false);

//the arrow key handlers that move the paddle
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}

	else if(e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}

	else if(e.keyCode == 37){
		leftPressed = false;
	}
}
//drawing the ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2)
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

//drawing the paddle
function drawPaddle() {
	ctx.beginPath;
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}
//the mouse handler for using the mouse to control the paddle
function mouseMoveHandler(e) {	
	// This line of code creates the variable relativeX inside the function mouseMoveHandler.  
	// This line of code acceses the mouse coordinates from the browser through the variable e. 
	// Then it subtracts the border of the canvas from it. 
	// This makes it the X coordinates of the mouse in the canvas. 
	// Then it stores it in the variable relativeX.
	var relativeX = e.clientX - canvas.offsetLeft;
	// This line of code prevents the paddle from moving out of the canvas.
	if(relativeX > 0 && relativeX <canvas.width) {
		// This line of code takes the X coordinates of the paddle and 
		// changes them to the X coordiantes of the mouse in the canvas minus the width of the paddle, (75), divided by 2.
		paddleX = relativeX - paddleWidth/2;
	}
}

function touchMoveHandler(e) {
	if (!e) {
		var e = event;
	}
	e.preventDefault();
	var relativeX = e.targetTouches[0].pageX - canvas.offsetLeft;
	//remember: same paddle code, since the cause stays the same, but the effect changes.
	if(relativeX > 0 && relativeX <canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}

}

function setDifficulty() {
	var d = prompt("Please enter difficulty between 1-10. The higher the number, the smaller the paddle.", "8");
	var difficulty = parseInt(d);
	paddleWidth = paddleWidth - (difficulty * 2);
}

var color = prompt("Select a ball and paddle color out of red, yellow, green, or blue.", "green") 
if (color == "red") {
	color = "red";
}

if (color == "yellow") {
	color = "yellow";
}

if (color == "green") {
	color = "green";
}

if (color == "blue") {
	color = "blue";
}


//calling the funtions
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	collisionDetection();
	drawBall();
	drawPaddle();
	drawBricks();
	drawScore();
	drawLives();
	drawBallMass();
	//Countframes means if countframes == true
	if(countFrames) {
		frameCounter ++;
		canvas.style.visibility = 'hidden';
		var img = document.getElementById("DBan");
		img.style.visibility = 'visible';
		if(frameCounter >= 90) {


			canvas.style.visibility = 'visible';
			countFrames = false;
			frameCounter = 0;

		}
	}

	if(ballRadius == 0) {
		alert("GAME OVER, YOU POT-BELLIED PEABRAINED CODFISH RESEMBLING PIECE OF @#$%^&* *CENSORED*!");
    		document.location.reload();
	}

	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
	if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
    	if(x>paddleX && x < paddleX+paddleWidth) {
    		dy = -dy;
    	}
    	else{
    		lives--;
    		if(!lives) {
    		alert("GAME OVER, YOU POT-BELLIED PEABRAINED CODFISH RESEMBLING PIECE OF @#$%^&* *CENSORED*!");
    		document.location.reload();
    		}
    		else {
    			x = canvas.width/2;
    			y = canvas.height-30;
    			dx = 2;
    			dy = -2;
    			paddleX = (canvas.width-paddleWidth)/2;
    		}    		
    	}
    }

	if(score == brickRowCount*brickColumnCount) {
                    	alert("YOU'VE DONE IT! YOU HAVE BEAT THIS GAME! GONGRATS. YOU ARE (not really) THE MAN/WOMAN!");
                    	document.location.reload();
                    }

	 	if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    
    	}

		else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    	
    	}

	x += dx;
	y += dy;


}


function removeMenu() {
	var a = document.getElementById('popupbg');
	var b = document.getElementById('popuplay');
	var c = document.getElementById('main-wrapper');
	var d = document.getElementById('button-wrapper');
	var e = document.getElementById('logo');

	a.parentNode.removeChild(a);
	b.parentNode.removeChild(b);
	c.parentNode.removeChild(c);
	d.parentNode.removeChild(d);
	e.parentNode.removeChild(e);

	return false;


}

function play() {
	removeMenu();                                                                                                                   
	bg = document.getElementById('popupbg2');

	setDifficulty();
	//calling the draw funtion every ten seconds (may be used later for changing difficulty)
	//setInterval(draw, 8);
	document.body.style.backgroundImage  = "url('DBan.gif')";
	document.body.style.backgroundSize = "960px 640px";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundPosition = "center";
	setInterval(draw, 8);

}


var button = document.getElementById('playButton');
button.addEventListener ('click', play);  



