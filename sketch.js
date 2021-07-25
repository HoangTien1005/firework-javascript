var fireworks = [];     // fireworks array
var gravity;          

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(4);
  stroke(255);
  gravity = createVector(0, 0.1); // gravity affects the y component
  background(0);
}

function draw() {
  colorMode(RGB);   
  background(0, 0, 0, 20);    // add alpha to the background for transition

  if (random(1) < 0.1) fireworks.push(new Firework());  // 10% chance for a new firework

  //update and draw all the firework in the array
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) fireworks.splice(i, 1);  // delete from the array if it's done
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
