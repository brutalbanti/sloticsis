document.addEventListener('DOMContentLoaded', function() {
    const overlays = document.querySelectorAll('.overlay');

    overlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const url = overlay.getAttribute('data-url');
            window.location.href = `game/#${encodeURIComponent(url)}`;
        });
    });
});
