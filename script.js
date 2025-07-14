document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        
        formMessage.className = 'form-message';
        formMessage.style.display = 'block';
        formMessage.innerHTML = '<i class="fas fa-clock"></i> Processing your message...';
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for contacting Ryntrix! Your message has been submitted successfully.';
    }
});
