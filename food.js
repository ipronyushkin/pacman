const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export class Food {
  constructor ({ position }) {
    this.position = position;
    this.radius = 2;
  }
  
  draw () {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
