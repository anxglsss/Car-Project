export const generateRandomCar = () => {
	const carNames = [
		'Ferrari',
		'BMW',
		'Audi',
		'Tesla',
		'Ford',
		'Lamborghini',
		'Porsche',
		'Toyota',
		'Honda',
		'Nissan',
	]
	const randomName = carNames[Math.floor(Math.random() * carNames.length)]

	const colors = ['red', 'blue', 'green', 'yellow', 'black']
	const randomColor = colors[Math.floor(Math.random() * colors.length)]

	return {
		id: Math.floor(Math.random() * 10000),
		name: randomName,
		color: randomColor,
	}
}
