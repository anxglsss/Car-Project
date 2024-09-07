// components/Managebar.tsx
'use client'

import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CirclePlay, TimerReset } from 'lucide-react'
import toast from 'react-hot-toast'
import carStore from '../store/car-store'

const Managebar = observer(() => {
	const [carName, setCarName] = useState('')
	const [carColor, setCarColor] = useState('#000000')

	// Добавление новой машины
	const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		carStore.addcar({
			id: carStore.cars.length + 1,
			name: carName,
			color: carColor,
		})
		console.log(`Added car: ${carName}, Color: ${carColor}`)
	}

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!carStore.selectedCar) return
		carStore.setColor(carStore.selectedCar?.id, carName, carColor)
		toast.success(`Updated car: ${carName}, Color: ${carColor}`)
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
					onSubmit={handleCreate}
				>
					<input
						type='text'
						id='carName'
						placeholder='Car name'
						className='w-[40%] text-black px-2 py-1 border rounded-lg focus:outline-none h-8'
					/>
					<input
						type='color'
						id='carColor'
						className='w-8 text-black h-8 p-1 rounded-lg cursor-pointer'
					/>
					<Button type='submit'>Create</Button>
				</form>
				<form
					className='p-6 gap-2 rounded-lg flex items-center'
					onSubmit={handleUpdate}
				>
					<input
						type='text'
						id='carName'
						placeholder='Car name'
						className='w-[40%] text-black px-2 py-1 border rounded-lg focus:outline-none h-8'
					/>
					<input
						type='color'
						id='carColor'
						className='w-8 text-black h-8 p-1 rounded-lg cursor-pointer'
					/>
					<Button type='submit'>Update</Button>
				</form>
				<Button className='bg-purple-600 font-bold'>Generate</Button>
			</div>
		</div>
	)
})

export default Managebar
