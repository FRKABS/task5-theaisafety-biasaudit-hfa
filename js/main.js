// HFA AI Safety Audit â€” Interactive JS

document.addEventListener('DOMContentLoaded', () => {

  // â”€â”€ Animate bars on scroll â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate risk bars
  document.querySelectorAll('.risk-fill, .bias-bar-fill').forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          bar.style.width = targetWidth;
          observer.disconnect();
        }
      }, observerOptions);
      observer.observe(bar);
    }, 100);
  });

  // â”€â”€ Fade-in sections â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(24px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    
    sectionObserver.observe(section);
  });

  // â”€â”€ Attack cards stagger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const cards = document.querySelectorAll('.attack-card, .finding, .shield-layer');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cardObserver.observe(card);
  });

  // â”€â”€ Live typing effect for adversarial prompts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const promptCodes = document.querySelectorAll('.prompt-box code');
  promptCodes.forEach(code => {
    const original = code.textContent;
    code.textContent = '';

    const codeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let i = 0;
          const typeInterval = setInterval(() => {
            if (i < original.length) {
              code.textContent += original[i];
              i++;
            } else {
              clearInterval(typeInterval);
            }
          }, 18);
          codeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    codeObserver.observe(code);
  });

  // â”€â”€ Smooth active nav highlight â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const navLinks = document.querySelectorAll('.nav-links a');
  const sectionIds = ['executive', 'redteam', 'bias', 'framework', 'findings'];

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });

  // â”€â”€ Stat counter animation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.querySelectorAll('.stat-num').forEach(stat => {
    const text = stat.textContent.trim();
    const num = parseInt(text);
    if (isNaN(num)) return;

    const suffix = text.replace(/[0-9]/g, '');
    stat.textContent = '0' + suffix;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let current = 0;
          const step = Math.max(1, Math.floor(num / 40));
          const interval = setInterval(() => {
            current = Math.min(current + step, num);
            stat.textContent = current + suffix;
            if (current >= num) clearInterval(interval);
          }, 40);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(stat);
  });

  // â”€â”€ Console easter egg â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  console.log('%cðŸ›¡ï¸ HFA AI Safety Audit', 'font-size:18px; font-weight:bold; color:#4a9eff;');
  console.log('%cRed Team Exercise â€” Task 5 Complete | HFA Labs', 'color:#9aa0b4; font-size:12px;');
  console.log('%câš¡ Critical vulnerabilities found: Prompt Injection, Token Smuggling | Author: Hafiz Farrukh Abbas', 'color:#ff3b5c; font-size:12px;');
});
