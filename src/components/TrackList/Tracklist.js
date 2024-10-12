import React, { useState } from 'react';
import Track from '../Track/Track';
import './Tracklist.css';

function TrackList({tracks, onAdd, onRemove, isRemoval}) {
    return (
        <div className='tracklist'>
            {tracks && tracks.map(track => (
                <Track
                key={track.id} // unique key for each track
                track={track}
                    onAdd={onAdd}
                    onRemove={onRemove}
                isRemoval={isRemoval}
                />
            ))}
        </div>
    );
}
export default TrackList;