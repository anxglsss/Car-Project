import { makeAutoObservable } from 'mobx'
import { axiosInstance } from '../instances/axios-instance'
import {
	createCar,
	deleteCar,
	generateCars,
	getCars,
	updateCar,
} from '../instances/cars-instance'
import { switchEngineToDrive } from '../instances/engine-instance'
import { engineStatus, ICar } from '../interfaces/main'

class CarStore {
	cars: ICar[] = []
	winners: ICar[] = []
	selectedCarId: number | undefined = undefined
	raceInProgress: boolean = false
	currentPage: number = 1
	carsPerPage: number = 7
	currentId: number = 0

	constructor() {
		makeAutoObservable(this)
	}

	async getCars() {
		try {
			this.cars = await getCars()
			if (!this.cars) return
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
			this.currentPage = page
		}
	}

	generateCars = async () => {
		try {
			const newCars = await generateCars()
			this.cars.push(...newCars)
		} catch (e) {
			console.error('Error generating cars:', e)
		}
	}

	async createCar(car: ICar) {
		try {
			this.currentId += 1
			car.id = this.currentId
			await createCar(car, car.id)
			this.cars.push(car)
		} catch (e) {
			console.error("Error in Store 'createCar': ", e)
		}
	}

	async updateCar(id: number, color: string, name: string) {
		try {
			await updateCar(id, color, name)
			const car = this.cars.find(car => car.id === id)
			if (car) {
				car.color = color
				car.name = name
			}
		} catch (e) {
			console.error("Error in Store 'updateCar': ", e)
		}
	}

	async removeCar(id: number) {
		try {
			await deleteCar(id)
			this.cars = this.cars.filter(car => car.id !== id)
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
			const response = await axiosInstance.patch('/engine', null, {
				params: { id, status },
			})
			return response.data
		} catch (e) {
			console.error('Error updating engine status:', e)
			throw new Error('Error updating engine status')
		}
	}

	async startRace() {
		try {
			const promises = this.cars.map(car =>
				this.updateEngine(car.id ?? 0, 'drive')
			)
			await Promise.all(promises)

			const response = await axiosInstance.get('/winners')
			this.winners = response.data
		} catch (e) {
			console.error('Error starting the race:', e)
			throw new Error('Error starting the race')
		}
	}

	async stopRace() {
		try {
			const promises = this.cars.map(car =>
				this.updateEngine(car.id ?? 0, 'stopped')
			)
			await Promise.all(promises)
		} catch (e) {
			console.error('Error stopping the race:', e)
			throw new Error('Error stopping the race')
		}
	}

	setSelectedCarId(id: number | undefined) {
		this.selectedCarId = id
	}
}

const carStore = new CarStore()
export default carStore
