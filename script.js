// Enhanced Contact form handling with AJAX
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = submitBtn.querySelector('span');
    const submitIcon = submitBtn.querySelector('i');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Show loading state
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
            submitIcon.className = 'fas fa-spinner fa-spin';
            formMessage.style.display = 'none';

            // Create FormData object
            const formData = new FormData(form);

            // Submit form via AJAX
            fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'cors',
                credentials: 'include'
            })
            .then(response => {
                if (response.ok || response.status === 200) {
                    // Success message
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for contacting Ryntrix! Your message has been submitted successfully. We will get back to you soon.';
                    
                    // Reset form
                    form.reset();
                    
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                // Error message
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                formMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error submitting the form. Please try again later or contact us directly.';
                console.error('Form submission error:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitIcon.className = 'fas fa-paper-plane';
            });
        });

        // Real-time validation
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#28a745';
                }
            });

            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#e5e7eb';
                }
            });
        });

        // Email validation
        const emailField = form.querySelector('input[name="Email"]');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else if (this.value) {
                    this.style.borderColor = '#28a745';
                }
            });
        }
    }
});
