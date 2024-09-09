import { makeAutoObservable } from 'mobx'
import {
	createCar,
	deleteCar,
	getCars,
	updateCar,
} from '../instances/cars-instance'
import { switchEngineToDrive, updateEngine } from '../instances/engine-instance'
import { ICar } from '../interfaces/main'

class CarStore {
	cars: ICar[] = []
	winners: ICar[] = []
	selectedCarId: number | undefined = undefined
	raceInProgress: boolean = false
	currentPage: number = 1
	carsPerPage: number = 7
	currentId: number = 0 // Отслеживаем максимальный ID

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

	async createCar(car: ICar) {
		try {
			this.currentId += 1 // Увеличиваем текущий ID при каждом создании нового автомобиля
			car.id = this.currentId // Присваиваем новый уникальный ID автомобилю
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

	async startCarEngine(id: number) {
		try {
			await updateEngine(id, 'started')
			console.log(`Engine started, ${id}`)
		} catch (e) {
			console.error("Error in Store 'startCarEngine': ", e)
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

	async stopCarEngine(id: number) {
		try {
			await updateEngine(id, 'stopped')
			console.log(`Engine stopped, ${id}`)
		} catch (e) {
			console.error("Error in Store 'stopCarEngine': ", e)
		}
	}

	setSelectedCarId(id: number | undefined) {
		this.selectedCarId = id
	}
}

const carStore = new CarStore()
export default carStore
