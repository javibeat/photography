document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('.menu');
    const menuContainer = document.getElementById('menu-container');

    // Load the content of menu.html
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data;

            const fullscreenMenu = document.querySelector('.fullscreen-menu');

            menu.addEventListener('click', function() {
                menu.classList.toggle('open');
                fullscreenMenu.classList.toggle('open');
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