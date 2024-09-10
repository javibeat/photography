const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;

// Función para mezclar un array usando el algoritmo de Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Función para reorganizar las imágenes en orden aleatorio
function randomizeGallery() {
  const galleryContainer = document.querySelector(".gallery-container");
  const itemsArray = Array.from(galleryContainer.children);
  const shuffledItems = shuffle(itemsArray);

  // Vaciar el contenedor y volver a añadir los elementos en orden aleatorio
  galleryContainer.innerHTML = "";
  shuffledItems.forEach((item) => galleryContainer.appendChild(item));
}

// Función para deshabilitar el scroll del body
function disableScroll() {
  document.body.style.overflow = "hidden";
}

// Función para habilitar el scroll del body
function enableScroll() {
  document.body.style.overflow = "";
}

// Inicializar lightbox y orden aleatorio al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Ordenar las imágenes aleatoriamente al cargar la página
  randomizeGallery();

  // Función para abrir el lightbox cuando se hace clic en una imagen
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      lightbox.style.display = "flex";
      lightboxImg.src = e.target.src;
      currentIndex = index;
      disableScroll();  // Deshabilitar el scroll al abrir el lightbox
    });
  });

  // Función para mostrar la imagen anterior
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
  }

  // Función para mostrar la imagen siguiente
  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
  }

  // Añadir eventos a los botones de navegación
  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);

  // Navegar por las imágenes con las teclas de flecha
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "Escape") {
        lightbox.style.display = "none";
        enableScroll();  // Habilitar el scroll al cerrar el lightbox
      }
    }
  });

  // Cerrar el lightbox al hacer clic en el botón de cerrar
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    enableScroll();  // Habilitar el scroll al cerrar el lightbox
  });

  // Cerrar el lightbox al hacer clic fuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      enableScroll();  // Habilitar el scroll al cerrar el lightbox
    }
  });
});
