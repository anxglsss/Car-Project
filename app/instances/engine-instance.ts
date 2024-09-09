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
