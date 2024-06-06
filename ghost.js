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
  
  move () {
    if (getRandomArbitrary(-1, 1) > 0.0) {
      this.speed.x++;
      while (!this.speed.x === 0)
        this.speed.x++;
    } else {
      this.speed.x--;
      while (!this.speed.x === 0) 
        this.speed.x--;
    }
      this.speed.y = 0;
  }
  
  move1 () {
    if (getRandomArbitrary(-1, 1) > 0.0) {
      this.speed.y += 0.1;
      while (!this.speed.y === 0)
        this.speed.y -= 0.1;
    } else {
      this.speed.y -= 0.1;
      while (!this.speed.y === 0) 
        this.speed.y += 0.1;
    }
    this.speed.x = 0;
  }
  
  update () {
    this.draw();
    this.move1();
  
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
