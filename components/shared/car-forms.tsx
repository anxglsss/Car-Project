import { useCreateForm } from '@/app/hooks/use-create-form'
import { useUpdateForm } from '@/app/hooks/use-update-form'
import { ICar } from '@/app/interfaces/main'
import carStore from '@/app/store/car-store'
import { raceStore } from '@/app/store/race-store'

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
		const carData: ICar = { name: data.name, color: data.color }
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
			await Promise.all(
				carStore.cars.map(car => raceStore.handleStartUtil(car.id ?? 0))
			)
			toast.success('All cars started racing')
		} catch (error) {
			console.error('Error starting all cars:', error)
			toast.error('Error starting all cars')
		}
	}

	return (
		<div>
			<div className='flex gap-3 items-center justify-between'>
				<div className='flex gap-2'>
					<Button
						className='button-controller flex gap-2'
						onClick={handleStartAllCars}
					>
						Race All
						<CirclePlay />
					</Button>
					<Button className='button-controller flex gap-2'>
						Reset
						<TimerReset />
					</Button>
				</div>

				{/* Form for creating a new car */}
				<form
					className='p-6 gap-2 rounded-lg flex items-center'
					onSubmit={handleSubmit(handleCreate)}
				>
					<input
						type='text'
						id='carName'
						placeholder='Car name'
						className='w-[40%] text-black px-2 py-1 border rounded-lg focus:outline-none h-8'
						{...register('name')}
					/>
					<input
						type='color'
						id='carColor'
						className='w-8 text-black h-8 p-1 rounded-lg cursor-pointer'
						{...register('color')}
					/>
					<Button type='submit'>Create</Button>
				</form>

				{/* Form for updating a car */}
				<form
					className='p-6 gap-2 rounded-lg flex items-center'
					onSubmit={handleSubmit2(handleUpdate)}
				>
					<input
						type='text'
						id='carName'
						placeholder='Car name'
						className='w-[40%] text-black px-2 py-1 border rounded-lg focus:outline-none h-8'
						{...register2('carName')}
					/>
					<input
						type='color'
						id='carColor'
						className='w-8 text-black h-8 p-1 rounded-lg cursor-pointer'
						{...register2('carColor')}
					/>
					<Button type='submit'>Update</Button>
				</form>

				<Button className='bg-purple-600 font-bold' onClick={handleGenerate}>
					Generate
				</Button>
			</div>
		</div>
	)
})
