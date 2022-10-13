import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'


let food = getRandomFoodPosition()
export const gameScoreCount = 0
export let foodCellValue = [food.x, food.y]

export function getExpansionRate() {
  let e = document.getElementById("expansion-rate")
  return e.value
}

export function update() {
	if (onSnake(food)) {
    let count = document.getElementById("score-count")
    let number = count.innerHTML
    number++
    count.innerHTML = number
    expandSnake(getExpansionRate())
    food = getRandomFoodPosition()
    foodCellValue = [food.x, food.y]
  }
}

export function draw(gameBoard) {
	const foodElement = document.createElement('div')
  const newContent = document.createTextNode('🍎')
  foodElement.appendChild(newContent)
	foodElement.style.gridRowStart = food.y
	foodElement.style.gridColumnStart = food.x
	foodElement.classList.add('food')
	gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPositon
  while (newFoodPositon == null || onSnake(newFoodPositon)) {
    newFoodPositon = randomGridPosition()
  }
  return newFoodPositon
}



