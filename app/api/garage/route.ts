export async function getCars() {
	const res = await fetch('http://localhost:3000/garage')
	const data = await res.json()
	return data
}

export async function updateCar(
	id: number,
	status: 'started' | 'stopped',
	speed: number
) {
	const res = await fetch(
		`http://localhost:3000/engine?id=${id}&status=${status}&speed=${speed}`,
		{
			method: 'PATCH',
		}
	)
	const data = await res.json()
	return data
}
