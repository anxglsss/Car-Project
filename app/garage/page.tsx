'use client'

import CarDisplay from '@/components/shared/car-display'
import { Forms } from '@/components/shared/car-forms'
import { observer } from 'mobx-react-lite'

const Garage = () => {
	return (
		<div>
			<Forms />
			<CarDisplay />
		</div>
	)
}

export default observer(Garage)
