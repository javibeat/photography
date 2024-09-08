document.addEventListener('DOMContentLoaded', function () {
    const imagesDesktop = [
        'img/slider1/elefantsThailand.jpg',
        'img/slider1/flower.jpg',
        'img/slider1/LexieBand.jpg',
        'img/slider1/SergioTrumpet.jpg'
    ];

    const imagesMobile = [
        'img/slider2/camino palmeras.jpg',
        'img/slider2/fire.jpg',
        'img/slider2/LexieBandV.jpg'
    ];

    let currentIndex = 0;
    let images;
    const slider = document.querySelector('.slider');
    
    // Detectar el ancho de la pantalla
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) {
        images = imagesMobile; // Cargar imágenes móviles
    } else {
        images = imagesDesktop; // Cargar imágenes de escritorio
    }

    // Crear elementos de imagen en el DOM
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slider-image');
        if (index === 0) img.classList.add('active'); // Primera imagen activa
        slider.appendChild(img);
    });

    const imageElements = document.querySelectorAll('.slider-image');

    function changeImage() {
        // Ocultar la imagen actual
        imageElements[currentIndex].classList.remove('active');
        
        // Calcular la próxima imagen a mostrar
        currentIndex = (currentIndex + 1) % imageElements.length;

        // Mostrar la siguiente imagen
        imageElements[currentIndex].classList.add('active');
    }

    setInterval(changeImage, 5000); // Cambia cada 5 segundos
});
