import { useCreateForm } from '@/app/hooks/use-create-form'
import { useUpdateForm } from '@/app/hooks/use-update-form'
import carStore from '@/app/store/car-store'
import { raceStore } from '@/app/store/race-store'

import { handleStartUtil } from '@/lib/handle-start'
import { CirclePlay, TimerReset } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

export const Forms = observer(() => {
	const { register, handleSubmit, setValue } = useCreateForm()
	const { register: register2, handleSubmit: handleSubmit2 } = useUpdateForm()

	const handleCreate = (
		data: { name: string; color: string },
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault()
		if (!data.name || !data.color) {
			toast.error('Name and color are required')
			return
		}
		const carData = { name: data.name, color: data.color }
		carStore.createCar(carData)
		toast.success('Car created successfully')
		setValue('name', '')
	}

	const handleUpdate = (
		data: { carName: string; carColor: string },
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault()
		if (!data.carName || !data.carColor) {
			toast.error('Name and color are required')
			return
		}
		if (!carStore.selectedCarId) return
		carStore.updateCar(carStore.selectedCarId, data.carColor, data.carName)
		toast.success('Car updated successfully')
	}

	const handleGenerate = () => {
		carStore.generateCars()
		toast.success('Cars generated successfully')
	}

	const handleStartAllCars = async () => {
		try {
			for (const car of carStore.cars) {
				await handleStartUtil(car.id ?? 0, raceStore)
			}
			toast.success('Все машины начали гонку')
		} catch (error) {
			console.error('Error starting all cars:', error)
			toast.error('Error starting all cars')
		}
	}

	const handleStopAllCars = async () => {
		try {
			await raceStore.handleStopAllCars()
		} catch (e) {
			console.error('Error stopping all cars:', e)
			toast.error('Error stopping all cars')
		}
	}

	return (
		<div>
			<div className='flex gap-3 items-center justify-between'>
				<div className='md:flex md:flex-row flex flex-col items-center gap-2'>
					<Button
						className='button-controller flex gap-2 lg:px-8 px-4'
						onClick={handleStartAllCars}
					>
						Race All
						<CirclePlay className='lg:block hidden' />
					</Button>
					<Button
						className='button-controller flex gap-2'
						onClick={handleStopAllCars}
					>
						Reset
						<TimerReset className='lg:block hidden' />
					</Button>
				</div>
				<form
					className='p-6 gap-2 rounded-lg flex items-center'
					onSubmit={handleSubmit(handleCreate)}
				>
					<input
						type='text'
						id='carName'
						className='lg:w-[40%] w-[30%] text-black px-2 sm:py-[2px] py-0 border rounded-lg focus:outline-none sm:h-8 h-6'
						{...register('name')}
					/>
					<input
						type='color'
						id='carColor'
						className='sm:w-8 sm:h-8 w-6 h-5 text-black sm:p-1 p-1/2 rounded-lg cursor-pointer'
						{...register('color')}
					/>
					<Button type='submit' className='h-8'>
						Create
					</Button>
				</form>

				<form
					className='p-6 gap-2 rounded-lg flex items-center'
					onSubmit={handleSubmit2(handleUpdate)}
				>
					<input
						type='text'
						id='carName'
						className='lg:w-[40%] w-[30%] text-black px-2 py-1 border rounded-lg focus:outline-none sm:h-8 h-6 '
						{...register2('carName')}
					/>
					<input
						type='color'
						id='carColor'
						className='sm:w-8 sm:h-8 w-6 h-5 text-black sm:p-1 p-1/2 rounded-lg cursor-pointer'
						{...register2('carColor')}
					/>
					<Button type='submit' className='h-8'>
						Update
					</Button>
				</form>

				<Button className='bg-purple-600 font-bold' onClick={handleGenerate}>
					Generate
				</Button>
			</div>
		</div>
	)
})
