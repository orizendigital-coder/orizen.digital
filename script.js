document.addEventListener('DOMContentLoaded', () => {
    // Número de WhatsApp de Orizen (código de país + área + número, sin espacios ni "+")
    const WHATSAPP_NUMBER = '5492617634342';

    // --- Animaciones al hacer scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));

    // --- Formulario: arma el mensaje y abre WhatsApp ---
    const form = document.getElementById('diagnostico-form');
    const errorBox = document.getElementById('form-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorBox.textContent = '';

        const required = ['nombre', 'negocio', 'rubro', 'tarea'];
        let firstInvalid = null;

        required.forEach(name => {
            const field = form.elements[name];
            const empty = !field.value.trim();
            field.classList.toggle('invalid', empty);
            if (empty && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
            errorBox.textContent = 'Completá todos los campos para reservar tu diagnóstico.';
            firstInvalid.focus();
            return;
        }

        const data = new FormData(form);
        const mensaje =
            `¡Hola! Quiero reservar mi diagnóstico IA gratis 👋\n\n` +
            `*Nombre:* ${data.get('nombre').trim()}\n` +
            `*Negocio:* ${data.get('negocio').trim()}\n` +
            `*Rubro:* ${data.get('rubro')}\n` +
            `*Lo que más tiempo me come:* ${data.get('tarea').trim()}\n` +
            `*Modalidad:* ${data.get('modalidad')}`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
    });

    // Saca el borde rojo apenas el usuario empieza a escribir
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => field.classList.remove('invalid'));
    });
});
