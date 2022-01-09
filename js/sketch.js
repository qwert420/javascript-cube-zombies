let player;
let zombies = [];

let zombieSpawnTime = 300;
let zombieMaxSpeed = 2;
let frame = 0
let score = 0;
function setup() {
  createCanvas(500, 500);
  player = new Player();
}

function draw() {
  background(99, 99, 99);
  rectMode(CENTER);
  player.draw();
  player.update(); 
  
  
  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].draw();
    zombies[i].update();
    
    if (zombies[i].ateYou()) {
      restart();
      break;
    }
    
    if (player.hasShot(zombies[i])) {
      score++;
      zombies.splice(i, 1);
    }
  }
  
  if (frame >= zombieSpawnTime) {
    zombies.push(new Zombie(random(zombieMaxSpeed)));
    zombieSpawnTime *= 0.95;
    frame = 0;
  }
  if (frameCount % 1000 == 0) {
    zombieMaxSpeed += 0.1;
  }
  
  frame++;
  textAlign(CENTER);
  textSize(40);
  text(score, width/2, 100);
}

function restart() {
  //alert('You died! Your score was ' + score + '!');
  player = new Player();
  zombies = [];
  zombieSpawnTime = 300;
  zombieMaxSpeed = 2;
  score = 0;
}

function mouseClicked() {
  player.shoot();
}