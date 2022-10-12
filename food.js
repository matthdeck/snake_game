import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'


let food = getRandomFoodPosition()
export let foodCellValue = [food.x, food.y]
const EXPANSION_RATE = 5

export function update() {
	if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
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



