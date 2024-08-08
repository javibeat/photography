document.addEventListener("DOMContentLoaded", () => {
    let lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";

    let gallery = document.querySelector(".gallery");
    for (let i = gallery.children.length; i >= 0; i--) {
        gallery.appendChild(gallery.children[Math.random() * i | 0]);
    }

    let galleryItems = document.querySelectorAll(".gallery-item"),
        lightboxContent = document.querySelector(".lightbox-content"),
        lightboxTitle = document.createElement("div");

    lightboxTitle.classList.add("lightbox-title");
    lightbox.appendChild(lightboxTitle);

    let close = document.querySelector(".close"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        submenuLinks = document.querySelectorAll(".submenu-link");

    let currentIndex = -1,
        currentTag = "all";

    const updateLightboxImages = () => [...galleryItems].filter(item => item.style.display !== "none");

    const showImageInLightbox = (item) => {
        lightboxContent.src = item.src;
        lightboxTitle.textContent = item.getAttribute("data-title");
        lightbox.style.display = "block";
    };

    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            let filteredItems = updateLightboxImages();
            currentIndex = filteredItems.indexOf(item);
            showImageInLightbox(item);
        });
    });

    close.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    });

    prev.addEventListener("click", () => {
        let filteredItems = updateLightboxImages();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
        showImageInLightbox(filteredItems[currentIndex]);
    });

    next.addEventListener("click", () => {
        let filteredItems = updateLightboxImages();
        currentIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
        showImageInLightbox(filteredItems[currentIndex]);
    });

    document.addEventListener("keydown", (e) => {
        let filteredItems = updateLightboxImages();
        if (lightbox.style.display === "block") {
            if (e.key === "ArrowLeft") {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
                showImageInLightbox(filteredItems[currentIndex]);
            } else if (e.key === "ArrowRight") {
                currentIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
                showImageInLightbox(filteredItems[currentIndex]);
            }
        }
    });

    submenuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            currentTag = e.currentTarget.getAttribute("data-filter");
            galleryItems.forEach(item => {
                if (currentTag === "all") {
                    item.style.display = "block";
                } else {
                    item.style.display = item.getAttribute("data-tag") === currentTag ? "block" : "none";
                }
            });
        });
    });
});
