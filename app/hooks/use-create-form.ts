import { useForm } from 'react-hook-form'
import { ICar } from '../interfaces/main'

export const useCreateForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICar>({
		defaultValues: {
			name: '',
			color: '#000000',
		},
	})
	return {
		register,
		handleSubmit,
		errors,
	}
}
