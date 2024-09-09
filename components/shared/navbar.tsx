import { Button } from '../ui/button'

const Navbar = () => {
	return (
		<div className='bg-gray-800 py-[2%] text-white p-4 px-[7%]'>
			<div className='flex justify-between items-center'>
				<div className='flex space-x-4'>
					<div className='flex flex-col items-center gap-3'>
						<Button
							className='text-slate-900 px-8 text-lg font-bold py-5'
							variant='outline'
						>
							Garage
						</Button>
						<Button className='bg-green-500 hover:bg-green-700 px-8 text-lg font-bold py-5'>
							Winners
						</Button>
					</div>
				</div>

				<h1 className='text-5xl font-bold font-custom'>ASYNC RACE</h1>
			</div>
		</div>
	)
}

export default Navbar
