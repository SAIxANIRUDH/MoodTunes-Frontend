import React from 'react'

import './Moodsongs.css';

const MoodSongs = ({ songs =[] }) => {

    
  return (
    <div className='mood-songs'>
        <h2>Recommended songs</h2>

        {songs.map((song, index) => (
            <div className='song-item' key={index}>
                <div className='title'>
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                </div>
                <div className='play-pause-button'>
                  <audio src={song.audio} controls />
                   
                </div>

    </div>
  ))}
    </div>
  )
}
export default MoodSongs 

  

