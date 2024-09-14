import { action, makeAutoObservable, runInAction } from 'mobx'
import {
	createCar,
	deleteCar,
	generateCars,
	getCars,
	updateCar,
} from '../instances/cars-instance'
import { switchEngineToDrive, updateEngine } from '../instances/engine-instance'
import { engineStatus, ICar } from '../interfaces/main'

class CarStore {
	cars: ICar[] = []
	winners: ICar[] = []
	selectedCarId: number | undefined = undefined
	raceInProgress: boolean = false
	currentPage: number = 1
	carsPerPage: number = 7
	currentId: number = 0
	trackLength: number = 1000

	constructor() {
		makeAutoObservable(this, {
			getCars: action,
			createCar: action,
			updateCar: action,
			removeCar: action,
			generateCars: action,
			setSelectedCarId: action,
			setPage: action,
			switchEngineToDrive: action,
			updateEngine: action,
			startRace: action,
		})
	}

	async getCars() {
		try {
			const fetchedCars = await getCars()
			if (!fetchedCars) return

			this.cars = fetchedCars
			this.currentId =
				this.cars.length > 0
					? Math.max(...this.cars.map(car => car.id ?? 0))
					: 0
		} catch (e) {
			console.error("Error in Store 'getCars': ", e)
		}
	}

	get paginatedCars() {
		const start = (this.currentPage - 1) * this.carsPerPage
		const end = start + this.carsPerPage
		return this.cars.slice(start, end)
	}

	get totalPages() {
		return Math.ceil(this.cars.length / this.carsPerPage)
	}

	setPage(page: number) {
		if (page > 0 && page <= this.totalPages) {
			runInAction(() => {
				this.currentPage = page
			})
		}
	}

	async generateCars() {
		try {
			const newCars = await generateCars()
			runInAction(() => {
				this.cars.push(...newCars)
			})
		} catch (e) {
			console.error('Error generating cars:', e)
		}
	}

	async createCar(car: ICar) {
		try {
			this.currentId += 1
			car.id = this.currentId
			await createCar(car, car.id)
			runInAction(() => {
				this.cars.push(car)
			})
		} catch (e) {
			console.error("Error in Store 'createCar': ", e)
		}
	}

	async updateCar(id: number, color: string, name: string) {
		try {
			await updateCar(id, color, name)
			runInAction(() => {
				const car = this.cars.find(car => car.id === id)
				if (car) {
					car.color = color
					car.name = name
				}
			})
		} catch (e) {
			console.error("Error in Store 'updateCar': ", e)
		}
	}

	async removeCar(id: number) {
		try {
			await deleteCar(id)
			runInAction(() => {
				this.cars = this.cars.filter(car => car.id !== id)
			})
		} catch (e) {
			console.error("Error in Store 'removeCar': ", e)
		}
	}

	async switchEngineToDrive(id: number) {
		try {
			await switchEngineToDrive(id)
			console.log(`Engine switched to drive, ${id}`)
		} catch (e) {
			console.error("Error in Store 'switchEngineToDrive': ", e)
		}
	}

	async updateEngine(id: number, status: engineStatus) {
		try {
			const response = await updateEngine(id, status)
			runInAction(() => {
				const car = this.cars.find(car => id === car.id)
				if (car) {
					car.velocity = response.velocity
					car.distance = response.distance
					car.startTime = Date.now()
				} else {
					console.error(`Car with id ${id} not found`)
					throw new Error('Car not found')
				}
			})
			return { velocity: response.velocity, distance: response.distance }
		} catch (e) {
			console.error("Error in Store 'updateEngine': ", e)
			throw new Error('Error updating the engine')
		}
	}

	setSelectedCarId(id: number | undefined) {
		runInAction(() => {
			this.selectedCarId = id
		})
	}

	async startRace() {
		this.raceInProgress = true
		try {
			await Promise.all(
				this.cars.map(async car => {
					await this.updateEngine(car.id ?? 0, 'started')
				})
			)
		} catch (e) {
			console.error('Error starting race: ', e)
		} finally {
			runInAction(() => {
				this.raceInProgress = false
			})
		}
	}
}

const carStore = new CarStore()
export default carStore
