// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#ff6b6b',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    targetX = (mouseX - window.innerWidth / 2) * 0.001;
    targetY = (mouseY - window.innerHeight / 2) * 0.001;

    // Update card effects
    document.querySelectorAll('.project-card, .resume-section').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Magnetic button effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) * 0.1;
        const deltaY = (y - centerY) * 0.1;

        gsap.to(btn, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += targetY * 0.5;
    particlesMesh.rotation.y += targetX * 0.5;

    renderer.render(scene, camera);
}

animate();

// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorOutline = document.createElement('div');
cursorOutline.className = 'custom-cursor-outline';
document.body.appendChild(cursorOutline);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5
    });
});

// Magnetic effect for buttons
document.querySelectorAll('.primary-button, .secondary-button, .project-card').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * 0.1;
        const deltaY = (y - centerY) * 0.1;
        
        gsap.to(button, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Parallax effect for sections
document.querySelectorAll('section').forEach(section => {
    const depth = 0.2;
    const movement = -(section.offsetTop * depth);
    
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: movement,
        ease: 'none'
    });
});

// Text reveal animation
const splitText = (element) => {
    const text = element.textContent;
    const chars = text.split('');
    element.textContent = '';
    chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'reveal-char';
        element.appendChild(span);
    });
};

document.querySelectorAll('.hero-content h1, .section-title').forEach(text => {
    splitText(text);
    gsap.from(text.querySelectorAll('.reveal-char'), {
        scrollTrigger: {
            trigger: text,
            start: 'top 80%'
        },
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Project card animations
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// Skills animation
gsap.from('.skills-list span', {
    scrollTrigger: {
        trigger: '.skills-container',
        start: 'top 80%'
    },
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: 'back.out(1.7)'
});

// Contact links animation
gsap.from('.contact-links a', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%'
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// Create particles background
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--x', `${Math.random() * 100}vw`);
        particle.style.setProperty('--y', `${Math.random() * 100}vh`);
        particle.style.setProperty('--duration', `${Math.random() * 20 + 10}s`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particlesContainer.appendChild(particle);
    }
};

createParticles();

// Add hover effect for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    const text = link.textContent;
    const letters = text.split('');
    
    link.textContent = '';
    letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.transitionDelay = `${i * 50}ms`;
        link.appendChild(span);
    });
});

// Initialize section transitions
const initPageTransitions = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
};

initPageTransitions();

// Add scroll progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });
};

createScrollProgress();

// Handle dark/light mode toggle
const createThemeToggle = () => {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        toggle.innerHTML = document.body.classList.contains('light-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
};

createThemeToggle();

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Scroll animations
function initScrollAnimations() {
    // Hero section animations
    gsap.from('.hero-content', {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out'
    });

    // Project cards animation
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2
    });

    // About section animation
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8
    });

    // Contact section animation
    gsap.from('.contact-content', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8
    });
}

// Initialize animations
initScrollAnimations();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 70
            },
            ease: 'power4.inOut'
        });
    });
});

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Navbar background
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(42, 15, 60, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(42, 15, 60, 0.8)';
    }
});
