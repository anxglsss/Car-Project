import { ICar } from '@/app/interfaces/main'
import carStore from '@/app/store/car-store'
import RaceStore from '@/app/store/race-store'
import { handleStartUtil } from '@/lib/handle-start'
import { Car } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

export const CarItem = observer(({ name, color, id }: ICar) => {
	const [raceStore] = useState(() => new RaceStore()) // individual racestore

	const handleStop = () => {
		if (!id) return
		raceStore.handleStopEngine(id)
		carStore.updateEngine(id, 'stopped')
	}

	const handleSelect = () => {
		if (!id) return
		carStore.setSelectedCarId(carStore.selectedCarId === id ? 0 : id)
	}

	const handleDelete = () => {
		if (!id) return
		carStore.removeCar(id)
		toast.success('Car successfully removed')
	}

	return (
		<div className='flex items-center gap-2'>
			<div className='flex items-center gap-2'>
				<div className='ml-4 md:mr-12 mr-2'>
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
						className={
							raceStore.isMoving
								? `border-2 h-6 w-6 border-red-500 flex items-center justify-center`
								: `border-2 h-6 w-6 border-white flex items-center justify-center`
						}
						onClick={() => handleStartUtil(id ?? 0, raceStore)}
					>
						A
					</div>
					<div
						className='border-2 h-6 w-6 border-white flex items-center justify-center'
						onClick={handleStop}
					>
						B
					</div>
				</div>
				<div
					className={`flex items-center justify-center transition-transform ease-in-out`}
					style={{
						transform: raceStore.isMoving
							? `translateX(${raceStore.distance}px)`
							: 'translateX(0)',
						transitionDuration: `${
							raceStore.isMoving ? raceStore.duration : 0
						}s`,
					}}
				>
					<Car color={color} className='w-12 h-12' />
				</div>
				<div className='h-24 w-1 bg-white'></div>
				<h2 className='text-3xl text-white text-opacity-70'>{name}</h2>
			</div>
		</div>
	)
})
