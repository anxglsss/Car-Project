import { ICar } from '@/app/interfaces/main' // Замените путь на свой
import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:3000' // Адрес вашего JSON Server

// Получение всех машин
export const getCars = async (): Promise<ICar[]> => {
	try {
		const response = await axios.get(`${API_BASE_URL}/garage`)
		return response.data
	} catch (error) {
		console.error('Error fetching cars:', error)
		throw error
	}
}

// Создание новой машины
export const createCar = async (car: ICar): Promise<ICar> => {
	try {
		const response = await axios.post<ICar>(`${API_BASE_URL}/garage`, car)
		return response.data
	} catch (error) {
		console.error('Error creating car:', error)
		throw error
	}
}
