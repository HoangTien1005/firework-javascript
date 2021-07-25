function Firework() {
  this.hu = random(255); // random color of the firework
  this.firework = new Particle(random(width), height, this.hu, true); // the big particle (firework)
  this.particles = []; // array for the burst particles
  this.exploded = false; // initial state

  this.update = function () {
    if (!this.exploded) {
      this.firework.applyForce(gravity); 
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        // reached the max height => explode
        this.exploded = true;
        this.explode();
      }
    }
    // burst motion
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      // delete from the array if it's done
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  };

  // return if it's exploded and there aren't any burst left
  this.done = function () {
    return this.exploded && this.particles.length === 0;
  };

  // create 100 burst particle
  this.explode = function () {
    for (var i = 0; i < 100; i++) {
      var p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false
      );
      this.particles.push(p);
    }
  };

  this.show = function () {
    if (!this.exploded) this.firework.show(); // only show the big particle (firework) if it hasn't explode

    // draw the burst
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].show();
    }
  };
}
