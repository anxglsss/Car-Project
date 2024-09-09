import { makeAutoObservable } from 'mobx'
import {
	createCar,
	deleteCar,
	getCars,
	updateCar,
} from '../instances/cars-instance'
import { updateEngine } from '../instances/engine-instance'
import { ICar } from '../interfaces/main'

class CarStore {
	cars: ICar[] = []
	winners: ICar[] = []
	selectedCarId: number | undefined = undefined
	raceInProgress: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	async getCars() {
		try {
			this.cars = await getCars()
		} catch (e) {
			console.error("Error in Store 'getCars': ", e)
		}
	}

	async createCar(car: ICar) {
		try {
			await createCar(car, this.cars.length + 1)
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

	async stopCarEngine(id: number) {
		try {
			await updateEngine(id, 'stopped')
			console.log(`Engine stopped, ${id}`)
		} catch (e) {
			console.error("Error in Store'stopCarEngine': ", e)
		}
	}

	setSelectedCarId(id: number | undefined) {
		this.selectedCarId = id
	}
}
const carStore = new CarStore()
export default carStore
