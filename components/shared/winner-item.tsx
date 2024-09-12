import { ICar } from '@/app/interfaces/main'
import { winnerStore } from '@/app/store/winner-store'
import { Button } from '../ui/button'

const WinnerItem = ({ car }: { car: ICar }) => {
	const handleDelete = (id: number) => {
		try {
			winnerStore.deleteWinner(id)
		} catch (e) {
			console.error('Error deleting car on client:', e)
		}
	}

	return (
		<tr className=''>
			<td className='px-2 ml-40 py-3 border-b'>
				<Button
					className='bg-red-500 px-3 py-2'
					onClick={() => handleDelete(car.id ?? 0)}
				>
					Delete
				</Button>
			</td>
			<td className='px-32 text-lg font-bold py-3 border-b'>
				<div className='flex gap-3 items-center'>{car.id}</div>
			</td>
			<td className='px-12 text-lg font-bold py-2 border-b'>{car.wins}</td>
			<td className='px-12 text-lg font-bold py-2 border-b'>
				{car.time?.toFixed(2)}s
			</td>
		</tr>
	)
}

export default WinnerItem
