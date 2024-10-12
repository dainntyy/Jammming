import React, {useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResult from '../SearchResults/SearchResults';
import Track from '../Track/Track';
import TrackList from '../TrackList/Tracklist';

function App() {

  // Hard-coded array of track objects
  const [playlistName, setPlaylistName] = useState('');

  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3' },
  ]);

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    if (!playlistTracks.some(playlistTrack => playlistTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  }

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id));
  }

  const changeName = (e) => {
    setPlaylistName(e.target.value);
  }

  const addPlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    setPlaylistName('');
    setPlaylistTracks([]);
  }
  return (
    <>
      <header>Ja<span className="part-header">mmm</span>ing</header>
      <SearchBar />
      <div className="app-grid">
        <div className='track-list'>
          <h2>Results</h2>
          <TrackList tracks={searchResults}
            onAdd={addTrack}
            isRemoval={false}
          />
        </div>
        <div className='play-list'>
          <Playlist playlistname={playlistName}
            playlisttracks={playlistTracks}
            onRemove={removeTrack}
            onChange={changeName}
          />
          
          <div className="center-container">
                <button className="save-button"
                onClick={addPlaylist}>Save to Spotify</button>
            </div>
        </div>
        
      </div>
    </>
  );
}

export default App;
