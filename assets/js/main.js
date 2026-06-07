/*=============== SHOW MENU / HIDDEN ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu Show */
if(navToggle) {
   navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
   });
}

/* Menu Hidden */
if(navClose) {
   navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
   });
}

/* Remove Menu Mobile On Link Click */
const navLink = document.querySelectorAll('.nav--link');

const linkAction = () => {
   const navMenu = document.getElementById('nav-menu');
   navMenu.classList.remove('show-menu');
};
navLink.forEach(n => n.addEventListener('click', linkAction));


/*=============== HOME SPLIT TEXT WITH ANIME.JS ===============*/
const { animate, text, stagger } = anime

const { chars: chars1 } = text.split('.home--profession-1', { chars: true })
const { chars: chars2 } = text.split('.home--profession-2', { chars: true })

animate(chars1, {
    y: [
        { to: ['100%', '0%'] },
        { to: '-100%', delay: 4000, ease: 'in(3)' }
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(80),
    loop: true,
})

animate(chars2, {
    y: [
        { to: ['100%', '0%'] },
        { to: '-100%', delay: 4000, ease: 'in(3)' }
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(80),
    loop: true,
})

/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects--swiper', {
   loop: true,
   spaceBetween: 24,
   slidesPerView: 'auto',
   grabCursor: true,
   speed: 600,

   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },

   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   },
   breakpoints: {
      540: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1150: { slidesPerView: 3 }
   }
});

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
   tab.addEventListener('click', (e) => {
      e.stopPropagation(); 
      const targetSelector = tab.dataset.target;
      const targetContent = document.querySelector(targetSelector);

      tabContents.forEach((content) => content.classList.remove('work-active'));
      tabs.forEach((t) => t.classList.remove('work-active'));

      tab.classList.add('work-active');
      targetContent.classList.add('work-active');
   });
});   

/*=============== SERVICES ACCORDION ===============*/
const servicesCards = document.querySelectorAll('.services--card');

servicesCards.forEach(card => {
   const button = card.querySelector('.services--button');
   const info = card.querySelector('.services--info');
   
   if(card.classList.contains('services-open')) {
      info.style.height = info.scrollHeight + 'px';
   } else {
      info.style.height = '0px';
   }

   button.addEventListener('click', () => {
      const isCardOpen = card.classList.contains('services-open');

      servicesCards.forEach(c => {
         c.classList.replace('services-open', 'services-close');
         c.querySelector('.services--info').style.height = '0px';
      });

      if (!isCardOpen) {
         card.classList.replace('services-close', 'services-open');
         info.style.height = info.scrollHeight + 'px';
      }
   });
});

/*=============== DUPLICATE TESTIMONIAL CARDS FOR INFINITE SCROLL ===============*/
const tracks = document.querySelectorAll('.testimonials--content');

tracks.forEach(track => {
   const cards = [...track.children]; 
   cards.forEach(card => {
      track.appendChild(card.cloneNode(true));
   });
});

/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn');

if(copyBtn) {
   const copyEmail = document.getElementById('contact-email').textContent;

   copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(copyEmail).then(() => {
         copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>';

         setTimeout(() => {
            copyBtn.innerHTML = 'Copy Email <i class="ri-file-copy-fill"></i>';
         }, 2000);
      });
   });
}

/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.getElementById('footer-year');
if(textYear) {
   textYear.textContent = new Date().getFullYear();
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
   const scrollY = window.scrollY;

   sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav--menu a[href*=' + sectionId + ']');

      if(sectionsClass) {
         if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
         } else {
            sectionsClass.classList.remove('active-link');
         }
      }
   });
};
window.addEventListener('scroll', scrollActive);

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;

if(cursor) {
   const cursorMove = () => {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      cursor.style.transform = 'translate(-50%, -50%)';

      requestAnimationFrame(cursorMove);
   };

   document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
   });

   cursorMove();

   /* Hide custom cursor on hover links/buttons */
   const interactables = document.querySelectorAll('a, button');
   interactables.forEach(item => {
      item.addEventListener('mouseover', () => cursor.classList.add('hide-cursor'));
      item.addEventListener('mouseleave', () => cursor.classList.remove('hide-cursor'));
   });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
   const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 300,
   });

   sr.reveal('.home--image, .projects--container, .testimonials--container, .contact--container');
   sr.reveal('.home--data', {delay: 500, origin: 'left'});
   sr.reveal('.home--info', {delay: 600, origin: 'right'});
   sr.reveal('.home--social, .home--cv', {delay: 700});
   sr.reveal('.services--card', {interval: 100});
}

/*=============== Safe Website ===============*/
  // Disable Right Click
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // Disable Inspect Shortcuts
  document.onkeydown = function (e) {

    // F12
    if (e.keyCode == 123) {
      return false;
    }

    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
      return false;
    }

    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
      return false;
    }

    // Ctrl+U
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
      return false;
    }

    // Ctrl+S
    if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
      return false;
    }
  };

  // Detect DevTools
  setInterval(() => {
    const devtools =
      window.outerWidth - window.innerWidth > 160 ||
      window.outerHeight - window.innerHeight > 160;

    if (devtools) {
      document.body.innerHTML = `
        <div style="
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:black;
          color:white;
          font-size:30px;
          font-family:sans-serif;
        ">
          Inspect Disabled
        </div>
      `;
    }
  }, 1000);
