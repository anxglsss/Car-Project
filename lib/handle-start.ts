import carStore from '@/app/store/car-store'
import RaceStore from '@/app/store/race-store'
import toast from 'react-hot-toast'

export const handleStartUtil = async (id: number, raceStore: RaceStore) => {
	if (!id) return
	try {
		const { velocity } = await carStore.updateEngine(id, 'started')
		const backendVelocity = velocity * 2
		raceStore.handleStartEngine(id, backendVelocity)
	} catch (error) {
		console.error('Error starting car:', error)
		toast.error('Error starting car')
	}
}
