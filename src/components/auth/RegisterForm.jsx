import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from '../../utils/validation'
import AuthInput from './AuthInput'
import PulseLoader from 'react-spinners/PulseLoader'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../features/userSlice'
import Picture from './Picture'

export default function RegisterForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.user)
  const [picture, setPicture] = useState() // here we put the image that we upload to cloudinary
  const [readablePicture, setReadablePicture] = useState('') //this is the file that we read from user

  console.log(readablePicture, picture)
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) })

  const onSubmit = (data) => {
    // if (picture) {
    //   //upload to cloudinary and then register user

    // }else{

    // }
    dispatch(registerUser({ ...data, picture: '' }))
    if (status === 'succeeded') navigate('/') 
    // ????????????
  }

 

  return (
    <div className='min-h-screen w-full flex m-10 items-center justify-center overflow-hidden'>
      {/* container */}
      <div className=' w-full max-w-md y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
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
             p-4 rounded-full tracking-wide font-semibold focus:outline-none
              hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
            type='submit'
          >
            {status === 'loading' ? (
              <PulseLoader color='#fff' size={10} />
            ) : (
              'sign Up'
            )}
          </button>

          {/* sign in link */}
          <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
            <span>have an account ?</span>
            <Link
              href='/login'
              className='hover:underline  text-sm cursor-pointer transition ease-in duration-300'
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
