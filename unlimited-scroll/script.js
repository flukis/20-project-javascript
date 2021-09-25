const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Helper for assigning attr
function setAttrs(el, attr) {
    for (const key in attr) {
        el.setAttribute(key, attr[key])
    }
}

// Image loading animation variable
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let initialLoad = true;

// Display photos from API
function displayPhotos(arr) {
    totalImages = arr.length
    arr.forEach((photo) => {
        // Create a element - Parent
        const item = document.createElement('a');
        setAttrs(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create image for photos - Child 1
        const img = document.createElement('img');
        setAttrs(img, {
            src: photo.urls.small,
            alt: photo.alt_descriptions,
            title: photo.alt_descriptions
        })

        // Event listener for loader
        img.addEventListener('load', () => {
            imagesLoaded += 1;
            if (imagesLoaded === totalImages) {
                ready= true;
                imagesLoaded = 0;
                loader.hidden = true;
            }
        })

        // Put <img> to his parent 
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


/*/ Unsplash API
const count = 30;
const apiKey = 'PlnMcLlo9PiOGFoyM4f9FFPjFwEp-jBn0bHv3I1Gc6s';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
*/
// Get photos from unsplash
async function getPhotos() {
    try {
        //const res = await fetch(apiUrl);
        //const data = await res.json();
        const Photos = localUnsplash;
        displayPhotos(Photos);
    } catch (error) {
       // Catch Error
    }
}

// Add event listener
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        console.log(document.body.offsetHeight - 1000)
        ready=false;
        getPhotos();
    }
})

// Onload
getPhotos();