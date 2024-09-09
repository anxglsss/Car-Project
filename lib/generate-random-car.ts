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

	const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`

	return {
		id: Math.floor(Math.random() * 1000),
		name: randomName,
		color: randomColor,
	}
}
