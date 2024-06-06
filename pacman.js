const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Pacman {
  constructor ({ position, speed}) {
    this.position = position;
    this.speed = speed;
    this.radius = 8;
  }
  
  draw () {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  
  update () {
    this.draw();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}

export const pacman = new Pacman({ position : {
  x: 130,
  y: 130,
}, speed : {
  x: 0, 
  y: 0,
}});
