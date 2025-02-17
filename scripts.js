// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(contactForm.action, {
    method: 'POST',
    body: new FormData(contactForm),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
        contactForm.reset(); // Reset the form
      }, 5000); // 5 seconds
    }
  }).catch(error => {
    console.error('Error:', error);
  });
});

// Testimonial Form Submission
const testimonialForm = document.getElementById('testimonial-form');
const testimonialsGrid = document.getElementById('testimonials-grid');

testimonialForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const testimonialText = new FormData(testimonialForm).get('testimonial');

  // Simulate sending testimonial for approval
  fetch('https://formspree.io/f/masi.sibulele@gmail.com', {
    method: 'POST',
    body: JSON.stringify({ testimonial: testimonialText }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      alert('Testimonial submitted for approval.');
      testimonialForm.reset();

      // Simulate approval and auto-post after 15 seconds
      setTimeout(() => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial';
        testimonialElement.innerHTML = `<p>${testimonialText}</p>`;
        testimonialsGrid.appendChild(testimonialElement);
      }, 15000); // 15 seconds
    }
  }).catch(error => {
    console.error('Error:', error);
  });
});