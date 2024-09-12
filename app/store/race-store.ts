import { makeAutoObservable } from 'mobx'
import toast from 'react-hot-toast'
import carStore from './car-store'
import { winnerStore } from './winner-store'

class RaceStore {
	static handleStopEngine() {
		throw new Error('Method not implemented.')
	}
	isMoving: boolean = false
	distance: number = 1000
	duration: number = 0
	timerId: NodeJS.Timeout | null = null
	static isMoving: any
	static distance: any
	static duration: any

	constructor() {
		makeAutoObservable(this)
	}

	calculateDistance = () => {
		const screenWidth = window.innerWidth
		const maxDistance = 0.7 * screenWidth
		const scaleFactor = maxDistance / this.distance
		return this.distance * scaleFactor
	}

	handleStartEngine = (id: number, backendVelocity: number) => {
		if (!id) return

		const scaledDistance = this.calculateDistance()
		const calculatedDuration = scaledDistance / backendVelocity

		this.distance = scaledDistance
		this.duration = calculatedDuration
		this.isMoving = true

		if (this.timerId) {
			clearTimeout(this.timerId)
		}

		// When the car reaches the finish line
		this.timerId = setTimeout(async () => {
			if (this.isMoving) {
				this.isMoving = false
				toast.success(`Car ${id} reached the finish line!`)

				// Add the logic for checking if the car is the winner
				const isWinner = this.checkWinner(id, calculatedDuration)
				if (isWinner) {
					await winnerStore.addOrUpdateWinner(id, calculatedDuration)
				}
			}
		}, calculatedDuration * 1000)
	}

	// This function checks if the car is the first to finish
	checkWinner = (carId: number, raceTime: number) => {
		// Logic to ensure it's the first car finishing the race
		if (!winnerStore.firstPlace) {
			winnerStore.firstPlace = { carId, raceTime }
			return true
		}
		return false
	}

	handleStopEngine = () => {
		this.isMoving = false

		if (this.timerId) {
			clearTimeout(this.timerId)
			this.timerId = null
		}

		this.distance = 0
		this.duration = 0
	}

	handleStartAllCars = async () => {
		try {
			for (const car of carStore.cars) {
				await this.handleStartUtil(car.id ?? 0)
			}
			toast.success('Все машины начали движение')
		} catch (error) {
			console.error('Ошибка при запуске всех машин:', error)
			toast.error('Ошибка при запуске всех машин')
		}
	}

	handleStartUtil = async (id: number) => {
		if (!id) return
		try {
			const { velocity } = await carStore.updateEngine(id, 'started')
			const backendVelocity = velocity * 2
			this.handleStartEngine(id, backendVelocity)
		} catch (error) {
			console.error('Error starting car:', error)
			toast.error('Error starting car')
		}
	}
}

export default RaceStore
export const raceStore = new RaceStore()
