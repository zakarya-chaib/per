// ===== Dark mode toggle with localStorage =====
(function(){
  const root = document.documentElement;
  const storageKey = "zc-theme";
  const btn = document.getElementById("themeToggle");

  function setTheme(mode){
    root.setAttribute("data-theme", mode);
    localStorage.setItem(storageKey, mode);
  }

  // Init: system preference → stored → default
  const stored = localStorage.getItem(storageKey);
  if(stored){
    setTheme(stored);
  }else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    setTheme('dark');
  }else{
    setTheme('light');
  }

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
})();

// ===== Scroll reveal (IntersectionObserver) =====
(function(){
  const els = Array.from(document.querySelectorAll('.reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('reveal-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();

// ===== Smooth scroll for internal links =====
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();


