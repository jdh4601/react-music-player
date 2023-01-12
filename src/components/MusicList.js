import React from 'react';
import useSound from 'use-sound';
import musicUrl1 from '../assets/ES_Ewo Ye - Amaroo.mp3';
import musicUrl2 from '../assets/ES_Fishbowl - Collin Lim.mp3';
import musicUrl3 from '../assets/ES_Ordinary Love - Vicki Vox.mp3';
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

function MusicList() {
  const [play] = useSound(PLAY_LIST[0].musicUrl1);

  const selectMusic = PLAY_LIST.map(music => (
    <li
      key={music.id}
      className="music-list"
      onClick={() => play({ id: music.id })}
    >
      {music.title} - {music.artist}
    </li>
  ));

  return (
    <div className="list-content">
      <ul className="list-box">{selectMusic}</ul>
    </div>
  );
}

export default MusicList;
