import React from 'react';
import TrackList from '../TrackList/Tracklist';
import './Playlist.css'

function Palylist({playlistname, playlisttracks, onChange, onRemove}) {
    return (
        <div className='playlist'>
            <input
                type='text'
                value={playlistname}
                onChange={onChange}
                placeholder="Enter Playlist Name"
                className='playlist-input'
            />
            <TrackList
                tracks={playlisttracks}
                onRemove={onRemove}
                isRemoval={true}
            />
            
            
        </div>
    )
}
export default Palylist;