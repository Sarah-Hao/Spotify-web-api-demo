// API controller
const SpotifyApiCtrl = () => {
    // This method is equivalence to JS fetch, except it treats unsuccessful status as ERROR.
    // 
    // url      : the endpoint
    // request  : equivalence to the second argument in JS fetch
    // foo      : defines which part of the responce you want to return
    const MyFetch = (url, request, foo) => {
        return fetch(url, request).then(res => {
            if (res.ok) {
                return res.json().then(data => foo(data))
            } else {
                throw 'Fetch Error : Status ' + res.status + ' ' + res.statusText;
            }
        })
    }

    // client credentials
    const clientId = 'b3c4c6c45c5e47eb854152998ca29cae';
    const clientSecret = '6551cf23858043ac91971bc165bb35eb';

    // Private methods
    const _getToken = async () => {
        const url = 'https://accounts.spotify.com/api/token';
        const request =
        {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials'
        }
        const foo = data => data.access_token;
        return MyFetch(url, request, foo);
    };

    const _getGenres = async (token) => {
        const url = 'https://api.spotify.com/v1/browse/categories?locale=EN';
        const request =
        {
            method: 'GET',
            headers:
            {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },

        }
        const foo = data => data.categories.items;
        return MyFetch(url, request, foo);
    }

    const _getPlaylistByGenres = async (token, genres) => {
        const url = 'https://api.spotify.com/v1/browse/categories/' + genres + '/playlists?locale=EN&limit=10';
        const request =
        {
            method: 'GET',
            headers:
            {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },

        }
        const foo = data => data.playlists.items;
        return MyFetch(url, request, foo);
    }

    const _getTracks = async (token, tracksEndPoint) => {
        const url = tracksEndPoint + '?locale=EN&limit=10';
        const request =
        {
            method: 'GET',
            headers:
            {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },

        }
        const foo = data => data.items;
        return MyFetch(url, request, foo);
    }

    const _getTrack = async (token, trackEndPoint) => {
        const url = trackEndPoint;
        const request =
        {
            method: 'GET',
            headers:
            {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },

        }
        const foo = data => data;
        return MyFetch(url, request, foo);
    }

    // Expose private methods
    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenres(token, genres) {
            return _getPlaylistByGenres(token, genres);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    };
}