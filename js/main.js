'use strict';

const canvas = document.querySelector('#draw');
const context = canvas.getContext('2d');
const button = document.querySelector('#reset');

//changes the height and width of the canvas to full screen of browser.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//gives a color to start painting and a round form to the cursor
context.strokeStyle = '#BADA55';
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 5;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(ev) {
  if (!isDrawing) return;
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  context.lineWidth = hue;

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(ev.offsetX, ev.offsetY);
  context.stroke();
  [lastX, lastY] = [ev.offsetX, ev.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (context.lineWidth >= 100 || context.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    context.lineWidth++;
  } else {
    context.lineWidth--;
  }
}

const drawFluidly = (ev) => {
  isDrawing = true;
  [lastX, lastY] = [ev.offsetX, ev.offsetY];
};

function reset() {
  location.reload();
}

canvas.addEventListener('mousedown', drawFluidly);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
button.addEventListener('click', reset);
