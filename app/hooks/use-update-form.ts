import { useForm } from 'react-hook-form'


export const useUpdateForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
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
		setValue,
	}
}
