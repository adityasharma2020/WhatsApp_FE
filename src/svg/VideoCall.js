function VideoCallIcon({ className }) {
	return (
		<svg
			fill='#000000'
			width='800px'
			height='800px'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
      className={className}
		>
			<path d='M17 10.5V7C17 6.73478 16.8946 6.48043 16.7071 6.29289C16.5196 6.10536 16.2652 6 16 6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7V17C3 17.2652 3.10536 17.5196 3.29289 17.7071C3.48043 17.8946 3.73478 18 4 18H16C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V13.5L21 17.5V6.5L17 10.5ZM8 15V9L12.5 12L8 15Z' />
		</svg>
	);
}

export default VideoCallIcon;
