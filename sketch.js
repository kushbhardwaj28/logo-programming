const canvasSize = 400;
let canvas;

let turtle;
let turtleSize = 30;
let commands = [];

let paths = [];
let input;
let drawPath = true;
let widthValueElement;
let heightValueElement;
let turtleSizeElement;
let showTurtle = true;

function setup() {
	canvas = createCanvas(canvasSize, canvasSize);
	imageMode(CENTER);
	angleMode(DEGREES);
	turtle = new Turtle(canvasSize / 2, canvasSize / 2, turtleSize);

	paths.push({ x: canvasSize / 2, y: canvasSize / 2, });
	createSliders();
}

function draw() {
	if (commands.length > 0 && commands[0] != "") {
		ParseCommand(turtle, commands);
		commands = [];
	}
	background(0);

	push();
	noFill();
	let startPos = { x: turtle.x, y: turtle.y };
	paths.forEach(path => {
		if (path.drawPath) {
			stroke(255);
		} else {
			stroke(0);
		}
		line(startPos.x, startPos.y, path.x, path.y);
		startPos = path;
	});
	pop();

	if (showTurtle) {
		turtle.render();
	}
}

function setCommands() {
	commands = document.getElementById('commands').value.split(' ');
	document.getElementById('commands').value = null;
}

function createSliders() {
	let controlContainer = document.getElementById('control-container');
	createWidthSlider(controlContainer.clientHeight);
	createHeightSlider(controlContainer.clientHeight);
	createTurtleSizeSlider(controlContainer.clientHeight);
}

function createWidthSlider(controlContainerHeight) {
	const group = createDiv('');
	group.class("width-controller");
	group.position(16, controlContainerHeight);

	const label = createSpan('Width: ');
	label.parent(group);

	let canvasWidthSlider = createSlider(400, 1000, canvasSize, 20);
	canvasWidthSlider.class('width-slider');

	canvasWidthSlider.input(() => onCanvasSliderChange(canvasWidthSlider, true));
	canvasWidthSlider.parent(group);

	widthValueElement = createSpan(canvas.width);
	widthValueElement.parent(group);
}

function createHeightSlider(controlContainerHeight) {
	const group = createDiv('');
	group.class("height-controller");
	group.position(16, controlContainerHeight + 30);

	const label = createSpan('Height: ');
	label.parent(group);

	let canvasHeightSlider = createSlider(400, 1000, canvasSize, 20);

	canvasHeightSlider.input(() => onCanvasSliderChange(canvasHeightSlider, false));
	canvasHeightSlider.parent(group);

	heightValueElement = createSpan(canvas.height);
	heightValueElement.parent(group);
}

function createTurtleSizeSlider(controlContainerHeight) {
	const group = createDiv('');
	group.class("turtle-size-controller");
	group.position(16, controlContainerHeight + 60);

	const label = createSpan('Turtle Size: ');
	label.parent(group);

	let turtleSizeSlider = createSlider(10, 100, turtleSize, 2);

	turtleSizeSlider.input(() => onTurtleSizeChange(turtleSizeSlider));
	turtleSizeSlider.parent(group);

	turtleSizeElement = createSpan(turtle.graphicSize);
	turtleSizeElement.parent(group);
}

function onCanvasSliderChange(canvasSizeSlider, isWidth) {
	const newCanvasSize = canvasSizeSlider.value();
	let width, height;
	if (isWidth) {
		width = newCanvasSize;
		height = canvas.height;
	} else {
		width = canvas.width;
		height = newCanvasSize;
	}
	resizeCanvas(width, height);

	widthValueElement.html(width);
	heightValueElement.html(height);

	turtle.rePosition(width / 2, height / 2);
	drawPath = true;
	paths = [{ x: width / 2, y: height / 2 }];
	turtle.reset();
}

function onTurtleSizeChange(turtleSizeSlider) {
	turtle.reSize(turtleSizeSlider.value());
	turtleSizeElement.html(turtleSizeSlider.value());
}
