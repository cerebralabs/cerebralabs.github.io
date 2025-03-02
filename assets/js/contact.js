document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#contact-form');

  if (form) {
    // Reset form messages on page load
    form.querySelector('.loading').style.display = 'none';
    form.querySelector('.error-message').style.display = 'none';
    form.querySelector('.sent-message').style.display = 'none';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');

      // Reset messages
      loading.style.display = 'block';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';

      // Get form data
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      
      // Set form options
      object._template = 'table';
      object._captcha = 'false';
      
      try {
        const response = await fetch('https://formsubmit.co/ajax/89bb93777b85d4c66fdaeb950b687673', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(object)
        });

        const data = await response.json();

        if (data.success) {
          loading.style.display = 'none';
          sentMessage.style.display = 'block';
          form.reset();
        } else {
          loading.style.display = 'none';
          errorMessage.style.display = 'block';
          errorMessage.textContent = 'Something went wrong. Please try again.';
        }
      } catch (error) {
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Network error. Please try again.';
      }
    });
  }
});