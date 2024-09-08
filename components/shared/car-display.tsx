'use client'

import carStore from '@/app/store/car-store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CarItem } from './car-item'

const CarDisplay = () => {
	// Fetch cars when component mounts
	useEffect(() => {
		carStore.getCars()
	}, [])
	return (
		<div>
			<div>
				<div className='flex justify-between'>
					<div>
						<h1 className='text-5xl font-bold  mb-8'>Cars in Garage</h1>
						<ul>
							{carStore.cars.length ? (
								carStore.cars.map(car => (
									<CarItem
										key={car.id}
										id={car.id}
										name={car.name}
										color={car.color}
									/>
								))
							) : (
								<p>No cars available</p>
							)}
						</ul>
					</div>
					<div className='w-1 h-[70vh] bg-white mt-8'></div>
				</div>
			</div>
		</div>
	)
}

export default observer(CarDisplay)
