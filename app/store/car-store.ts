import { makeAutoObservable } from 'mobx'
import toast from 'react-hot-toast'
import { ICar } from '../interfaces/main'

class CarStore {
	cars: ICar[] = []
	winners: ICar[] = []
	selectedCar: ICar | null = null
	raceInProgress: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	addcar(car: ICar) {
		this.cars.push(car)
	}

	removeCar(id: number) {
		this.cars = this.cars.filter(car => car.id !== id)
	}
	setColor(id: number, color: string, name: string) {
		this.cars.find(car => (car.id === id ? (car.name = name) : null))
		this.cars.find(car => (car.id === id ? (car.color = color) : null))
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
