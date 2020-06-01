const canvasWidth = 400;
const canvasHeight = 400;

let turtle;
let commands = [];

let paths = [];
let input;
let drawPath = true;

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	imageMode(CENTER);
	angleMode(DEGREES);
	turtle = new Turtle(canvasWidth / 2, canvasHeight / 2);
  
    paths.push({x: canvasWidth/2, y: canvasHeight/2, });

}

function draw() {
	if (commands.length > 0 && commands[0] != "") {
		ParseCommand(turtle, commands);
		commands = [];
	}
	background(0);
	
	push();
		noFill();
            let startPos = {x: turtle.x, y: turtle.y};
		    paths.forEach(path => {
              if(path.drawPath){
              stroke(255);
              } else {
                stroke(0);
              }
              line(startPos.x, startPos.y, path.x, path.y);
              startPos = path;
		    });
	pop();
	
	turtle.render();
}

function setCommands() {
	commands = document.getElementById('commands').value.split(' ');
	document.getElementById('commands').value = null;
}