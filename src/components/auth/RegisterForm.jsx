import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import PulseLoader from 'react-spinners/PulseLoader';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeStatus, registerUser } from '../../Slices/userSlice';
import Picture from './Picture';
import axios from 'axios';

const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

export default function RegisterForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status, error } = useSelector((state) => state.user);
	const [picture, setPicture] = useState(); // here we put the image that we upload to cloudinary
	const [readablePicture, setReadablePicture] = useState(''); //this is the file that we read from user

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(signUpSchema) });

	// -----------------submit handler----------------------------
	const onSubmit = async (data) => {
	
		dispatch(changeStatus('loading'));
		if (picture) {
			//upload to cloudinary and then register user
			await uploadImage().then(async (pictureData) => {
				let res = await dispatch(
					registerUser({ ...data, picture: pictureData?.secure_url })
				);

				if (res?.payload?.user) {
					navigate('/');
				}
			});
		} else {
			let res = await dispatch(registerUser({ ...data, picture: '' }));
			if (res?.payload?.user) {
				navigate('/');
			}
		}
	};

	const uploadImage = async () => {
		let formData = new FormData();
		formData.append('upload_preset', cloud_secret);
		formData.append('file', picture);

		const { data } = await axios.post(
			`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
			formData
		);

		return data;
	};

	return (
		<div className='min-h-screen w-full flex my-10 mx-5 items-center justify-center overflow-hidden'>
			{/* container */}
			<div className=' w-full max-w-md y-8 px-10 py-5 dark:bg-dark_bg_2 rounded-xl'>
				{/* heading */}
				<div className='text-center  dark:text-dark_text_1'>
					<h2 className='mt-6 text-3xl font-bold'>Welcome</h2>
					<p className='mt-2 text-sm'>sign up</p>
				</div>

				{/* form */}
				<form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-6 '>
					<AuthInput
						name='name'
						type='text'
						placeholder='Full Name'
						register={register}
						error={errors?.name?.message}
					/>

					<AuthInput
						name='email'
						type='text'
						placeholder='Email address'
						register={register}
						error={errors?.email?.message}
						
					/>
					<AuthInput
						name='mobile'
						type='number'
						placeholder='Mobile number'
						register={register}
						error={errors?.mobile?.message}
					/>

					<AuthInput
						name='status'
						type='text'
						placeholder='Status (Optional)'
						register={register}
						error={errors?.status?.message}
					/>

					<AuthInput
						name='password'
						type='password'
						placeholder='Password'
						register={register}
						error={errors?.password?.message}
					/>

					{/* picture */}
					<Picture
						readablePicture={readablePicture}
						setReadablePicture={setReadablePicture}
						setPicture={setPicture}
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
						{status === 'loading' ? <PulseLoader color='#fff' size={10} /> : 'Sign Up'}
					</button>

					{/* sign in link */}
					<p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
						<span>have an account ?</span>
						<Link
							to='/login'
							className='underline  text-sm cursor-pointer transition ease-in duration-300'
						>
							Sign In
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
