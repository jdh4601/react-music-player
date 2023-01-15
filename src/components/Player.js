import { useEffect, useState } from 'react';
import useSound from 'use-sound'; // for handling the sound
import musicUrl1 from '../assets/ES_Ewo Ye - Amaroo.mp3';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'; // icons for next and previous track
import { IconContext } from 'react-icons'; // for customazing the icons
import MusicList from './MusicList';

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause, duration, sound }] = useSound(musicUrl1, {
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

  // 재생 버튼 클릭 이벤트리스너
  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause audio
      setIsPlaying(false);
    } else {
      play(); // play audio
      setIsPlaying(true);
    }
  };

  // 이전 음악 재생 버튼 클릭 이벤트리스너
  const playingPrev = () => {
    play();
  };

  // 재생, 정지 될 때 -> sec, min, secRemain 업데이트
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

  // sound 재생될 때마다 0.05초 간격으로 min, sec 업데이트
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
    }, 50);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <div className="component">
      <h2>Music Player 🎧</h2>
      <img className="musicCover" src="https://picsum.photos/200/200" />
      <div>
        <h3 className="title">Rubaiyyan - Qala</h3>
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
      <div className="btn-container">
        <button className="playButton" onClick={playingPrev}>
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
        <MusicList />
      </div>
    </div>
  );
}

export default Player;
