document.addEventListener("DOMContentLoaded", () => {
  // Reordenar las imágenes aleatoriamente
  const gallery = document.querySelector('.gallery');
  for (let i = gallery.children.length; i >= 0; i--) {
    gallery.appendChild(gallery.children[Math.random() * i | 0]);
  }

  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxContent = document.querySelector(".lightbox-content");
  const close = document.querySelector(".close");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  
  // Selección de los iconos como filtros
  const filterIcons = document.querySelectorAll(".filter-icon");
  
  let currentImageIndex = -1;
  let currentTag = "all";
  
  const updateLightboxImages = () => {
    return [...galleryItems].filter(item => item.style.display !== "none");
  };
  
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      const filteredItems = updateLightboxImages();
      currentImageIndex = filteredItems.indexOf(item);
      lightboxContent.src = e.target.src;
      lightbox.style.display = "block";
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
    const filteredItems = updateLightboxImages();
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      currentImageIndex = filteredItems.length - 1;
    }
    lightboxContent.src = filteredItems[currentImageIndex].src;
  });
  
  next.addEventListener("click", () => {
    const filteredItems = updateLightboxImages();
    if (currentImageIndex < filteredItems.length - 1) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0;
    }
    lightboxContent.src = filteredItems[currentImageIndex].src;
  });
  
  document.addEventListener("keydown", (e) => {
    const filteredItems = updateLightboxImages();
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft") {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : filteredItems.length - 1;
        lightboxContent.src = filteredItems[currentImageIndex].src;
      } else if (e.key === "ArrowRight") {
        currentImageIndex = (currentImageIndex < filteredItems.length - 1) ? currentImageIndex + 1 : 0;
        lightboxContent.src = filteredItems[currentImageIndex].src;
      }
    }
  });
  
  filterIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      currentTag = icon.querySelector("img").getAttribute("data-filter");
  
      galleryItems.forEach((item) => {
        if (currentTag === "all") {
          item.style.display = "block";
        } else {
          if (item.getAttribute("data-tag") === currentTag) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
});
