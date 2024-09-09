'use client'

import carStore from '@/app/store/car-store'
import { RotateCcw, RotateCw } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { CarItem } from './car-item'

const CarDisplay = () => {
	useEffect(() => {
		carStore.getCars()
	}, [])

	const handlePageChange = (page: number) => {
		carStore.setPage(page)
	}

	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-5xl font-bold mb-8'>Cars in Garage</h1>
			<div className='bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-6xl'>
				<table className='min-w-full table-auto border-separate border-spacing-0'>
					<thead className='bg-gray-900 text-white'>
						<tr>
							<th className='px-1 py-2 border-b'>Distance</th>
							<th className='px-4 py-2 border-b'>Finish</th>
						</tr>
					</thead>
					<tbody className='text-white'>
						{carStore.paginatedCars.length ? (
							carStore.paginatedCars.map(car => (
								<CarItem
									key={car.id}
									id={car.id}
									name={car.name}
									color={car.color}
								/>
							))
						) : (
							<tr>
								<td colSpan={4} className='px-4 py-2 text-center border-b'>
									No cars available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div className='mt-8 flex gap-2'>
				<button
					className='px-2 py-2 bg-blue-500 text-white rounded-full'
					disabled={carStore.currentPage === 1}
					onClick={() => handlePageChange(carStore.currentPage - 1)}
				>
					<RotateCcw />
				</button>
				{Array.from({ length: carStore.totalPages }, (_, index) => (
					<button
						key={index + 1}
						className={`px-4 py-2 rounded-full ${
							carStore.currentPage === index + 1
								? 'bg-purple-500 text-white'
								: 'bg-blue-500 text-white'
						}`}
						onClick={() => handlePageChange(index + 1)}
					>
						{index + 1}
					</button>
				))}
				<button
					className='px-2 py-2 bg-blue-500 text-white rounded-full'
					disabled={carStore.currentPage === carStore.totalPages}
					onClick={() => handlePageChange(carStore.currentPage + 1)}
				>
					<RotateCw />
				</button>
			</div>
			<div className='mt-8 w-full max-w-6xl'>
				<div className='border-t-4 border-dashed border-white h-6'></div>
			</div>
		</div>
	)
}

export default observer(CarDisplay)
