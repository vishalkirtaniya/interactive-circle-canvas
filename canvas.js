var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
// for squares
// c.fillRect(100, 300, 100, 100);
// c.fillRect(300, 400, 100, 100);
// c.fillRect(200, 200, 100, 100);

// line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(30, 10);
// c.lineTo(400, 200);
// c.strokeStyle = "blue"; //this is how you change the color of the animation,
// c.stroke();

// ARC / circle
// c.arc(x: Int, y: Int, radius: Int(takes radians), startAngle: Float, endAngle: Float, drawCounterClockwise: Bool (false));
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();

// for (var i = 0; i < 3; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = "red";
//   c.stroke();
// }
var colorArray = [
  "#0274BD",
  "#E9E6DD",
  "#C4AD9D",
  "#000000",
  "#F57251",
  "#5E3023",
];
var distanceBtwCurorAndCircle = 50;
var maxRadius = 40;
// var minRadius = 2;
var circleCount = 800;
var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < distanceBtwCurorAndCircle &&
      mouse.x - this.x > -distanceBtwCurorAndCircle &&
      mouse.y - this.y < distanceBtwCurorAndCircle &&
      mouse.y - this.y > -distanceBtwCurorAndCircle
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

for (let i = 0; i < circleCount; i++) {
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 3;
  var dy = (Math.random() - 0.5) * 3;
  var radius = Math.random() * 3 + 1;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
