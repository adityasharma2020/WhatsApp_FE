import React, { useState, useEffect } from 'react';
import CloseIcon from '../../svg/Close';

const InstallPWAButton = () => {
	const [installPromptEvent, setInstallPromptEvent] = useState(null);
	const [isVisible, setIsVisible] = useState(false); // Control visibility of the prompt

	useEffect(() => {
		const handleBeforeInstallPrompt = (event) => {
			event.preventDefault();
			// Check if the user has already installed the app
			if (window.matchMedia('(display-mode: standalone)').matches) {
			
				// App is installed, no need to show the install prompt
				setIsVisible(false);
			} else {
				setInstallPromptEvent(event);
				setIsVisible(true); // Show the prompt UI only if app isn't installed
			}
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	}, []);

	const handleInstallClick = () => {
		if (installPromptEvent) {
			installPromptEvent.prompt();
			installPromptEvent.userChoice.then((choiceResult) => {
			
				setInstallPromptEvent(null);
				setIsVisible(false); // Hide after interaction
			});
		}
	};

	const handleClose = () => {
		setIsVisible(false); // Simply hide the prompt UI
	};

	if (!isVisible) return null; // Don't render anything if not visible

	return (
		<div className='fixed bottom-0 inset-x-0 w-full md:max-w-lg mx-auto'>
			<div className='bg-slate-800 p-3 md:p-2 rounded-md flex justify-between items-center'>
				<span className='text-slate-200 text-sm'>
					Install this app for a better experience!
				</span>
				<div className='flex items-center gap-4'>
					<button
						onClick={handleInstallClick}
						className='bg-green_1 font-bold text-white py-2 px-4 rounded-lg'
					>
						Install
					</button>
					<button
						onClick={handleClose}
						className='bg-slate-700 text-white rounded-full p-2'
					>
						<CloseIcon className='w-4 h-4 fill-current' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default InstallPWAButton;
