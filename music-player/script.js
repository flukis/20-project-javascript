const audioEl = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');
const progress = document.getElementById('progress')
const progressEl = document.getElementById('progress-container')

// Array of music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Mundo'
    },
    {
        name: 'jacinto-2',
        displayName: 'Triple Kill',
        artist: 'Lucian'
    },
    {
        name: 'jacinto-3',
        displayName: 'Front Row',
        artist: 'Ahri'
    }
];

let isPlaying = false;

// Current Song
let songIndex = 0;

// Play Next
nextBtn.addEventListener('click', () => {
    if (songIndex < songs.length - 1) songIndex++;
    else songIndex = 0;
    loadSong(songs[songIndex])
    if(isPlaying) playSong();
});
// Play Prev
prevBtn.addEventListener('click', () => {
    if (songIndex > 0) songIndex--;
    else songIndex = songs.length - 1;
    loadSong(songs[songIndex])
    if(isPlaying) playSong();
});

// Play music
function playSong() {
    if(playBtn.classList.contains('fa-play')) playBtn.classList.replace('fa-play', 'fa-pause');
    isPlaying = true;
    playBtn.setAttribute('title', 'pause')
    audioEl.play();
}
// Pause
function pauseSong() {
    if(playBtn.classList.contains('fa-pause')) playBtn.classList.replace('fa-pause', 'fa-play');
    isPlaying = false;
    playBtn.setAttribute('title', 'play')
    audioEl.pause();
}
// Play or Pause
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audioEl.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

// Hour Format
const formatToHour = (t) => {
    let m = Number(t/60).toFixed();
    let s = Number(t%60).toFixed();
    if (isNaN(m)) {
        m = 0;
        s = 0;
    }
    if (s < 10) s = `0${s}`
    if (m < 10) m = `0${m}`
    return `${m}:${s}`;
}

// On load
loadSong(songs[songIndex]);
audioEl.addEventListener('timeupdate', (e) => {
    if (isPlaying) {
        const {duration, currentTime} = e.target;
        // Update progress bar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        durationEl.textContent = formatToHour(duration);
        currentTimeEl.textContent = formatToHour(currentTime);
    }
})

// Function Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = audioEl;
    audioEl.currentTime = (clickX / width) * duration;
}

progressEl.addEventListener('click', setProgressBar);
audioEl.addEventListener('ended', () => {
    if (songIndex < songs.length - 1) songIndex++;
    else songIndex = 0;
    loadSong(songs[songIndex])
    if(isPlaying) playSong();
})