// Canvas size
let width = 0;
let height = 0;

// Boid flock parameters
const NUM_BOIDS = 800;
const BOID_SIZE = 6;
const TURN_FACTOR = 0.2;
const TURN_PADDING = 20;
const VISUAL_RANGE = 20;
const PROTECTED_RANGE = 10;
const CENTERING_FACTOR = 0.0005;
const AVOID_FACTOR = 0.05;
const MATCHING_FACTOR = 0.05;
const MAX_SPEED = 4;
const MIN_SPEED = 2;

class Boid {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  draw(ctx) {
    const angle = Math.atan2(this.vy, this.vx);
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.translate(-this.x, -this.y);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - BOID_SIZE * 2, this.y + BOID_SIZE / 2);
    ctx.lineTo(this.x - BOID_SIZE * 2, this.y - BOID_SIZE / 2);
    ctx.lineTo(this.x, this.y);
    ctx.fillStyle = "#f7df1e";
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

var flock = [];

const spawn = () => {
  for (var i = 0; i < NUM_BOIDS; i += 1) {
    flock.push(new Boid(Math.random() * width, Math.random() * height, 0, 0));
  }
};

function flockUpdate() {
  for (const boid of flock) {
    let xAverage = 0;
    let yAverage = 0;
    let vxAverage = 0;
    let vyAverage = 0;
    let neighboringBoids = 0;
    let closeDx = 0;
    let closeDy = 0;

    // Calculate behavior determining metrics
    for (const otherboid of flock) {
      if (boid === otherboid) continue;
      const dx = boid.x - otherboid.x;
      const dy = boid.y - otherboid.y;
      if (Math.abs(dx) < VISUAL_RANGE && Math.abs(dy) < VISUAL_RANGE) {
        const squaredDistance = dx ** 2 + dy ** 2;
        if (squaredDistance < PROTECTED_RANGE ** 2) {
          closeDx += boid.x - otherboid.x;
          closeDy += boid.y - otherboid.y;
        } else if (squaredDistance < VISUAL_RANGE ** 2) {
          xAverage += otherboid.x;
          yAverage += otherboid.y;
          vxAverage += otherboid.vx;
          vyAverage += otherboid.vy;
          neighboringBoids += 1;
        }
      }
    }

    if (neighboringBoids > 0) {
      vxAverage = vxAverage / neighboringBoids;
      vyAverage = vyAverage / neighboringBoids;
      xAverage = xAverage / neighboringBoids;
      yAverage = yAverage / neighboringBoids;

      // Alignment
      boid.vx += (vxAverage - boid.vx) * MATCHING_FACTOR;
      boid.vy += (vyAverage - boid.vy) * MATCHING_FACTOR;

      // Cohesion
      boid.vx += (xAverage - boid.x) * CENTERING_FACTOR;
      boid.vy += (yAverage - boid.y) * CENTERING_FACTOR;
    }

    // Separation
    boid.vx += closeDx * AVOID_FACTOR;
    boid.vy += closeDy * AVOID_FACTOR;

    // Avoid screen edges
    if (boid.y - TURN_PADDING < 0) {
      boid.vy += TURN_FACTOR;
    }
    if (boid.x + TURN_PADDING > width) {
      boid.vx -= TURN_FACTOR;
    }
    if (boid.x - TURN_PADDING < 0) {
      boid.vx += TURN_FACTOR;
    }
    if (boid.y + TURN_PADDING > height) {
      boid.vy -= TURN_FACTOR;
    }

    // Bound speed
    const speed = Math.sqrt(boid.vx ** 2 + boid.vy ** 2);
    if (speed > MAX_SPEED) {
      boid.vx = (boid.vx / speed) * MAX_SPEED;
      boid.vy = (boid.vy / speed) * MAX_SPEED;
    } else if (speed < MIN_SPEED) {
      boid.vx = (boid.vx / speed) * MIN_SPEED;
      boid.vy = (boid.vy / speed) * MIN_SPEED;
    }

    // Update positions
    boid.x += boid.vx;
    boid.y += boid.vy;
  }

  // Draw boids in new positions
  const ctx = document.getElementById("boids").getContext("2d");
  ctx.clearRect(0, 0, width, height);
  for (const boid of flock) {
    boid.draw(ctx);
  }

  window.requestAnimationFrame(flockUpdate);
}

window.onload = () => {
  // Make sure the canvas always fills the whole window
  const resizeCanvas = () => {
    const canvas = document.getElementById("boids");
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  spawn();
  window.requestAnimationFrame(flockUpdate);
};
