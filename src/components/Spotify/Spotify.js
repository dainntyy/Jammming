const clientId = '57ae3e48b1914303b760ea39b5e3b097';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Extract access token from URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the access token after expiration
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20playlist-modify-private&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  // Method to search Spotify for tracks
  async search(term) {
    const accessToken = this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  // Method to save a user's playlist
  async savePlaylist(playlistName, playlistTracks) {
  if (!playlistName || !playlistTracks.length) {
    console.log('Playlist name is empty or no tracks to save.'); // Debug log
    return; 
  }

  const accessToken = this.getAccessToken();
  console.log('Access Token:', accessToken); // Debug log
  if (!accessToken) {
    console.error('Access token is not available.'); // Debug log
    return;
  }

  const userIdResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!userIdResponse.ok) {
    console.error('Failed to get user ID', userIdResponse.status, await userIdResponse.text());
    return;
  }

  const userData = await userIdResponse.json();
  console.log('User Data:', userData); // Debug log
  const userId = userData.id;

  // Create a new playlist
  const newPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: playlistName,
      description: 'Created with Jammming',
      public: false
    })
  });

  if (!newPlaylistResponse.ok) {
    console.error('Failed to create playlist', newPlaylistResponse.status, await newPlaylistResponse.text());
    return;
  }

  const newPlaylistData = await newPlaylistResponse.json();
  const playlistId = newPlaylistData.id;

  // Add tracks to the new playlist
  const trackURIs = playlistTracks.map(track => track.uri);
  console.log('Track URIs:', trackURIs); // Debug log

  const addTracksResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris: trackURIs 
    })
  });

  if (!addTracksResponse.ok) {
    console.error('Failed to add tracks to playlist', addTracksResponse.status, await addTracksResponse.text());
    return;
  }

  console.log('Playlist saved successfully!');
}

};

export default Spotify;
