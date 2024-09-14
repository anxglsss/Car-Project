'use client'

import WinnerItem from '@/components/shared/winner-item'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { winnerStore } from '../store/winner-store'

const WinnersPage = observer(() => {
	useEffect(() => {
		winnerStore.getWinners()
	}, [winnerStore.winners])

	return (
		<div className='p-6 flex flex-col items-center'>
			<h1 className='text-6xl font-bold mb-8'>Winners</h1>
			<div className='bg-gray-800 shadow-lg rounded-lg overflow-hidden xl:w-[180vh] lg:w-[140vh] md:w-[120vh] sm:w-[100vh] w-[80vh] '>
				<table className='min-w-full '>
					<thead className='bg-gray-900 text-white '>
						<tr>
							<th className='px-1 py-2 border-b'>Delete</th>
							<th className='px-1 py-2 border-b'>ID</th>
							<th className='px-4 py-2 border-b'>Wins</th>
							<th className='px-4 py-2 pr-28 border-b'>Best Time</th>
						</tr>
					</thead>
					<tbody className='text-white'>
						{winnerStore.winners.length ? (
							winnerStore.winners.map(car => (
								<WinnerItem key={car.id} car={car} />
							))
						) : (
							<tr>
								<td colSpan={5} className='px-4 py-2 text-center border-b'>
									No winners
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
})
export default WinnersPage
