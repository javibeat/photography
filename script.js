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
    const filters = document.querySelectorAll(".filter");
    
    let currentImageIndex = -1; // para llevar el control de la imagen actual
    let currentTag = "all"; // para llevar el control de la categoría actual
    
    const updateLightboxImages = () => {
      return [...galleryItems].filter(item => item.style.display !== "none");
    };
    
    // Abrir lightbox
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        const filteredItems = updateLightboxImages();
        currentImageIndex = filteredItems.indexOf(item);
        lightboxContent.src = e.target.src;
        lightbox.style.display = "block";
      });
    });
    
    // Cerrar lightbox
    close.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
    
    // Cerrar con tecla Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    });
    
    // Navegar entre fotos con botones
    prev.addEventListener("click", () => {
      const filteredItems = updateLightboxImages();
      if (currentImageIndex > 0) {
        currentImageIndex--;
        lightboxContent.src = filteredItems[currentImageIndex].src;
      }
    });
    
    next.addEventListener("click", () => {
      const filteredItems = updateLightboxImages();
      if (currentImageIndex < filteredItems.length - 1) {
        currentImageIndex++;
        lightboxContent.src = filteredItems[currentImageIndex].src;
      }
    });
    
    // Navegar con teclas de dirección
    document.addEventListener("keydown", (e) => {
      const filteredItems = updateLightboxImages();
      if (lightbox.style.display === "block") {
        if (e.key === "ArrowLeft" && currentImageIndex > 0) {
          currentImageIndex--;
          lightboxContent.src = filteredItems[currentImageIndex].src;
        } else if (e.key === "ArrowRight" && currentImageIndex < filteredItems.length - 1) {
          currentImageIndex++;
          lightboxContent.src = filteredItems[currentImageIndex].src;
        }
      }
    });
    
    // Filtrar imágenes según categoría seleccionada en el submenú
    filters.forEach((filter) => {
      filter.addEventListener("click", (e) => {
        e.preventDefault();
        currentTag = e.target.getAttribute("data-filter");
    
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
  