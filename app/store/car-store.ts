import { makeAutoObservable } from 'mobx'
import toast from 'react-hot-toast'
import {
	createCar,
	deleteCar,
	getCars,
	updateCar,
} from '../instance/cars-instance'
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
		this.cars = await getCars()
	}

	async createCar(car: ICar) {
		await createCar(car)
		this.cars.push(car)
	}

	async updateCar(id: number, color: string, name: string) {
		await updateCar(id, color, name)
		const car = this.cars.find(car => car.id === id)
		if (car) {
			car.color = color
			car.name = name
		}
	}

	async removeCar(id: number) {
		await deleteCar(id)
		this.cars = this.cars.filter(car => car.id !== id)
	}

	setSelectedCarId(id: number | undefined) {
		this.selectedCarId = id
	}

	startRace() {
		this.raceInProgress = true
		toast.success('Race has started!')
	}

	endRace(winner: ICar) {
		this.raceInProgress = false
		toast.success('Race has ended!, Winner is ' + winner.name)
	}
}
const carStore = new CarStore()
export default carStore
