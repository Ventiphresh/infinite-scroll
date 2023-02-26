// API URL

        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('alt', photo.title);

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


const count = 30;
const apiKey = '6ukBP7uSzjkxfjs2fYRssbG76vfXPguqS-FC6Ae8obg';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;

// Check if images are loaded function
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Helper function to set attributes
function setAttributes(element, attributes) {

    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }

}

// Create Elements for links and photos, add to dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run runction for each
    photosArray.forEach((photo) => {
        // Creat anchor tag to link Unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create img
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when photo loads
        img.addEventListener('load', imageLoaded);
        // Put img inside anchor and then inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}
// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error
    }
}
// scrolling near bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();