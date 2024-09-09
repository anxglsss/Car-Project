'use client'

import carStore from '@/app/store/car-store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CarItem } from './car-item'

const CarDisplay = () => {
	useEffect(() => {
		carStore.getCars()
	}, [])
	return (
		<div>
			<div>
				<div className='flex justify-between'>
					<div>
						<h1 className='text-5xl font-bold mb-8'>Cars in Garage</h1>
						<div className='flex'>
							<div className='w-1 h-[90vh] bg-white'></div>

							<div className='flex'>
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
						</div>
					</div>
					<div className='w-1 h-[100vh] bg-white mt-8'></div>
				</div>
			</div>
		</div>
	)
}

export default observer(CarDisplay)
