import { useEffect, useState } from 'react'
import { getCars, updateCar } from '../api/garage/route'

export default function ManageBar() {
	const [cars, setCars] = useState<
		{ id: number; name: string; color: string }[]
	>([])
	const [status, setStatus] = useState<'started' | 'stopped'>('started')
	const [speed, setSpeed] = useState<number>(0)

	useEffect(() => {
		const fetchCars = async () => {
			const data = await getCars()
			setCars(data)
		}
		fetchCars()
	}, [])

	const handleUpdateCar = async (id: number) => {
		const result = await updateCar(id, status, speed)
		console.log(result)
	}

	return (
		<div>
			<h1>Garage</h1>
			<ul>
				{cars.map(car => (
					<li key={car.id}>
						{car.name} - {car.color}
						<button onClick={() => handleUpdateCar(car.id)}>Update</button>
					</li>
				))}
			</ul>

			<input
				type='text'
				value={speed}
				onChange={e => setSpeed(parseInt(e.target.value, 10))}
				placeholder='Speed'
			/>
			<select
				value={status}
				onChange={e => {
					const value = e.target.value
					if (value === 'started' || value === 'stopped') {
						setStatus(value)
					}
				}}
			>
				<option value='started'>Started</option>
				<option value='stopped'>Stopped</option>
				<option value='drive'>Drive</option>
			</select>
		</div>
	)
}
