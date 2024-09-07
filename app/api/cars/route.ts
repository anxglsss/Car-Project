import axios, { AxiosResponse } from 'axios'

export type Car = {
	name: string
	color: string
	id?: number
}

const API_BASE_URL = 'http://localhost:3000'

export const createCar = async (car: Car): Promise<AxiosResponse<Car>> => {
	try {
		const response = await axios.post<Car>(`${API_BASE_URL}/garage`, car)
		return response
	} catch (error) {
		console.error('Error creating car:', error)
		throw error
	}
}

export const getCars = async (): Promise<AxiosResponse<Car[]>> => {
	try {
		const response = await axios.get<Car[]>(`${API_BASE_URL}/garage`)
		return response
	} catch (error) {
		console.error('Error fetching cars:', error)
		throw error
	}
}
