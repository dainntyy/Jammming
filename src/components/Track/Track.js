import React from 'react';
import './Track.css';

function Track({track, onAdd, onRemove, isRemoval}) {
    const addTrack = () => {
        onAdd(track);
    }

    const removeTrack = () => {
        onRemove(track);
    }

    return (
        <div className='track-container'>
            <div>
                <h3>{track.name}</h3>
                <p className='artist'>{track.artist} | {track.album} </p>
            </div>
            
            {isRemoval 
                ? <button className="Track-action" onClick={removeTrack}>-</button>
                : <button className="Track-action" onClick={addTrack}>+</button>
            }
        </div>
    )
}
export default Track;