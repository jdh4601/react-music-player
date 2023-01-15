import React, { useState } from 'react';
import useSound from 'use-sound';
import musicUrl1 from '../assets/ES_Ewo Ye - Amaroo.mp3';
import musicUrl2 from '../assets/ES_Fishbowl - Collin Lim.mp3';
import musicUrl3 from '../assets/ES_Ordinary Love - Vicki Vox.mp3';
import { IconContext } from 'react-icons';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSpring, animated } from 'react-spring';
import styled, { css, keyframes } from 'styled-components';
import './MusicList.css';

const PLAY_LIST = [
  {
    id: 1,
    artist: 'Amaroo',
    title: 'Ewo Ye',
    soundUrl: musicUrl1,
  },
  {
    id: 2,
    artist: 'Collin Lim',
    title: 'Fishbowl',
    soundUrl: musicUrl2,
  },
  {
    id: 3,
    artist: 'Vicki Vox',
    title: 'Ordinary Love',
    soundUrl: musicUrl3,
  },
];

const Button = styled.button`
  cursor: pointer;
  font-size: 30px;
  background-color: white;
  border: none;
  float: right;
  margin-right: 10px;
  ${props => {
    if (props.isClicked) {
      return css`
        animation: ${rotation} 1s ease-out;
      `;
    }
  }};
`;

const rotation = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(180deg)
  }
`;

function MusicList() {
  const [isClicked, setIsClicked] = useState(false);

  const toggleHandler = () => {
    setIsClicked(!isClicked);
  };

  const openAnimation = useSpring({
    from: { opacity: '0', maxHeight: '50px' },
    to: { opacity: '1', maxHeight: isClicked ? '200px' : '50px' },
    config: { duration: '200' },
  });

  const [play, { pause }] = useSound(PLAY_LIST[0].musicUrl1, {
    volume: 0.4,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const playingButton = event => {
    event.preventDefault();
    if (isPlaying) {
      pause(); // this will pause audio
      setIsPlaying(false);
    } else {
      console.log(event.target.id);
      play({ id: event.target.id }); // play audio
      setIsPlaying(true);
    }
  };

  const selectMusic = PLAY_LIST.map(music => (
    <li
      key={music.id}
      id={music.id}
      name={music.title}
      className="music-list"
      onClick={playingButton}
    >
      {music.title} - {music.artist}
    </li>
  ));

  const musicList = (
    <div className="list-content">
      <ul className="list-box">{selectMusic}</ul>
    </div>
  );

  return (
    <animated.div style={openAnimation}>
      <Button onClick={toggleHandler}>
        <IconContext.Provider value={{ size: '1em', color: '#27AE60' }}>
          <AiOutlineMenu />
        </IconContext.Provider>
      </Button>
      {isClicked && musicList}
    </animated.div>
  );
}

export default MusicList;
