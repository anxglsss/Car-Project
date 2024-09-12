import { engineStatus } from '../interfaces/main'
import { axiosInstance } from './axios-instance'

export async function updateEngine(id: number, status: engineStatus) {
	try {
		const response = await axiosInstance.patch('/engine', null, {
			params: {
				id,
				status,
			},
		})
		return response.data
	} catch (e) {
		console.error('Error updating engine status:', e)
		throw new Error('Error updating engine status')
	}
}

export async function updateEngineForAll(id: number, status: engineStatus) {
	try {
		const response = await axiosInstance.patch('/engine', null, {
			params: {
				id,
				status,
			},
		})
		return response.data
	} catch (e) {
		console.error('Error updating engine status for all:', e)
		throw new Error('Error updating engine status for all')
	}
}

export async function switchEngineToDrive(id: number) {
	try {
		const response = await axiosInstance.patch('/engine', null, {
			params: {
				id,
				status: 'drive',
			},
		})
		return response.data
	} catch (e) {
		console.error('Error switching engine to drive:', e)
		throw new Error('Error switching engine to drive')
	}
}
