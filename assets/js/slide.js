async function carroussel() {
    const images = [
        "assets/img/technologies/html.png",
        "assets/img/technologies/css.png",
        "assets/img/technologies/javascript.png",
        "assets/img/technologies/express-js.png",
        "assets/img/technologies/python.png",
        "assets/img/technologies/node-js.png",
        "assets/img/technologies/firebase.webp",
        "assets/img/technologies/vercel.svg",
        "assets/img/technologies/railway.svg",
        "assets/img/technologies/cloudflare.webp",
        "assets/img/technologies/mongodb.svg",
        "assets/img/technologies/git.png"
    ]

    const slideTrack = document.querySelector(".slide-track");
    
    // Create original slides
    images.forEach(createSlide);
    // Duplicate slides for infinite loop
    images.forEach(createSlide);

    function createSlide(imagePath) {
        const slide = document.createElement("div");
        slide.className = "slide";
        
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = "Technology Icon";
        img.className = "img-thumbnail";
        
        slide.appendChild(img);
        slideTrack.appendChild(slide);
    }
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', carroussel);