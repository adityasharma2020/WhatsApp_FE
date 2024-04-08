/* 
  So when we select the image from the user, we are going to presernve that
  image in "picture" state (the actual file) this is what cloudinary accepts.
  But as we also want to show the preview of the selected image on the page and 
  to put it in the href attribute we have to convert to base64 so that it can be able to read.

  The FileReader object allows JavaScript to read the contents of files (such as images) asynchronously. 
  In this case, reader.readAsDataURL(pic) is used to read the contents of the selected image file.

  The readAsDataURL method reads the contents of the file and returns them as a data URL. This data URL 
  represents the file's data as a base64-encoded string, which can be used to display the image directly in HTML.
*/

import { useRef, useState } from 'react';

export default function Picture({ readablePicture, setReadablePicture, setPicture }) {
	const [error, setError] = useState('');
	const inputRef = useRef();

	const handlePicture = (e) => {
	
		let pic = e.target.files[0];
		if (pic.type !== 'image/jpeg' && pic.type !== 'image/png' && pic.type !== 'image/webp') {
			setError(`${pic.name}  format is not supported.`);
			return;
		} else if (pic.size > 5 * 1024 * 1024) {
			//5 mb
			setError(`${pic.name}  size is too large,maximum 5mb is allowed.`);
		} else {
			setError('');
			setPicture(pic);

			// -------------reading the picture--------------------------
			const reader = new FileReader();
			reader.readAsDataURL(pic);
			reader.onload = (e) => {
				setReadablePicture(e.target.result);
			};

			// Reset the file input value to allow selecting the same file again.
			e.target.value = null;
		}
	};

	const handleChangePic = () => {
		setPicture('');
		setReadablePicture('');
		// inputRef.current.click();
	};

	return (
		<div className='mt-8 content-center dark:text-dark_text_1 space-y-1'>
			<label htmlFor='picture' className='text-sm font-bold tracking-wide'>
				Picture (Optional)
			</label>

			{readablePicture ? (
				<div>
					<img
						src={readablePicture}
						alt='displayImage'
						className='w-20 h-20 object-cover rounded-full'
					/>
					{/* change pic */}
					<div
						className='mt-2 py-1 w-20  dark:bg-dark_bg_3 rounded-md text-xs flex 
        items-center justify-center cursor-pointer'
						onClick={() => handleChangePic()}
					>
						Remove
					</div>
				</div>
			) : (
				<div
					className='w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex 
        items-center justify-center cursor-pointer'
					onClick={() => inputRef.current.click()}
				>
					Upload Picture
				</div>
			)}
			<input
				type='file'
				name='picture'
				id='picture'
				hidden
				ref={inputRef}
				accept='image/png,image/jpeg,image/webp'
				onChange={handlePicture}
			/>

			{/* error */}
			<div className='mt-2'>
				<p className='text-red-400'>{error}</p>
			</div>
		</div>
	);
}
