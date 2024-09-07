'use cliebt'

import { CirclePlay, TimerReset } from 'lucide-react'
import { Button } from '../../components/ui/button'

const Managebar = () => {
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
				<form className='p-6 gap-2 rounded-lg flex items-center'>
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
				<form className='p-6 gap-2 rounded-lg flex items-center'>
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
}

export default Managebar
