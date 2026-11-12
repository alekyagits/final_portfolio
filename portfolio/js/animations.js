// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize element animations
  initElementAnimations();
  
  // Initialize scroll-triggered animations
  initScrollAnimations();
  
  // Initialize interaction-based animations
  initInteractionAnimations();
});

/**
 * Initialize element animations
 */
function initElementAnimations() {
  // Add floating animation to specific elements
  document.querySelectorAll('.float-element').forEach(element => {
    element.classList.add('float');
  });
  
  // Add pulse animation to call-to-action buttons
  document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseover', function() {
      this.classList.add('pulse');
    });
    
    button.addEventListener('mouseout', function() {
      this.classList.remove('pulse');
    });
  });
  
  // Animate social icons on hover
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-5px) rotate(10deg)';
    });
    
    icon.addEventListener('mouseout', function() {
      this.style.transform = 'translateY(0) rotate(0)';
    });
  });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.progress-bar');
  
  if (skillBars.length > 0) {
    const animateSkillBars = () => {
      skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (barPosition < screenPosition) {
          const width = bar.getAttribute('aria-valuenow') + '%';
          bar.style.width = width;
        }
      });
    };
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
  }
  
  // Animate timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timelineItems.length > 0) {
    const animateTimeline = () => {
      timelineItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (itemPosition < screenPosition) {
          setTimeout(() => {
            item.classList.add('fade-in');
          }, index * 200); // Staggered animation
        }
      });
    };
    
    // Initial check
    animateTimeline();
    
    // Check on scroll
    window.addEventListener('scroll', animateTimeline);
  }
}

/**
 * Initialize interaction-based animations
 */
function initInteractionAnimations() {
  // Project card hover effects
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('img').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('img').style.transform = 'scale(1)';
    });
  });
  
  // Tool item click effect
  document.querySelectorAll('.tool-item').forEach(tool => {
    tool.addEventListener('click', function() {
      this.classList.add('shake');
      setTimeout(() => {
        this.classList.remove('shake');
      }, 800);
    });
  });
  
  // Add glow effect to elements with the glow-on-hover class
  document.querySelectorAll('.glow-on-hover').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.classList.add('glow');
    });
    
    element.addEventListener('mouseleave', function() {
      this.classList.remove('glow');
    });
  });
  
  // Animate form inputs on focus
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('scale-in');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('scale-in');
    });
  });
}

/**
 * Parallax effect for the hero section background
 */
function parallaxEffect() {
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
  }
}

// Optional: Initialize the parallax effect
// parallaxEffect();

/**
 * Animate the main heading with a letter-by-letter effect
 */
function animateHeading() {
  const heading = document.querySelector('.hero-section h1');
  
  if (heading) {
    const text = heading.innerHTML;
    let html = '';
    
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        html += ' ';
      } else {
        html += '<span style="animation-delay: ' + (i * 0.1) + 's">' + text[i] + '</span>';
      }
    }
    
    heading.innerHTML = html;
    
    // Add the animation class to all spans
    heading.querySelectorAll('span').forEach(span => {
      span.classList.add('fade-in');
    });
  }
}

// Optional: Initialize the heading animation
// animateHeading();

/**
 * Number counter animation for statistics
 * @param {string} selector - The CSS selector for elements to animate
 * @param {number} duration - Animation duration in milliseconds
 */
function animateNumbers(selector, duration = 2000) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(el => {
    const targetNumber = parseInt(el.getAttribute('data-count'), 10);
    const increment = targetNumber / (duration / 16); // 60fps
    let currentNumber = 0;
    
    const counter = setInterval(() => {
      currentNumber += increment;
      
      if (currentNumber >= targetNumber) {
        el.textContent = targetNumber;
        clearInterval(counter);
      } else {
        el.textContent = Math.round(currentNumber);
      }
    }, 16);
  });
}

// Optional: Initialize number counter for statistics
// document.addEventListener('DOMContentLoaded', function() {
//   animateNumbers('.counter');
// });

/**
 * Animated page transitions
 */
function setupPageTransitions() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;
      
      // Add transition effect to the current section
      const currentSection = document.querySelector('section.active');
      if (currentSection) {
        currentSection.classList.add('fade-out');
        currentSection.classList.remove('active');
        
        setTimeout(() => {
          currentSection.classList.remove('fade-out');
          targetSection.classList.add('active');
          targetSection.classList.add('fade-in');
          
          window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
          });
          
          setTimeout(() => {
            targetSection.classList.remove('fade-in');
          }, 500);
        }, 500);
      } else {
        targetSection.classList.add('active');
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Optional: Initialize page transitions
// setupPageTransitions();