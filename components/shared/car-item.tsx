import { ICar } from '@/app/interfaces/main'
import carStore from '@/app/store/car-store'
import { Car } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { Button } from '../ui/button'

export const CarItem = observer(({ name, color, id }: ICar) => {
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
	}

	return (
		<div className='flex items-center gap-2'>
			<div className='flex items-center gap-2'>
				<div className='flex flex-col items-center gap-2'>
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
				<div className='flex flex-col gap-3'>
					<div className='border-2 h-6 w-6 border-white flex items-center justify-center'>
						A
					</div>
					<div className='border-2 h-6 w-6 border-white flex items-center justify-center'>
						B
					</div>
				</div>
				<Car color={color} className='w-12 h-12' />
				<div className='h-24 w-1 bg-white'></div>
				<h2 className='text-3xl text-white text-opacity-70'>{name}</h2>
			</div>
		</div>
	)
})
