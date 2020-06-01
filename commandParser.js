function ParseCommand(turtle, command = []) {
  if (command[0].toLowerCase() == 'fd') {
    turtle.moveForward(getNumberInCommand(command));
  }

  if (command[0].toLowerCase() == 'bk') {
    turtle.moveBackward(getNumberInCommand(command));
  }

  if (command[0].toLowerCase() == 'rt') {
    turtle.turnRight(getNumberInCommand(command));
  }

  if (command[0].toLowerCase() == 'lt') {
    turtle.turnLeft(getNumberInCommand(command));
  }

  if (command[0].toLowerCase() == 'pu') {
    drawPath = false;
  }

  if (command[0].toLowerCase() == 'pd') {
    drawPath = true;
  }

  if (command[0].toLowerCase() == 'cs') {
    drawPath = true;
    paths = [{ x: canvasSize / 2, y: canvasSize / 2 }];
    turtle.reset();
  }

  if (command[0].toLowerCase() == 'ct') {
    turtle.reset();
    paths.push({ x: turtle.x, y: turtle.y, drawPath: true });
  }

  if (command[0].toLowerCase() == 'st') {
    showTurtle = true;
  }

  if (command[0].toLowerCase() == 'ht') {
    showTurtle = false;
  }
}

function getNumberInCommand(command = []) {
  let returnValue = 0;
  command.forEach(element => {
    const intValue = parseInt(element);
    if (!isNaN(intValue)) {
      returnValue = intValue;
    }
  });
  return returnValue;
}