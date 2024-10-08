import { generateRandomCar } from '@/lib/generate-random-car'
import { ICar } from '../interfaces/main'
import { axiosInstance } from './axios-instance'

export async function getCars() {
	try {
		const response = await axiosInstance.get('/garage')
		return response.data
	} catch (e) {
		console.error(e)
		throw new Error('Failed to fetch cars')
	}
}

export async function getCarById(id: number) {
	try {
		const response = await axiosInstance.get(`/garage/${id}`)
		return response.data
	} catch (e) {
		console.error(e)
		throw new Error(`Failed to fetch car by ${id}`)
	}
}

export async function createCar(car: ICar, id: number) {
	try {
		const response = await axiosInstance.post('/garage', {
			name: car.name,
			color: car.color,
			id,
		})
		return response.data
	} catch (e) {
		console.error(e)
		throw new Error('Failed to create car')
	}
}

export async function generateCars() {
	try {
		const carPromises = Array.from({ length: 100 }, () => generateRandomCar())
		await Promise.all(
			carPromises.map(car => axiosInstance.post('/garage', car))
		)

		const response = await axiosInstance.get('/garage')
		return response.data
	} catch (e) {
		console.error(e)
		throw new Error('Failed to generate cars')
	}
}

export async function updateCar(id: number, color: string, name: string) {
	try {
		const response = await axiosInstance.patch(`/garage/${id}`, { color, name })
		return response.data
	} catch (e) {
		console.error(e)
		throw new Error(`Failed to update car by ${id}`)
	}
}

export async function deleteCar(id: number) {
	try {
		const response = await axiosInstance.delete(`/garage/${id}`)
		return response.data
	} catch (e) {
		console.error(e)
		throw new Error(`Failed to delete car by ${id}`)
	}
}
