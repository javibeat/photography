jQuery(window).on('load', function () {
    "use strict";
    jQuery("#status").fadeOut(150); // will first fade out the loading animation
    jQuery("#preloader").delay(150).fadeOut(150); // will fade out the white DIV that covers the website.
});