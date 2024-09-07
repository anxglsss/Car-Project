import jsonServer from 'json-server'
import { Request, Response } from 'express'

// Define the types for cars and winners
type Car = {
	name: string
	color: string
	id: number
}

type Winner = {
	id: number
	wins: number
	time: number
}

// Define the database structure
const db = {
	garage: [
		{
			name: 'Tesla',
			color: '#e6e6fa',
			id: 1,
		},
		{
			name: 'BMW',
			color: '#fede00',
			id: 2,
		},
		{
			name: 'Mersedes',
			color: '#6c779f',
			id: 3,
		},
		{
			name: 'Ford',
			color: '#ef3c40',
			id: 4,
		},
	] as Car[],
	winners: [
		{
			id: 1,
			wins: 1,
			time: 10,
		},
	] as Winner[],
}

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 3000

// Define the types for state
type State = {
	velocity: { [key: number]: number }
	blocked: { [key: number]: boolean }
}

const state: State = { velocity: {}, blocked: {} }

server.use(middlewares)

const STATUS = {
	STARTED: 'started',
	STOPPED: 'stopped',
	DRIVE: 'drive',
} as const

server.patch('/engine', (req: Request, res: Response) => {
	const { id, status, speed } = req.query

	if (!id || isNaN(Number(id)) || Number(id) <= 0) {
		return res
			.status(400)
			.send('Required parameter "id" is missing. Should be a positive number')
	}

	if (!status || !/^(started|stopped|drive)$/.test(String(status))) {
		return res
			.status(400)
			.send(
				`Wrong parameter "status". Expected: "started", "stopped" or "drive". Received: "${status}"`
			)
	}

	const carId = Number(id)
	const car = db.garage.find(car => car.id === carId)

	if (!car) {
		return res.status(404).send('Car with such id was not found in the garage.')
	}

	const distance = 500000

	if (status === STATUS.DRIVE) {
		if (state.blocked[carId]) {
			return res
				.status(429)
				.send(
					"Drive already in progress. You can't run drive for the same car twice while it's not stopped."
				)
		}

		const velocity = state.velocity[carId]

		if (!velocity) {
			return res
				.status(404)
				.send(
					'Engine parameters for car with such id were not found. Have you tried to set engine status to "started"?'
				)
		}

		state.blocked[carId] = true

		const timeToComplete = Math.round(distance / velocity)

		delete state.velocity[carId]

		if (new Date().getMilliseconds() % 3 === 0) {
			setTimeout(() => {
				delete state.blocked[carId]
				res
					.header('Content-Type', 'application/json')
					.status(500)
					.send('Car has been stopped suddenly. Its engine broke down.')
			}, Math.random() * timeToComplete)
		} else {
			setTimeout(() => {
				delete state.blocked[carId]
				res
					.header('Content-Type', 'application/json')
					.status(200)
					.send(JSON.stringify({ success: true }))
			}, timeToComplete)
		}
	} else {
		const randomSpeed = speed ? Number(speed) : Math.random() * 2000
		const velocity =
			status === STATUS.STARTED ? Math.max(50, Math.random() * 200) : 0

		if (velocity) {
			state.velocity[carId] = velocity
		} else {
			delete state.velocity[carId]
			delete state.blocked[carId]
		}

		setTimeout(
			() =>
				res
					.header('Content-Type', 'application/json')
					.status(200)
					.send(JSON.stringify({ velocity, distance })),
			randomSpeed
		)
	}
})

server.use(router)
server.listen(PORT, () => {
	console.log('Server is running on port', PORT)
})
