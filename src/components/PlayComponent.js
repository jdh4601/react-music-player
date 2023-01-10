import React from 'react';
import useSound from 'use-sound';

function PlayComponent({ soundURL, onPlay }) {
  const [play] = useSound(soundURL);

  const onUserInputChanger = e => {
    play();
    onPlay();
  };
  return <button onClick={onUserInputChanger}>Play</button>;
}

export default PlayComponent;
