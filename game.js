// popup background
var bg; //= document.getElementById('popupbg2');
// popup box
//var box = document.getElementById('popinstruct');

//THIS IS THE GAME CODE YOU IDIOT

var canvas = document.getElementById("Break2");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 30;
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



var brickColors=[	
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
];

//calculations for brick columns
var bricks = [];
for(var col=0; col<brickColumnCount; col++) {
	bricks[col]  = [];
	for (var row=0; row<brickRowCount; row++) {
		bricks[col][row] = {
			x: (col*(brickWidth+brickPadding))+brickOffsetLeft, 
			y: (row*(brickHeight+brickPadding))+brickOffsetTop,
			status: 1
		};
	}
}

//deciding the color using an MOD

function decideColor() {


	var colorResult = (Math.random()*100) % 4; 
	var colorResult = Math.floor(colorResult);

	if (colorResult == 0) {
		return colorRed;
	}
	else if (colorResult == 1) {
		return colorYellow;
	}
	else if (colorResult == 2) {
		return colorGreen;
	}
	else if (colorResult == 3) {
		return colorBlue;
	}

}

//drawing the bricks
function drawBricks() {

	for(var col=0; col<brickColumnCount; col++) {
		for(var row=0; row<brickRowCount; row++) {

			if (bricks [col][row].status == 1) {
				var brickX = (col*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
				ctx.beginPath();
				ctx.rect(brickX,brickY, brickWidth, brickHeight);
				var brickColor = brickColors[row][col];
				if (brickColors[row][col] == "E") {
					console.log(brickColors[row][col]);
					console.log(row);
					console.log(col);
					brickColors[row][col] = decideColor();
				}
				ctx.fillStyle = brickColor;
				ctx.fill();
				ctx.closePath();
			}
			
		}
	}
}
//the calculations for breaking the bricks when the ball hits them and telling you when you win
function collisionDetection() {
    for(col=0; col<brickColumnCount; col++) {
        for(row=0; row<brickRowCount; row++) {
            var bck = bricks[col][row];
            if(bck.status == 1) {
                if(x > bck.x && x < bck.x+brickWidth && y > bck.y && y < bck.y+brickHeight) {
                    dy = -dy;
                    bck.status = 0;
                    score++;
                    //if(score == brickRowCount*brickColumnCount) {
                    	//alert("YOU'VE DONE IT! YOU HAVE BEAT THIS GAME! GONGRATS. YOU HAVE SURVIVED FAIL AFTER FAIL, INSULT AFTER INSULT, YOU HAVE DONE IT ALL. CONGRATULAIONS!")
                    	//document.location.reload();
                    //} still with old if
                }
            }
        }
    }
}
//shwowing the score
function drawScore() {
	ctx.font = "16px Georgia";
	ctx.fillStyle = "orange";
	ctx.fillText("Score: "+score, 8, 20);
}
//showing the lives
function drawLives() {
	ctx.font = "16px Georgia";
	ctx.fillStyle = "orange";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
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
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle="red";
	ctx.fill();
	ctx.closePath();
}

//drawing the paddle
function drawPaddle() {
	ctx.beginPath;
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "green";
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

//calling the funtions
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	collisionDetection();
	drawBall();
	drawPaddle();
	drawBricks();
	drawScore();
	drawLives();


	

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
    		alert("GAME OVER, YOU POT-BELLIED PEABRAINED SON OF A CODFISH!");
    		document.location.reload();
    		}
    		else {
    			x = canvas.width/2;
    			y = canvas.height-30;
    			dx = 2;
    			dy = -2;
    			paddleX = (canvas.width-paddleWidth)/2
    		}
    		
    	}
    }
	if(score == brickRowCount*brickColumnCount) {
                    	alert("YOU'VE DONE IT! YOU HAVE BEAT THIS GAME! GONGRATS. YOU HAVE SURVIVED FAIL AFTER FAIL, INSULT AFTER INSULT, YOU HAVE DONE IT ALL. CONGRATULAIONS!")
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

function play () {
	removeMenu();
	bg = document.getElementById('popupbg2');

	setDifficulty();
	//calling the draw funtion every ten seconds (may be used later for changing difficulty)
	setInterval(draw, 8); 
}

var button = document.getElementById('playButton');
button.addEventListener ('click', play);






