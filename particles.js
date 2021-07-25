// x, y is the coordinate
// hu is the color of the particle
// boolean variable isFirework
function Particle(x, y, hu, isFirework) {
  this.pos = createVector(x, y);
  this.lifespan = 255; // color fade over time
  this.hu = hu;
  this.isFirework = isFirework;

  // initial velocity
  if (this.isFirework) this.vel = createVector(0, random(-7, -12));
  else {
    this.vel = p5.Vector.random2D(); // create a burst from the firework
    this.vel.mult(random(2, 10));
  }
  // initial acceleration
  this.acc = createVector(0, 0);

  // apply force to the acceleration
  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.done = function () {
    return this.lifespan < 0;
  };

  this.update = function () {
    // if it's the burst, reduce the lifespan
    if (!this.isFirework) {
      this.vel.mult(0.93);
      this.lifespan -= random(-1, 10);
    }

    // basic motion
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  // draw the particle
  this.show = function () {
    colorMode(HSB); // change color mode to HSB for the particle's trail

    if (!this.isFirework) {
      stroke(this.hu, 255, 255, this.lifespan);
      strokeWeight(2);
    } else {
      stroke(this.hu, 255, 255);
      strokeWeight(4);
    }
    point(this.pos.x, this.pos.y); // draw a point at the coordinate (x, y)
  };
}
