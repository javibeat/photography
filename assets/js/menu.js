document.addEventListener("DOMContentLoaded", function() {
    fetch("menu.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("menu-container").innerHTML = data;

        // JavaScript para manejar el menú después de insertarlo
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navList = document.querySelector('.nav-list');
        const body = document.body;

        // Función para abrir/cerrar el menú
        function toggleMenu() {
            navList.classList.toggle('active');  // Mostrar/ocultar menú
            mobileMenuToggle.classList.toggle('open'); // Cambiar ícono de hamburguesa a "X"
            body.classList.toggle('menu-open');  // Deshabilitar el scroll cuando el menú esté abierto
        }

        // Evento para abrir/cerrar el menú al hacer clic en el menú hamburger
        mobileMenuToggle.addEventListener('click', toggleMenu);

        // Evento para cerrar el menú al presionar la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navList.classList.contains('active')) {
                toggleMenu(); // Cerrar el menú si está abierto y se presiona ESC
            }
        });

        // Asignar clase 'active' al elemento actual del menú
        const currentLocation = window.location.href;  // URL actual
        const menuLinks = document.querySelectorAll('.nav-list a');

        menuLinks.forEach(link => {
            if (link.href === currentLocation) {
                link.classList.add('active');  // Añadir clase 'active' si coincide con la URL
            }
        });
      });
  });
