export default function AuthInput({ name, type, placeholder, register, error }) {
	return (
		<div className='mt-1 content-center dark:text-dark_text_1 space-y-1'>
			<label htmlFor={name} className='text-sm font-bold tracking-wide'>
				{placeholder}
			</label>
			<input
				style={{ WebkitAppearance: 'none' }}
				className='w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none'
				type={type}
				placeholder={placeholder}
				{...register(name)}
			/>
			{error && <p className='text-red-400'>{error}</p>}
		</div>
	);
}
