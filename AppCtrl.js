// APP Controller
const AppCtrl = async (ApiCtrl, UICtrl) => {
    try {
        let token = await ApiCtrl.getToken(); // obtain access token
        let genres = await ApiCtrl.getGenres(token);
        let selectedGenre = genres[0].id; // genre id
        let playlists = await ApiCtrl.getPlaylistByGenres(token, selectedGenre);
        let selectedPlaylist = playlists[0].tracks.href; // playlist endpoint
        let tracks;
        const DOM = UICtrl.inputField(); // exposed DOM elements
        let isLightTheme = true;

        // Populate Genre dropdown
        genres.forEach(genre => { UICtrl.createGenre(genre.name, genre.id) });

        // Populate Playlist dropdown
        playlists.forEach(playlist => UICtrl.createPlaylist(playlist.name, playlist.tracks.href));

        // Re-populate Playlist dropdown whenever genre changes
        DOM.genre.addEventListener('change', async () => {
            DOM.playlist.innerHTML = null;
            selectedGenre = DOM.genre.value;
            playlists = await ApiCtrl.getPlaylistByGenres(token, selectedGenre);
            playlists.forEach(playlist => UICtrl.createPlaylist(playlist.name, playlist.tracks.href));
        });

        // Clear and display tracks when search button is clicked
        DOM.search.addEventListener('click', async () => {
            DOM.tracks.innerHTML = null;
            selectedPlaylist = DOM.playlist.value;
            tracks = await ApiCtrl.getTracks(token, selectedPlaylist);
            tracks.forEach(track => UICtrl.createTrack(track.track.name, track.track.album.images[0].url, track.track.artists[0].name));
        });

        // Change theme color when theme icon is clicked
        DOM.themeIcon.addEventListener('click', () => {
            isLightTheme = !isLightTheme;
            UICtrl.changeTheme(isLightTheme);
        });

    } catch (e) {
        alert(e);
        console.log(e);
    }
}
