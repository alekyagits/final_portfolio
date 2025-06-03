// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Initialize the typed text effect
  initTypedText();
  
  // Add scroll event listener for navbar
  initNavbarScroll();
  
  // Add active class to the current navigation item based on scroll position
  initNavActiveState();

  // Initialize the contact form submission
  initContactForm();
});

// Navbar color change on scroll
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Initialize typed text effect
function initTypedText() {
  const options = {
    strings: [
      'Computer Science Graduate',
      'Software Developer',
      'Research Assistant',
      'Problem Solver'
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    loop: true
  };
  
  if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', options);
  }
}

// Add active class to navigation items based on scroll position
function initNavActiveState() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#' || targetId === '') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
      
      // Close mobile navbar when a link is clicked
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// Handle contact form submission
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      
      // Show a success message (in a real application, you would send this data to a server)
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset the form
      contactForm.reset();
    });
  }
}

// Project filter functionality (if implemented)
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');
  
  if (category === 'all') {
    projects.forEach(project => {
      project.style.display = 'block';
    });
  } else {
    projects.forEach(project => {
      if (project.classList.contains(category)) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
  }
}

// Preloader (if implemented)
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('preloader-hide');
  }
});

// Handle dark/light mode toggle (if implemented)
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  
  // Save the preference to localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference
(function checkTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
})();