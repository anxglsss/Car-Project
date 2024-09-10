import { ICar } from '@/app/interfaces/main'
import carStore from '@/app/store/car-store'
import { Car } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

const DISTANCE = 1400 // Distance to the finish line (adjust as needed)

export const CarItem = observer(({ name, color, id }: ICar) => {
	const [position, setPosition] = useState<number>(0) // Position of the car
	const [isMoving, setIsMoving] = useState<boolean>(false) // Whether the car is moving

	useEffect(() => {
		if (!isMoving) return

		const interval = setInterval(() => {
			setPosition(prevPosition => {
				if (prevPosition >= DISTANCE) {
					clearInterval(interval)
					console.log(`Car ${id} has finished the race!`)
					setIsMoving(false)
					return DISTANCE
				}
				return prevPosition + 25 // Increment the position (speed can be adjusted)
			})
		}, 100) // Update position every 100ms

		return () => clearInterval(interval)
	}, [isMoving, id])

	const handleSelect = () => {
		if (!id) return
		if (carStore.selectedCarId === id) {
			carStore.setSelectedCarId(0)
		} else {
			carStore.setSelectedCarId(id)
		}
	}

	const handleDelete = () => {
		if (!id) return
		carStore.removeCar(id)
		toast.success('Successfully deleted car')
	}

	const handleStartEngine = () => {
		if (!id) return
		carStore.updateEngine(id, 'started')
		setIsMoving(true) // Start the car movement
	}

	const handleStopEngine = () => {
		if (!id) return
		carStore.updateEngine(id, 'stopped')
		setIsMoving(false) // Stop the car movement
	}

	return (
		<div className='flex items-center gap-2'>
			<div className='flex items-center gap-2'>
				<div className='ml-4 mr-12'>
					<h1 className='text-2xl absolute'>#{id}</h1>
				</div>
				<div className='flex flex-col items-center gap-2 ml-8'>
					<Button
						className={
							carStore.selectedCarId === id ? 'bg-red-600' : 'bg-slate-900'
						}
						onClick={handleSelect}
					>
						SELECT
					</Button>
					<Button onClick={handleDelete}>REMOVE</Button>
				</div>
				<div className='flex flex-col gap-3 cursor-pointer'>
					<div
						className='border-2 h-6 w-6 border-white flex items-center justify-center'
						onClick={handleStartEngine}
					>
						A
					</div>
					<div
						className='border-2 h-6 w-6 border-white flex items-center justify-center'
						onClick={handleStopEngine}
					>
						B
					</div>
				</div>
				<div
					className='flex items-center justify-center transition-transform duration-300 '
					style={{ transform: `translateX(${position}px)` }}
				>
					<Car color={color} className='w-12 h-12' />
				</div>
				<div className='h-24 w-1 bg-white'></div>
				<h2 className='text-3xl text-white text-opacity-70'>{name}</h2>
				<div className='h-24 w-1 bg-white absolute right-32'></div>
			</div>
		</div>
	)
})
