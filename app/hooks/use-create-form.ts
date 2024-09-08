import { useForm } from 'react-hook-form'

export const useCreateForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			carName: '',
			carColor: '#000000',
		},
	})
	return {
		register,
		handleSubmit,
		errors,
	}
}
