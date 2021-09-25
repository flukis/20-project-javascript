// Elements
const videoEl = document.getElementById('video');
const btn = document.getElementById('button');


// Prompt  to select media stream, pass video element and play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoEl.srcObject = mediaStream;
        videoEl.onloadedmetadata = () => {
            videoEl.play()
        }
    } catch (error) {
        //  Catch Error
        console.log('Error: ', error);
    }
}

// Button event
btn.addEventListener('click', async () => {
    btn.disabled = true;
    await videoEl.requestPictureInPicture();
    btn.disabled = false;
})

// On load
selectMediaStream();