import { pacman } from "./pacman.js";
import { ghost } from "./ghost.js";
import { Food } from "./food.js";
import { Boundary, ctx, canvas, map } from "./map.js"


let foods = [];
const boundaries = [];

map.forEach((row, i) => row.forEach((s, j) => {
  switch (s) {
    case '-':
      boundaries.push(
        new Boundary({ 
          position: {
            x: 100 + 20 * j,
            y: 100 + 20 * i,
          },
        })
      );
    break;
    case '.':
      foods.push(
        new Food({ 
          position: {
            x: 100 + 20 * j + 10,
            y: 100 + 20 * i + 10,
          },
        })
      );
    break;
  }
}));


window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      pacman.speed.x = 0;
      if (pacman.speed.y > -1.5) 
        pacman.speed.y -= 1.5;
      break;
    case 'ArrowDown':
      pacman.speed.x = 0;
      if (pacman.speed.y < 1.5)
        pacman.speed.y += 1.5;
      break;
    case 'ArrowLeft':
      if (pacman.speed.x > -1.5)
        pacman.speed.x -= 1.5;
      pacman.speed.y = 0;
      break;
    case 'ArrowRight':
      if (pacman.speed.x < 1.5)
        pacman.speed.x += 1.5;
      pacman.speed.y = 0;
      break;
  }
});


function dist(x, y) {
  const res = (x ** 2 + y ** 2) ** 0.5;
  return res;
}

function limit(obj, boundary) {
  const left = obj.position.x - obj.radius + obj.speed.x <= boundary.position.x + boundary.width;
  const right = obj.position.x + obj.radius + obj.speed.x >= boundary.position.x;
  const top = obj.position.y + obj.radius + obj.speed.y >= boundary.position.y;
  const floor = obj.position.y - obj.radius  + obj.speed.y <= boundary.position.y + boundary.height;
  if  (left && right && top && floor) {
      obj.speed.x = 0;
      obj.speed.y = 0;
  }
}

let score = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  boundaries.forEach((boundary) => {
    boundary.draw()
    limit(pacman, boundary);
    limit(ghost, boundary);
  });


  foods.forEach((food, idx) => {
    food.draw();
    if (
      dist(
        pacman.position.x - food.position.x, 
        pacman.position.y - food.position.y) < 
        (pacman.radius + food.radius)
    ) {
      score++;
      document.getElementById("myScore").innerHTML = score;
      foods.splice(idx, 1);
    }
    
  });

  pacman.update();
  ghost.update();
  if (
    dist(
      pacman.position.x - ghost.position.x, 
      pacman.position.y - ghost.position.y) < 
      pacman.radius + ghost.radius
  ) {
    document.getElementById("res").innerHTML = "Loose!";
    //alert('GAME OVER!');
    // нужно остановить аниацию
    cancelAnimationFrame(animate);
    return; 
  }

  if (score == 306) {
    document.getElementById("res").innerHTML = "Win!";
    //alert('WIN!');
    cancelAnimationFrame(animate);
    return;   
  }
  requestAnimationFrame(animate);
}

animate();
