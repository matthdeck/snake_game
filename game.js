import { getSnakeSpeed, update as updateSnake, draw as drawSnake, getSnakeHead, getSnakeHeadValues, snakeIntersection, snakeCellValues } from './snake.js'
import { update as updateFood, draw as drawFood, foodCellValue } from './food.js'
import{ outsideGrid } from './grid.js'
import { heuristic } from './perfect.js'

let lastRenderTime = 0
let gameOver = false
let gameBoard = document.getElementById('game-board')

export function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/'
    }
    return
  }

  let snakeSpeed = getSnakeSpeed()
  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / snakeSpeed) return

  lastRenderTime = currentTime

	update()
	draw()
}

let speed = document.getElementById('snake-speed')

window.requestAnimationFrame(main) 

function update() {
	updateSnake()
  updateFood()
  checkDeath()
  
}

function draw() {
  gameBoard.innerHTML = ''
	drawSnake(gameBoard)
  drawFood(gameBoard)
  // console.log(heuristic(foodCellValue, 21, 21, snakeCellValues(), getSnakeHeadValues()))
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}