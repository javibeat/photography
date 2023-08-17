const gridItems = document.querySelectorAll('.grid-item');
const overlay = document.querySelector('.overlay');
const overlayContent = document.querySelector('.overlay-content');
const overlayImage = document.querySelector('.overlay-image');
const overlayDescription = document.querySelector('.image-description'); // Agregamos esta línea
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const closeBtn = document.querySelector('.close-btn');
const gridContainer = document.querySelector('.grid-container');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function openOverlay(index) {
    overlay.style.display = 'flex';
    overlayContent.style.display = 'flex';
    overlayImage.src = gridItems[index].querySelector('img').src;
    overlayDescription.textContent = gridItems[index].querySelector('img').alt;
    currentIndex = index;
}

function closeOverlay() {
    overlay.style.display = 'none';
    overlayContent.style.display = 'none';
}

function navigate(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = gridItems.length - 1;
    } else if (currentIndex >= gridItems.length) {
        currentIndex = 0;
    }
    overlayImage.src = gridItems[currentIndex].querySelector('img').src;
    overlayDescription.textContent = gridItems[currentIndex].querySelector('img').alt;
}

gridItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openOverlay(index);
    });
});

closeBtn.addEventListener('click', () => {
    closeOverlay();
});

prevBtn.addEventListener('click', () => {
    navigate(-1);
});

nextBtn.addEventListener('click', () => {
    navigate(1);
});

document.addEventListener('keydown', (event) => {
    if (overlay.style.display === 'flex') {
        if (event.key === 'ArrowLeft') {
            navigate(-1);
        } else if (event.key === 'ArrowRight') {
            navigate(1);
        } else if (event.key === 'Escape') {
            closeOverlay();
        }
    }
});

// Mezclar el orden de los elementos al cargar la página
const shuffledItems = Array.from(gridItems).sort(() => Math.random() - 0.5);

shuffledItems.forEach(item => {
    gridContainer.appendChild(item);
});

// Touch events
overlayImage.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

overlayImage.addEventListener('touchmove', (event) => {
    const touchCurrentX = event.touches[0].clientX;
    const touchDiff = touchCurrentX - touchStartX;

    // Verificar la orientación del dispositivo
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (Math.abs(touchDiff) > 10 && (!isPortrait || Math.abs(touchDiff) > 50)) {
        event.preventDefault(); // Evitar el desplazamiento predeterminado
    }
});

overlayImage.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX;
    
    // Verificar la orientación del dispositivo
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (!isPortrait) {
        if (touchDiff > 50) {
            navigate(-1);
        } else if (touchDiff < -50) {
            navigate(1);
        }
    }
});

// ...
