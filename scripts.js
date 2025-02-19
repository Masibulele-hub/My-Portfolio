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
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
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
  })
    .then(response => {
      if (response.ok) {
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
          contactForm.reset();
        }, 5000); // 5 seconds
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Oops! Something went wrong. Please try again.');
    });
});

// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVrn5Fz3mgFB800ld0eby0IwfRoB56KJg",
  authDomain: "testamonial--approvals.firebaseapp.com",
  databaseURL: "https://testamonial--approvals-default-rtdb.firebaseio.com",
  projectId: "testamonial--approvals",
  storageBucket: "testamonial--approvals.appspot.com", 
  messagingSenderId: "264103725439",
  appId: "1:264103725439:web:763adfb135f35241cf324a",
  measurementId: "G-B2K8J6CGFL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// Testimonial Form Submission
const testimonialForm = document.getElementById('testimonial-form');
const testimonialsGrid = document.getElementById('testimonials-grid');

testimonialForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get testimonial text from form input
  const testimonialText = new FormData(testimonialForm).get('testimonial');

  try {
    // Add testimonial to Firestore for approval
    await addDoc(collection(db, "pendingTestimonials"), { 
      text: testimonialText, 
      status: "pending" 
    });
    alert('Testimonial submitted for approval.');
    testimonialForm.reset();
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    alert('Oops! Something went wrong. Please try again.');
  }
});
// Fetch and Display Approved Testimonials
async function loadApprovedTestimonials() {
  try {
    const querySnapshot = await getDocs(collection(db, "approvedTestimonials"));
    querySnapshot.forEach((doc) => {
      const testimonial = doc.data();
      addTestimonial(testimonial.text, testimonial.author);
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }
}
// Function to Add Approved Testimonials to the Portfolio
function addTestimonial(text, author) {
  const testimonialElement = document.createElement('div');
  testimonialElement.className = 'testimonial';
  testimonialElement.innerHTML = `<p>${text}</p><p><strong>- ${author}</strong></p>`;
  testimonialsGrid.appendChild(testimonialElement);
}
// Load approved testimonials on page load
document.addEventListener('DOMContentLoaded', loadApprovedTestimonials);