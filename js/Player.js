class Player {
    constructor() {
      this.pos = createVector(width / 2, height / 2)
      this.angle = 0;
      this.bullets = [];
    }
    
    draw() {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      rect(0, 0, 20, 20);
      pop();
      
      for (let bullet of this.bullets) {
        bullet.update();
        bullet.draw();
      }
    }
    
    update() {
      let xSpeed = 0;
      let ySpeed = 0;
      if (keyIsDown(65)) {
        xSpeed = -2;
      }
  
      if (keyIsDown(68)) {
        xSpeed = 2;
      }
  
      if (keyIsDown(87)) {
        ySpeed = -2;
      }
  
      if (keyIsDown(83)) {
        ySpeed = 2;
      }
      this.pos.add(xSpeed, ySpeed);
      this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    }
    
    shoot() {
      this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
    }
    
    hasShot(zombie) {
      for (let i = 0; i < this.bullets.length; i++) {
        if (dist(this.bullets[i].x, this.bullets[i].y, zombie.pos.x, zombie.pos.y) < 15) {
          this.bullets.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  }