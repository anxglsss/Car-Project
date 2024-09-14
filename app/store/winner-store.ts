import { action, makeAutoObservable } from 'mobx'
import {
	createWinner,
	deleteWinner,
	getWinners,
	updateWinner,
} from '../instances/winners-instance'
import { ICar } from '../interfaces/main'

class WinnerStore {
	winners: ICar[] = []
	firstPlace: { carId: number; raceTime: number } | null = null

	constructor() {
		makeAutoObservable(this, {
			addOrUpdateWinner: action,
			createWinner: action,
			updateWinner: action,
			deleteWinner: action,
			getWinners: action,
		})
	}

	async addOrUpdateWinner(carId: number, raceTime: number) {
		try {
			const existingWinner = this.winners.find(winner => winner.id === carId)
			if (existingWinner) {
				const newWins = existingWinner.wins ? existingWinner.wins + 1 : 1
				const newBestTime = Math.min(existingWinner.time ?? raceTime, raceTime)
				console.log(
					'Updating winner:',
					carId,
					'New wins:',
					newWins,
					'New best time:',
					newBestTime
				)

				await this.updateWinner(carId, newWins, newBestTime)
			} else {
				console.log(
					'Creating new winner:',
					carId,
					'wins:',
					1,
					'race time:',
					raceTime
				)

				await this.createWinner(carId, 1, raceTime)
			}

			await this.getWinners()
		} catch (e) {
			console.error('Error adding/updating winner: ', e)
		}
	}

	async getWinners() {
		try {
			const data = await getWinners()
			console.log('Fetched winners:', data)
			this.winners = data
		} catch (e) {
			console.error('Error fetching cars at WinnerStore: ', e)
			throw new Error('Error fetching cars at WinnerStore')
		}
	}

	async createWinner(id: number, wins: number, time: number) {
		try {
			const newWinner = await createWinner(id, wins, time)
			this.winners.push(newWinner)
		} catch (e) {
			console.error('Error creating car at WinnerStore: ', e)
			throw new Error('Error creating car at WinnerStore')
		}
	}

	async updateWinner(id: number, wins: number, time: number) {
		try {
			await updateWinner(id, wins, time)
			const findIndex = this.winners.findIndex(winner => winner.id === id)
			if (findIndex !== -1) {
				this.winners[findIndex] = { ...this.winners[findIndex], wins, time }
				this.winners = [...this.winners]
			}

			await this.getWinners()
		} catch (e) {
			console.error('Error updating car at WinnerStore: ', e)
			throw new Error('Error updating car at WinnerStore')
		}
	}

	async deleteWinner(id: number) {
		try {
			await deleteWinner(id)
			const findIndex = this.winners.findIndex(winner => winner.id === id)
			if (findIndex !== -1) {
				this.winners.splice(findIndex, 1)
			}
		} catch (e) {
			console.error('Error deleting on WinnerStore: ', e)
			throw new Error('Error deleting on WinnerStore')
		}
	}
}
export const winnerStore = new WinnerStore()
