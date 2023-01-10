import { useEffect, useState } from 'react';
import useSound from 'use-sound'; // for handling the sound
import music1 from '../assets/ES_Ewo Ye - Amaroo.mp3';
// import music2 from '../assets/ES_Fishbowl - Collin Lim.mp3';
// import music3 from '../asse~ts/ES_Ordinary Love - Vicki Vox.mp3';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'; // icons for next and previous track
import { IconContext } from 'react-icons'; // for customazing the icons
// import { PlayComponent } from './PlayComponent';

// const PLAY_LIST = [music1, music2, music3];

function Player() {
  // const [soundToPlay, setSoundToPlay] = useState(music1);

  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause, duration, sound }] = useSound(music1, {
    volume: 0.4,
  });

  const [seconds, setSeconds] = useState();

  const [time, setTime] = useState({
    min: '',
    sec: '',
  });

  const [currTime, setCurrTime] = useState({
    min: '',
    sec: '',
  });

  // const onPlay = () => {
  //   setSoundToPlay(PLAY_LIST[Math.round(Math.random() * PLAY_LIST.length)]);
  // };

  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause audio
      setIsPlaying(false);
    } else {
      play(); // play audio
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // setting the seconds state with the current state
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <div className="component">
      <h2>Music Player 🎧</h2>
      <img className="musicCover" src="https://picsum.photos/200/200" />
      <div>
        <div className="title">Rubaiyyan</div>
        <p className="subTitle">Qala</p>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={e => sound.seek([e.target.value])}
        />
      </div>
      <div>
        <button className="playButton">
          <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
        {/* <PlayComponent soundURL={soundToPlay} onPlay={onPlay} /> */}
      </div>
    </div>
  );
}

export default Player;
