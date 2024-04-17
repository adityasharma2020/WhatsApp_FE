import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import PulseLoader from 'react-spinners/PulseLoader';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Slices/userSlice';

export default function RegisterForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status, error } = useSelector((state) => state.user);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(signInSchema) });

	// -----------------submit handler----------------------------
	const onSubmit = async (values) => {
		let res = await dispatch(loginUser({ ...values }));
		if (res?.payload?.user) {
			navigate('/');
		}
	};

	return (
		<div className='h-full  w-full flex my-10 mx-5 items-center justify-center overflow-hidden'>
			{/* container */}
			<div className=' w-full max-w-md y-8 px-10 py-5 dark:bg-dark_bg_2 rounded-xl'>
				{/* heading */}
				<div className='text-center  dark:text-dark_text_1'>
					<h2 className='mt-6 text-3xl font-bold'>Welcome Back</h2>
					<p className='mt-2 text-sm'>sign In</p>
				</div>

				{/* form */}
				<form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-6 '>
					<AuthInput
						name='email'
						type='text'
						placeholder='Email address'
						register={register}
						error={errors?.email?.message}
					/>

					<AuthInput
						name='password'
						type='password'
						placeholder='Password'
						register={register}
						error={errors?.password?.message}
					/>

					{/* if we have an Error while registering */}

					{error ? (
						<div>
							<p className='text-red-400'>{error}</p>
						</div>
					) : null}

					{/* submit button */}
					<button
						className='w-full flex justify-center bg-green_1 text-gray-100
						p-4 rounded-full tracking-wide font-bold focus:outline-none
						hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
						type='submit'
					>
						{status === 'loading' ? <PulseLoader color='#fff' size={10} /> : 'Sign In'}
					</button>

					{/* sign in link */}
					<p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
						<span>you do not have an account ?</span>
						<Link
							to='/register'
							className='underline  text-sm cursor-pointer transition ease-in duration-300'
						>
							Sign Up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
