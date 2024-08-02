document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('.menu');
    const menuContainer = document.getElementById('menu-container');

    // Cargar el contenido de menu.html
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data;

            const fullscreenMenu = document.querySelector('.fullscreen-menu');

            menu.addEventListener('click', function() {
                menu.classList.toggle('open');
                fullscreenMenu.classList.toggle('open');
            });

            // Cerrar el menú cuando se presiona la tecla ESC
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && fullscreenMenu.classList.contains('open')) {
                    menu.classList.remove('open');
                    fullscreenMenu.classList.remove('open');
                }
            });
        })
        .catch(error => console.error('Error loading menu:', error));

    // Slider logic
    const sliderContainer = document.querySelector('.slider');
    const imagePaths = [
        'slider/LexieBand.jpg',
        'slider/SergioTrumpet.jpg',
        'slider/elefantsThailand.jpeg',
        // Añade más imágenes según sea necesario
    ];

    imagePaths.forEach((path, index) => {
        const img = document.createElement('img');
        img.src = path;
        img.alt = `Slider image ${index + 1}`;
        if (index === 0) {
            img.classList.add('active');
        }
        sliderContainer.appendChild(img);
    });

    let currentIndex = 0;
    const images = document.querySelectorAll('.slider img');
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 5000); // Cambia la imagen cada 5 segundos

    // Gallery filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad de consentimiento de cookies
    const consentBanner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
        consentBanner.style.display = 'block';
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        consentBanner.style.display = 'none';
    });
});
