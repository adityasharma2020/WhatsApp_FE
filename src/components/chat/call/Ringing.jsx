import React, { useEffect, useState } from 'react';
import { CloseIcon } from '../../../svg';
import { BsCheck } from 'react-icons/bs';

const Ringing = ({
  call,
  setCall,
  callNotRespond,
  callRejected,
  answerCall,
  setShow,
  callAccepted,
}) => {
  const [timer, setTimer] = useState(0);
  const { name, picture } = call;
  let interval;

  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer <= 60) {
      handleTimer();
    } else {
      setCall({ ...call, gettingCall: false });
      setShow(false);
      if (!callAccepted) {
        callNotRespond();
      }
    }
    return () => clearInterval(interval);
  }, [call, callAccepted, callNotRespond, handleTimer, interval, setCall, setShow, timer]);

  const [isDragging, setIsDragging] = useState(false);

  const handleStartDrag = () => {
    setIsDragging(true);
  };

  const handleStopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-[80%] md:w-[50%] lg:w-[30%] dark:bg-dark_bg_5 rounded-lg fixed top-1/4 left-10 shadow-2xl z-50 cursor-move">
      {/* Container */}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/* call info */}
        <div className="flex items-center gap-x-2">
          <img src={picture} alt={`Caller pic`} className="w-10 h-10 md:w-28 md:h-28 rounded-full" />
          <div>
            <h1 className="dark:text-white text-sm">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2 text-xs">Whatsapp Video...</span>
          </div>
        </div>

        {/* call actions */}
        <ul className="flex items-center gap-x-2">
          <li onClick={() => callRejected()}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500" onTouchStart={handleStartDrag} onTouchEnd={handleStopDrag}>
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>

          <li onClick={answerCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500" onTouchStart={handleStartDrag} onTouchEnd={handleStopDrag}>
              <BsCheck className="fill-white w-5" />
            </button>
          </li>
        </ul>
      </div>

      {/*Ringtone*/}
      <audio src="../../../../audio/ringtone.mp3" autoPlay loop />
    </div>
  );
};

export default Ringing;
