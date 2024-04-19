import { useState } from 'react';
import DownloadIcon from '../../../svg/Download';

export default function FileImageVideo({ url, type }) {
	return (
		<div className='z-20'>
			{type === 'IMAGE' ? (
        <a href={url} download target='_blank' rel='noreferrer'>
          	<img src={url} alt='' className={`cursor-pointer `} />
				</a>
			) : (
				<video src={url} controls className='cursor-pointer'></video>
			)}
		</div>
	);
}
