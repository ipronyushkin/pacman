const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export class Ghost {
  constructor ({ position, speed}) {
    this.position = position;
    this.speed = speed;
    this.radius = 8;
  }
  
  draw () {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  
  move() {
    if (this.position.x < 450 && this.position.y == 330) {
      this.speed.x += 0.01;
    }  else if (this.position.x >= 450 && this.position.y < 550) {
      this.speed.y += 0.01;
    } else if (this.position.y >= 550 && this.position.x > 200) {
      this.speed.x -= 0.01;
    } else if (this.position.x <= 200 && this.position.y > 150) {
      this.speed.y -= 0.01;
    } else if (this.position.x < 200 && this.position.y < 150) {
      this.speed.x += 0.01;
    }
  }
  
  update () {
    this.draw();
    this.move();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


export const ghost = new Ghost({ position : {
  x: 305,
  y: 330,
}, speed : {
  x: 0,
  y: 0,
}});
