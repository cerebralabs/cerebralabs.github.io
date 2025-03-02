document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#contact-form');

  if (form) {
    // Reset form messages on page load
    form.querySelector('.loading').style.display = 'none';
    form.querySelector('.error-message').style.display = 'none';
    form.querySelector('.sent-message').style.display = 'none';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');

      // Disable submit button
      submitButton.disabled = true;

      // Reset messages
      loading.style.display = 'flex';
      loading.querySelector('.progress-bar').style.width = '0%';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';
  
      // Animate progress bar
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        if (progress <= 90) {
          loading.querySelector('.progress-bar').style.width = progress + '%';
          loading.querySelector('.progress-bar').setAttribute('aria-valuenow', progress);
        }
      }, 100);

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
          clearInterval(progressInterval);
          loading.querySelector('.progress-bar').style.width = '100%';
          loading.querySelector('.progress-bar').setAttribute('aria-valuenow', 100);
          setTimeout(() => {
            loading.style.display = 'none';
            sentMessage.style.display = 'block';
            form.reset();
            submitButton.disabled = false;
          }, 200);
        } else {
          clearInterval(progressInterval);
          loading.style.display = 'none';
          errorMessage.style.display = 'block';
          errorMessage.textContent = 'Something went wrong. Please try again.';
          submitButton.disabled = false;
        }
      } catch (error) {
        clearInterval(progressInterval);
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Network error. Please try again.';
        submitButton.disabled = false;
      }
    });
  }
});