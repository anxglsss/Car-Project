import { ICar } from '@/app/interfaces/main'
import carStore from '@/app/store/car-store'
import { Car } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

export const CarItem = observer(({ name, color, id }: ICar) => {
	const [isMoving, setIsMoving] = useState<boolean>(false)
	const [distance, setDistance] = useState<number>(0)
	const [velocity, setVelocity] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const carRef = useRef<HTMLDivElement>(null)
	const backendDistance = 1000

	const calculateDistance = () => {
		const screenWidth = window.innerWidth
		const maxDistance = 0.7 * screenWidth
		const scaleFactor = maxDistance / backendDistance
		return backendDistance * scaleFactor
	}

	const handleStartEngine = async () => {
		if (!id) return
		try {
			const { velocity: backendVelocity } = await carStore.updateEngine(
				id,
				'started'
			)
			const scaledDistance = calculateDistance()
			const calculatedDuration = scaledDistance / backendVelocity

			setDistance(scaledDistance)
			setVelocity(backendVelocity)
			setDuration(calculatedDuration)
			setIsMoving(true)

			setTimeout(() => {
				setIsMoving(false)
				toast.success(`Car ${id} достиг финиша!`)
			}, calculatedDuration * 1000)
		} catch (error) {
			toast.error('Ошибка при запуске двигателя')
		}
	}

	const handleStopEngine = () => {
		if (!id) return
		carStore.updateEngine(id, 'stopped')
		setIsMoving(false)

		setTimeout(() => {
			setDistance(0)
		}, 0)
	}

	const handleSelect = () => {
		if (!id) return
		carStore.setSelectedCarId(carStore.selectedCarId === id ? 0 : id)
	}

	const handleDelete = () => {
		if (!id) return
		carStore.removeCar(id)
		toast.success('Автомобиль успешно удален')
	}

	useEffect(() => {
		const updateDistanceOnResize = () => {
			setDistance(calculateDistance())
		}
		window.addEventListener('resize', updateDistanceOnResize)

		return () => {
			window.removeEventListener('resize', updateDistanceOnResize)
		}
	}, [])

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
					ref={carRef}
					className={`flex items-center justify-center transition-transform`}
					style={{
						transform: isMoving ? `translateX(${distance}px)` : 'translateX(0)',
						transitionDuration: `${isMoving ? duration : 0}s`,
					}}
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
