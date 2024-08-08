document.addEventListener("DOMContentLoaded", function() {
    let menu = document.querySelector(".menu"),
        menuContainer = document.getElementById("menu-container");

    fetch("menu.html")
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data;
            let fullscreenMenu = document.querySelector(".fullscreen-menu");

            menu.addEventListener("click", function() {
                menu.classList.toggle("open");
                fullscreenMenu.classList.toggle("open");
            });

            document.addEventListener("keydown", function(event) {
                if (event.key === "Escape" && fullscreenMenu.classList.contains("open")) {
                    menu.classList.remove("open");
                    fullscreenMenu.classList.remove("open");
                }
            });
        })
        .catch(error => console.error("Error loading menu:", error));

    let sliderContainer = document.querySelector(".slider");
    ["slider/LexieBand.jpg", "slider/SergioTrumpet.jpg", "slider/elefantsThailand.jpeg"].forEach((src, index) => {
        let img = document.createElement("img");
        img.src = src;
        img.alt = `Slider image ${index + 1}`;
        if (index === 0) {
            img.classList.add("active");
        }
        sliderContainer.appendChild(img);
    });

    let currentIndex = 0,
        images = document.querySelectorAll(".slider img");
    setInterval(() => {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
    }, 5000);

    let filterButtons = document.querySelectorAll(".filter-btn"),
        galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            let filter = button.getAttribute("data-filter");
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            galleryItems.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let consentBanner = document.getElementById("cookie-consent-banner"),
        acceptButton = document.getElementById("accept-cookies"),
        consent = localStorage.getItem("cookieConsent");

    if (!consent) {
        consentBanner.style.display = "block";
    }

    acceptButton.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        consentBanner.style.display = "none";
    });
});
