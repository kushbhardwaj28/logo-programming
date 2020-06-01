class Turtle {
	constructor(x, y, size) {
		this.graphicSize = size;
		this.bodyRadius = this.graphicSize / 3;
		this.headRadius = this.bodyRadius / 2;
		this.feetRadius = this.headRadius / 2;
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.direction = directions.North;
		this.originalX = x;
		this.originalY = y;

		this.turtleAsset = createTurtle(
			this.graphicSize,
			this.bodyRadius,
			this.headRadius,
			this.feetRadius,
		);
	}
}

	Turtle.prototype.render = function() {
	push();
	translate(this.x, this.y);
	rotate(this.angle);
	image(this.turtleAsset, 0, 0);
	pop();
}

	Turtle.prototype.moveForward = function(distance) {
	switch (this.direction) {
		case directions.North:
		this.y -= distance;
		break;

		case directions.South:
		this.y += distance;
		break;

		case directions.East:
		this.x += distance;
		break;

		case directions.West:
		this.x -= distance;
		break;

		default:
		this.angledMovement(distance, false);
		break
	}
	paths.push({x: this.x, y: this.y, drawPath: drawPath});
}

	Turtle.prototype.moveBackward = function(distance) {
	switch (this.direction) {
		case directions.North:
		this.y += distance;
		break;

		case directions.South:
		this.y -= distance;
		break;

		case directions.East:
		this.x -= distance;
		break;

		case directions.West:
		this.x += distance;
		break;

		default:
		this.angledMovement(distance, true);
		break
	}
	paths.push({x: this.x, y: this.y, drawPath: drawPath});
}

	Turtle.prototype.turnLeft = function(angle) {
	this.angle -= angle;
	this.angle = this.angle < 0 ? 270 + (90 - angle) : this.angle;
	if (this.angle == 0) {
		this.direction = directions.North;
	} else if (this.angle == 90) {
		this.direction = directions.East;
	} else if (this.angle == 180) {
		this.direction = directions.South;
	} else if (this.angle == 270) {
		this.direction = directions.West;
	} else {
		this.direction = directions.Random;
	}
}

	Turtle.prototype.turnRight = function(angle) {
	this.angle += angle;
	this.angle = this.angle >= 360 ? 0 + (this.angle - 360) : this.angle;
	if (this.angle == 0) {
		this.direction = directions.North;
	} else if (this.angle == 90) {
		this.direction = directions.East;
	} else if (this.angle == 180) {
		this.direction = directions.South;
	} else if (this.angle == 270) {
		this.direction = directions.West;
	} else {
		this.direction = directions.Random;
	}
}

	Turtle.prototype.angledMovement = function(distance, isBack) {
	if (this.angle > 0 && this.angle < 90) {
	if (isBack) {
		this.x -= sin(this.angle) * distance;
		this.y += cos(this.angle) * distance;
	} else {
		this.x += sin(this.angle) * distance;
		this.y -= cos(this.angle) * distance;
	}
	} else if (this.angle > 90 && this.angle < 180) {
		if (isBack) {
		this.x -= cos(this.angle - 90) * distance;
		this.y -= sin(this.angle - 90) * distance;
	} else {
		this.x += cos(this.angle - 90) * distance;
		this.y += sin(this.angle - 90) * distance;
	}
	} else if (this.angle > 180 && this.angle < 270) {
		if (isBack) {
		this.x -= sin(this.angle) * distance;
		this.y += cos(this.angle) * distance;
	} else {
		this.x += sin(this.angle) * distance;
		this.y -= cos(this.angle) * distance;
	}
	} else if (this.angle > 270 && this.angle < 360) {
		if (isBack) {
		this.x -= cos(this.angle - 90) * distance;
		this.y -= sin(this.angle - 90) * distance;
	} else {
		this.x += cos(this.angle - 90) * distance;
		this.y += sin(this.angle - 90) * distance;
	}
	}
}

	Turtle.prototype.reset = function(){
	this.x = this.originalX;
	this.y = this.originalY;
	this.angle = 0;
	this.direction = directions.North;
}

	Turtle.prototype.rePosition = function (x, y) {
		this.originalX = x;
		this.originalY = y;
		this.angle = 0;
		this.direction = directions.North;
	}

	Turtle.prototype.reSize = function (size) {
		this.graphicSize = size;
		this.bodyRadius = this.graphicSize / 3;
		this.headRadius = this.bodyRadius / 2;
		this.feetRadius = this.headRadius / 2;

		this.turtleAsset = createTurtle(
			this.graphicSize,
			this.bodyRadius,
			this.headRadius,
			this.feetRadius,
		);
	}

function createTurtle(graphicSize, bodyRadius, headRadius, feetRadius) {
	let bodySize = bodyRadius * 2;
	let headSize = headRadius * 2;
	let feetSize = feetRadius * 2;

	let graphicRadius = graphicSize / 2;

	let cg = createGraphics(graphicSize, graphicSize);
	cg.push();
	cg.noStroke();
	cg.fill(0, 255, 0);
	cg.ellipse(graphicRadius, graphicSize - bodyRadius, bodySize);
	cg.ellipse(graphicRadius, headRadius * 1.5, headSize);
	cg.ellipse(graphicRadius * 1.6, graphicRadius * 0.9, feetSize); // top right
	cg.ellipse(graphicRadius * 1.6, graphicRadius * 1.7, feetSize); // bottom right
	cg.ellipse(graphicRadius * 0.4, graphicRadius * 0.9, feetSize); // top left
	cg.ellipse(graphicRadius * 0.4, graphicRadius * 1.7, feetSize); // bottom left
	cg.pop();

	return cg;
}

const directions = {
	North: 'north', // Top facing
	South: 'south', // Down facing
	East: 'east', // Right facing
	West: 'west', // Left facing
	Random: 'random',
};