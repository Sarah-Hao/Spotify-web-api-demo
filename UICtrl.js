// UI Controller
const UICtrl = (lightTheme = true) => {

    const dom = {
        root: document.documentElement,
        themeIcon: document.querySelector('#themeIcon'),
        genre: document.querySelector('#genre'),
        playlist: document.querySelector('#playlist'),
        search: document.querySelector('#search'),
        tracks: document.querySelector('#tracks'),
        trackDetail: document.querySelector('#trackDetail'),
    }

    function createTrackDetail(title, imgURL, artist) {
        const imgHTML = '<img src=' + imgURL + ' alt=' + title + '>';
        const titleHTML = '<label for="Title">Song title: ' + title + '</label>';
        const artistHTML = '<label  for="Artist">Artist: ' + artist + '</label>';
        dom.trackDetail.innerHTML = null;
        dom.trackDetail.insertAdjacentHTML('beforeend', imgHTML + titleHTML + artistHTML);
    }

    return {
        inputField() {
            return dom;
        },

        createGenre(text, value) {
            const html = '<option value=' + value + '>' + text + '</option>';
            dom.genre.insertAdjacentHTML('beforeend', html);
        },

        createPlaylist(text, value) {
            const html = '<option value=' + value + '>' + text + '</option>';
            dom.playlist.insertAdjacentHTML('beforeend', html);
        },

        createTrack(title, imgURL, artist) {
            const track = document.createElement('span');
            track.classList.add('track');
            track.innerText = title;
            track.addEventListener('click', () => createTrackDetail(title, imgURL, artist));
            dom.tracks.append(track);
        },
        changeTheme(light) {
            if (light) {
                dom.root.style.setProperty('--card', 'rgb(255, 255, 255, 0.3)');
                dom.root.style.setProperty('--background', 'linear-gradient(20deg, rgba(220, 207, 255, 1) 0%, rgba(254, 176, 254, 1) 21%, rgba(155, 206, 255, 1) 39%, rgba(255, 155, 248, 1) 71%, rgba(213, 165, 255, 1) 100%, rgba(255, 183, 251, 1) 100%, rgba(89, 109, 255, 1) 100%)');
                dom.root.style.setProperty('--text', 'rgb(51, 51, 51)');
                dom.root.style.setProperty('--text-light', 'rgb(255, 255, 255)');
                dom.root.style.setProperty('--primary', 'rgb(201, 126, 245)');
                dom.root.style.setProperty('--primary2', 'rgb(116, 116, 116)');
                dom.root.style.setProperty('--secondary1', 'rgb(61, 50, 78)');
                dom.root.style.setProperty('--secondary2', 'rgb(77, 77, 77)');
                dom.root.style.setProperty('--inactive', 'rgb(189, 170, 219)');
            }
            else {
                dom.root.style.setProperty('--card', 'rgba(40, 26, 46, 0.6)');
                dom.root.style.setProperty('--background', 'linear-gradient(20deg, rgba(220, 207, 255, 1) 0%, rgba(254, 176, 254, 1) 21%, rgba(155, 206, 255, 1) 39%, rgba(255, 155, 248, 1) 71%, rgba(213, 165, 255, 1) 100%, rgba(255, 183, 251, 1) 100%, rgba(89, 109, 255, 1) 100%)');
                dom.root.style.setProperty('--text', 'rgb(230, 230, 230)');
                dom.root.style.setProperty('--text-light', 'rgb(255, 255, 255)');
                dom.root.style.setProperty('--primary', 'rgb(201, 126, 245)');
                dom.root.style.setProperty('--primary2', 'rgb(116, 116, 116)');
                dom.root.style.setProperty('--secondary1', 'rgb(217, 197, 248)');
                dom.root.style.setProperty('--secondary2', 'rgb(77, 77, 77)');
                dom.root.style.setProperty('--inactive', 'rgb(179, 156, 216)');
            }
        },
    }
}
