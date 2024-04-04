import React from 'react'
import {useForm} from 'react-hook-form'

export default function LoginForm() {
  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* container */}
      <div className='max-w-md y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
        {/* heading */}
        <div className='text-center dark:text-dark_text_1'>
          <h2 className='mt-6 text-3xl font-bold'>Welcome Back</h2>
          <p className='mt-2 text-sm'>sign in</p>
        </div>

        {/* form */}
        <form className='mt-6 space-y-6 '></form>
      </div>
    </div>
  )
}
