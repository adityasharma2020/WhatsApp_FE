// import React, { useEffect, useState } from 'react';
// import { CloseIcon, EmojiIcon } from '../../../svg';
// import EmojiPicker from 'emoji-picker-react';

// const EmojiPickerApp = ({ textRef, message, setMessage }) => {
// 	const [showPicker, setShowPicker] = useState(false);
// 	const [cursorPosition, setCursorPosition] = useState();

// 	useEffect(() => {
// 		//the selectionEnd function help us in placing the cursor at the length we want.
// 		// (wherease selectionStart use to get the cursors position.)
// 		textRef.current.selectionEnd = cursorPosition;
// 	}, [cursorPosition]);

// 	const handleEmoji = (emojiData, e) => {
		
// 		const { emoji } = emojiData;

// 		// take the ref of the input and put the emoji selected
// 		// and put it based on the where cursor is pointed.

// 		const ref = textRef.current;
// 		//in case teh input is not in focus so when we select an emoji, input get in focus.
// 		ref.focus();

// 		//selectionStart method baiscally gives us the exact place where our cursor is pointed.
// 		const start = message.substring(0, ref.selectionStart);
// 		const end = message.substring(ref.selectionStart);
// 		const newText = start + emoji + end;
// 		setMessage(newText);

// 		//now we also have to register the place of the cursor to
// 		// the point where the emoji is added ,otherwise it will go to the end
// 		//so user can able to put as many emojis at the same place .

// 		setCursorPosition(start.length + emoji.length);
// 	};
// 	return (
// 		<li>
// 			<button onClick={() => setShowPicker((prev) => !prev)} className='btn' type='button'>
// 				{showPicker ? (
// 					<CloseIcon className='dark:fill-dark_svg_1' />
// 				) : (
// 					<EmojiIcon className='dark:fill-dark_svg_1' />
// 				)}
// 			</button>

// 			{/* Emoji picker */}
// 			{showPicker ? (
// 				<div className='w-full openEmojiAnimation absolute bottom-[55px] -left-[0.5px]'>
// 					<EmojiPicker theme='dark' onEmojiClick={handleEmoji} />
// 				</div>
// 			) : null}
// 		</li>
// 	);
// };

// export default EmojiPickerApp;



import React, { useEffect, useState } from 'react';
import { CloseIcon, EmojiIcon } from '../../../svg';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerApp = ({ textRef, message, setMessage }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleEmoji = (emojiData, e) => {
        const { emoji } = emojiData;
        const ref = textRef.current;
        const selectionStart = ref.selectionStart || 0; // Default to 0 if no cursor position
        const start = message.substring(0, selectionStart);
        const end = message.substring(ref.selectionEnd);
        const newText = start + emoji + end;
        setMessage(newText);

        // Calculate new cursor position
        const newPosition = start.length + emoji.length;
        ref.selectionStart = newPosition;
        ref.selectionEnd = newPosition;

        // Set focus to the input
        ref.focus();
    };

    useEffect(() => {
        // Update cursor position if the message has changed
        const ref = textRef.current;
        const newPosition = message.length;
        ref.selectionStart = newPosition;
        ref.selectionEnd = newPosition;
    }, [message]);

    return (
        <li>
            <button onClick={() => setShowPicker((prev) => !prev)} className='btn' type='button'>
                {showPicker ? (
                    <CloseIcon className='dark:fill-dark_svg_1' />
                ) : (
                    <EmojiIcon className='dark:fill-dark_svg_1' />
                )}
            </button>

            {/* Emoji picker */}
            {showPicker ? (
                <div className='w-full openEmojiAnimation absolute bottom-[55px] -left-[0.5px]'>
                    <EmojiPicker theme='dark' onEmojiClick={handleEmoji} />
                </div>
            ) : null}
        </li>
    );
};

export default EmojiPickerApp;
