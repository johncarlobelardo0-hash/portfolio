/**
 * DEVELOPER PORTFOLIO - VANILLA JAVASCRIPT
 * Handles Dark Mode persistence, mobile menu toggle, interactive AI tooltips,
 * project category filtering, contact form validation, and clipboard helpers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNavigation();
  initInteractiveAITooltips();
  initProjectFilters();
  initContactForm();
  initClipboardCopy();
  initScrollSpy();
  updateCopyrightYear();
});

/* ==========================================================================
   1. Interactive Dark Mode with LocalStorage Persistence
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'portfolio_theme';

  // Determine initial theme: localStorage -> system preference -> default 'light'
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  // Toggle button event handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = root.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    });
  }

  // Respond to OS level changes if user has not set explicit preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle & Accessible Drawer
   ========================================================================== */
function initMobileNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileBtn || !navMenu) return;

  function toggleMenu(forceClose = false) {
    const isOpen = forceClose ? false : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', isOpen);
    mobileBtn.classList.toggle('active', isOpen);
    mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Automatically close menu when any nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      toggleMenu(true);
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });
}

/* ==========================================================================
   3. Interactive AI Tools & Custom Tooltips
   ========================================================================== */
function initInteractiveAITooltips() {
  const aiCards = document.querySelectorAll('.interactive-ai-card');
  const tooltip = document.getElementById('custom-tooltip');

  if (!tooltip || aiCards.length === 0) return;

  aiCards.forEach((card) => {
    const toolName = card.getAttribute('data-tooltip-name') || 'AI Tool';
    const toolDesc = card.getAttribute('data-tooltip-desc') || '';

    function showTooltip(e) {
      tooltip.innerHTML = `
        <span class="tooltip-title">${escapeHTML(toolName)}</span>
        <span class="tooltip-desc">${escapeHTML(toolDesc)}</span>
      `;
      tooltip.classList.add('visible');
      positionTooltip(e, card);
    }

    function hideTooltip() {
      tooltip.classList.remove('visible');
    }

    function positionTooltip(event, targetElement) {
      const cardRect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Position centrally above the card by default
      let left = cardRect.left + (cardRect.width / 2) - (tooltipRect.width / 2);
      let top = cardRect.top - tooltipRect.height - 12;

      // Flip below if not enough room above
      if (top < 10) {
        top = cardRect.bottom + 12;
      }

      // Constrain horizontally within viewport margins
      const margin = 16;
      if (left < margin) {
        left = margin;
      } else if (left + tooltipRect.width > viewportWidth - margin) {
        left = viewportWidth - tooltipRect.width - margin;
      }

      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.style.top = `${Math.round(top)}px`;
    }

    card.addEventListener('mouseenter', showTooltip);
    card.addEventListener('mouseleave', hideTooltip);
    card.addEventListener('focus', showTooltip);
    card.addEventListener('blur', hideTooltip);
    card.addEventListener('mousemove', (e) => {
      // Re-adjust tooltip smoothly if user moves mouse inside the card
      if (tooltip.classList.contains('visible')) {
        positionTooltip(e, card);
      }
    });
  });

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

/* ==========================================================================
   4. Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state on buttons
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      // Filter project cards with transition
      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        const match = filterValue === 'all' || categories.includes(filterValue);

        if (match) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Contact Form Validation & Submission Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successAlert = document.getElementById('formSuccessAlert');

  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (val) => val.trim().length >= 2
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
    },
    subject: {
      input: document.getElementById('subject'),
      error: document.getElementById('subjectError'),
      validate: (val) => val.trim().length >= 3
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (val) => val.trim().length >= 5
    }
  };

  // Real-time error removal on input
  Object.values(fields).forEach(({ input }) => {
    if (input) {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Validate all fields
    Object.entries(fields).forEach(([fieldName, { input, validate }]) => {
      if (input) {
        const isValid = validate(input.value);
        if (!isValid) {
          input.parentElement.classList.add('has-error');
          isFormValid = false;
        } else {
          input.parentElement.classList.remove('has-error');
        }
      }
    });

    if (!isFormValid) {
      // Focus first erroneous input
      const firstError = form.querySelector('.form-group.has-error input, .form-group.has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // Interactive button loading state
    if (submitBtn) {
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';

      setTimeout(() => {
        // Show success alert
        if (successAlert) {
          successAlert.style.display = 'flex';
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form inputs
        form.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;

        // Auto hide success alert after 6 seconds
        setTimeout(() => {
          if (successAlert) {
            successAlert.style.display = 'none';
          }
        }, 6000);
      }, 700);
    }
  });
}

/* ==========================================================================
   6. Direct Email Copy-To-Clipboard Helper
   ========================================================================== */
function initClipboardCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailLink = document.getElementById('emailAddress');

  if (!copyBtn || !emailLink) return;

  copyBtn.addEventListener('click', async () => {
    const textToCopy = emailLink.textContent.trim();
    const copyTextSpan = copyBtn.querySelector('.copy-text');

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older contexts
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      // Visual feedback
      const originalText = copyTextSpan.textContent;
      copyTextSpan.textContent = 'Copied!';
      copyBtn.style.borderColor = 'var(--color-success)';
      copyBtn.style.color = 'var(--color-success)';

      setTimeout(() => {
        copyTextSpan.textContent = originalText;
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}

/* ==========================================================================
   7. Scroll Spy & Active Nav Link Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    // Header elevation shadow on scroll
    if (header) {
      if (scrollY > 40) {
        header.style.boxShadow = 'var(--shadow-sm)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    // Scroll spy for navigation
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   8. Dynamic Copyright Year
   ========================================================================== */
function updateCopyrightYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
