import { useCreateForm } from '@/app/hooks/use-create-form'
import { useUpdateForm } from '@/app/hooks/use-update-form'
import { ICar } from '@/app/interfaces/main'
import carStore from '@/app/store/car-store'
import { CirclePlay, TimerReset } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

export const Forms = () => {
	const { register, handleSubmit, setValue } = useCreateForm()
	const {
		register: register2,
		handleSubmit: handleSubmit2,
		errors: errors2,
	} = useUpdateForm()

	const handleCreate = (
		data: { name: string; color: string },
		event: React.FormEvent<HTMLFormElement>
	) => {
		if (!data.name || !data.color) {
			toast.error('Name and color are required')
			return
		}
		event.preventDefault()
		const carData: ICar = { name: data.name, color: data.color }
		carStore.createCar(carData)
		toast.success('Car created successfully')
		setValue('name', '')
		console.log('Success', data, carData)
	}

	const handleUpdate = (
		data: { carName: string; carColor: string },
		event: React.FormEvent<HTMLFormElement>
	) => {
		if (!data.carName || !data.carColor) {
			toast.error('Name and color are required')
			return
		}
		event.preventDefault()
		const carData: ICar = { name: data.carName, color: data.carColor }
		if (!carStore.selectedCarId) return
		carStore.updateCar(carStore.selectedCarId, data.carColor, data.carName)
		toast.success('Car updated successfully')
		setValue('name', '')
		console.log('Success', data, carData)
	}
	return (
		<div>
			<div className='flex gap-3 items-center justify-between'>
				<div className='flex gap-2'>
					<Button className='button-controller flex gap-2'>
						Race
						<CirclePlay />
					</Button>
					<Button className='button-controller flex gap-2'>
						Reset
						<TimerReset />
					</Button>
				</div>
				<form
					className='p-6 gap-2 rounded-lg flex items-center'
					onSubmit={handleSubmit((data, event) => handleCreate(data, event))}
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
				<form
					className='p-6 gap-2 rounded-lg flex items-center'
					onSubmit={handleSubmit2((data, event) => handleUpdate(data, event))}
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
				<Button className='bg-purple-600 font-bold'>Generate</Button>
			</div>
		</div>
	)
}
