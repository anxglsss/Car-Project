import { axiosInstance } from './axios-instance'

export async function getWinners() {
	try {
		const response = await axiosInstance.get('/winners')
		return response.data
	} catch (e) {
		console.error('Error fetching winners:', e)
		throw new Error('Error with fetching cars')
	}
}

export async function getWinnerById(id: number) {
	try {
		const response = await axiosInstance.get(`/winners/${id}`)
		return response.data
	} catch (e) {
		console.error('Error fetching winner by id:', e)
		throw new Error('Error with fetching car by id')
	}
}

export async function createWinner(id: number, wins: number, time: number) {
	try {
		const response = await axiosInstance.post('/winners', {
			id,
			wins,
			time,
		})
		return response.data
	} catch (e) {
		console.error('Error creating winner:', e)
		throw new Error('Error with creating car')
	}
}

export async function deleteWinner(id: number) {
	try {
		await axiosInstance.delete(`/winners/${id}`)
	} catch (e) {
		console.error('Error deleting winner:', e)
		throw new Error('Error with deleting car')
	}
}

export async function updateWinner(id: number, wins: number, time: number) {
	try {
		const response = await axiosInstance.patch('/winners', null, {
			params: {
				id,
				wins,
				time,
			},
		})
		return response.data
	} catch (e) {
		console.error('Error updating winner:', e)
		throw new Error('Error with updating car')
	}
}
