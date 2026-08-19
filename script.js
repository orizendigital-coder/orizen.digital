document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el Intersection Observer para las animaciones al scrollear
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // El elemento aparece cuando el 15% es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar la clase 'visible' para disparar la animación de CSS
                entry.target.classList.add('visible');
                // Dejar de observar el elemento una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar todos los elementos que tienen clases de animación
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Pequeño script para el scroll suave en navegadores antiguos (aunque css scroll-behavior lo cubre mayormente)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
