import { getInputDirection } from "./input.js"



export function getSnakeSpeed() {
	let e = document.getElementById("snake-speed")
	let value = e.value
	switch (value) {
		case 'slow':
			return 5
		case 'medium':
			return 10
		case 'fast':
			return 15
		case 'insane':
			return 20
		default:
			return 10
	}
}

const snakeBody = [{ x: 11, y: 11}]

let newSegments = 0

export function update() {
	addSegments()

	const inputDirection = getInputDirection()

  for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i] }
	}
// console.log(inputDirection)
	snakeBody[0].x += inputDirection.x
	snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
	snakeBody.forEach(segment => {
		const snakeElement = document.createElement('div')
		snakeElement.style.gridRowStart = segment.y
		snakeElement.style.gridColumnStart = segment.x
		snakeElement.classList.add('snake')
		gameBoard.appendChild(snakeElement)
	})
}

export function expandSnake(amount) {
  newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
	return snakeBody.some((segment, index) => {
		if (ignoreHead && index === 0) return false
		return equalPositions(segment, position)
	})
}

export function snakeCellValues() {
	let values = []
	snakeBody.forEach(cell => values.push([cell.x, cell.y]))
	return values;
}

export function getSnakeHead() { 
	 
	return snakeBody[0]
}

export function getSnakeHeadValues() {
	return Object.values(snakeBody[0])
}

export function snakeIntersection() {
	return onSnake(snakeBody[0], { ignoreHead: true })
}

export function equalPositions(pos1, pos2) {
	return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
	for (let i = 0; i < newSegments; i++) {
		snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
	}

	newSegments = 0
}
