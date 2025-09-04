document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('active');
      const isExpanded = menuToggle.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Navigation Active State
  const navLinks = document.querySelectorAll('.nav-list a:not(.btn-register)');
  const isIndexPage = window.location.pathname === '/' || window.location.pathname.includes('index.html');

  if (navLinks.length > 0) {
    const homeLink = document.querySelector('.nav-list a[href="#home"], .nav-list a[href="index.html#home"]');
    if (homeLink && isIndexPage) {
      homeLink.classList.add('active');
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#') && isIndexPage) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 60,
              behavior: 'smooth'
            });
          }
        }

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        if (menuToggle && navList && navList.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navList.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    if (isIndexPage) {
      const sections = document.querySelectorAll('section[id]');
      if (sections.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                  }
                });
              }
            });
          },
          { rootMargin: '-60px 0px -40%', threshold: [0.2, 0.5] }
        );

        sections.forEach(section => observer.observe(section));
      }
    }
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.prev-testimonial');
  const nextButton = document.querySelector('.next-testimonial');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    if (testimonials.length === 0) return;
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle('active', i === index);
    });
  }

  if (testimonials.length > 0 && prevButton && nextButton) {
    showTestimonial(currentTestimonial);

    prevButton.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    nextButton.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    const autoSlide = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);

    prevButton.addEventListener('click', () => clearInterval(autoSlide));
    nextButton.addEventListener('click', () => clearInterval(autoSlide));

    prevButton.setAttribute('aria-label', 'Testimoni Sebelumnya');
    nextButton.setAttribute('aria-label', 'Testimoni Berikutnya');
  }

  // Fade-In Animation on Scroll
  const fadeElements = document.querySelectorAll('.features, .about, .programs, .mengapa-kami, .news, .testimonials, .contact, .register, footer');
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    fadeElements.forEach(element => {
      element.classList.add('fade-in');
      fadeObserver.observe(element);
    });
  }

  // Form Handling - Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[name="name"]')?.value.trim();
      const email = contactForm.querySelector('input[name="email"]')?.value.trim();
      const program = contactForm.querySelector('select[name="program"]')?.value;
      const message = contactForm.querySelector('textarea[name="message"]')?.value.trim();

      if (name && email && program && message) {
        alert('Pesan telah dikirim! Kami akan segera menghubungi Anda.');
        contactForm.reset();
      } else {
        alert('Harap isi semua kolom wajib dengan benar.');
      }
    });
  }

  // Form Handling - Register Form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = registerForm.querySelector('input[name="parent-name"]')?.value.trim();
      const childName = registerForm.querySelector('input[name="child-name"]')?.value.trim();
      const birthdate = registerForm.querySelector('input[name="child-birthdate"]')?.value;
      const photo = registerForm.querySelector('input[name="child-photo"]')?.files[0];
      const program = registerForm.querySelector('select[name="program"]')?.value;
      const email = registerForm.querySelector('input[name="email"]')?.value.trim();
      const phone = registerForm.querySelector('input[name="phone"]')?.value.trim();
      const address = registerForm.querySelector('textarea[name="address"]')?.value.trim();

      if (parentName && childName && birthdate && photo && program && email && phone && address) {
        alert('Pendaftaran berhasil! Kami akan menghubungi Anda.');
        registerForm.reset();
      } else {
        alert('Harap isi semua kolom wajib dengan benar.');
      }
    });
  }

  // Form Handling - Newsletter Form
  const newsletterForms = document.querySelectorAll('#newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[name="email"]')?.value.trim();
      if (email) {
        alert('Terima kasih telah berlangganan! Anda akan menerima update dari kami.');
        form.reset();
      } else {
        alert('Harap masukkan alamat email yang valid.');
      }
    });
  });

  // File Size Validation for Photo Input (Max 2MB)
  const photoInput = document.getElementById('child-photo');
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file && file.size > maxSize) {
        alert('File terlalu besar! Maksimum 2MB.');
        e.target.value = '';
      }
    });
  }

  // Handle Window Resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navList?.classList.contains('active')) {
      menuToggle?.classList.remove('active');
      navList.classList.remove('active');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});