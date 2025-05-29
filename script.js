// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('hidden') === false) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
} else {
    body.classList.remove('dark');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Typewriter Effect
const typewriterTexts = [
    "Welcome to My Portfolio",
    "I'm Rubil Mogere",
    "Software Engineer",
    "Web Developer"
];
const typewriterElement = document.getElementById('typewriter');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typingSpeed = 500; // Pause before typing next text
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typewriter effect after 1 second
setTimeout(typeWriter, 1000);

// Floating Action Button (Scroll to Top)
const fab = document.getElementById('fab');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        fab.style.opacity = '1';
        fab.style.visibility = 'visible';
    } else {
        fab.style.opacity = '0';
        fab.style.visibility = 'hidden';
    }
});

fab.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // In a real application, you would send this data to a server
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        document.getElementById('contactForm').reset();
    } else {
        alert('Please fill out all required fields.');
    }
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// 3D Skills Visualization
function init3DSkills() {
    const canvas = document.getElementById('skills3d');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.parentElement.clientWidth / canvas.parentElement.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create skill spheres
    const skills = [
        { name: 'HTML5', color: 0xE44D26, size: 0.8 },
        { name: 'CSS3', color: 0x264DE4, size: 0.8 },
        { name: 'JavaScript', color: 0xF7DF1E, size: 1.0 },
        { name: 'React', color: 0x61DAFB, size: 0.9 },
        { name: 'Node.js', color: 0x68A063, size: 0.9 },
        { name: 'MongoDB', color: 0x4DB33D, size: 0.7 }
    ];

    const skillSpheres = [];
    const group = new THREE.Group();

    skills.forEach((skill, i) => {
        const geometry = new THREE.SphereGeometry(skill.size, 32, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: skill.color,
            wireframe: true 
        });
        const sphere = new THREE.Mesh(geometry, material);
        
        // Position spheres in a circle
        const angle = (i / skills.length) * Math.PI * 2;
        sphere.position.x = Math.cos(angle) * 2;
        sphere.position.y = Math.sin(angle) * 2;
        
        group.add(sphere);
        skillSpheres.push(sphere);
    });

    scene.add(group);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        group.rotation.x += 0.005;
        group.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.parentElement.clientWidth / canvas.parentElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    });
}

// Initialize 3D skills when page loads
document.addEventListener('DOMContentLoaded', init3DSkills);

// AI Assistant
const aiToggle = document.getElementById('aiToggle');
const aiChat = document.getElementById('aiChat');
const aiMessages = document.getElementById('aiMessages');
const aiInput = document.getElementById('aiInput');

// AI responses
const aiResponses = {
    "skills": "I have expertise in HTML5, CSS3, JavaScript, React, Node.js, and MongoDB. I'm also proficient in Git and responsive design principles.",
    "experience": "I've been working as a software engineer for several years, with experience in both frontend and backend development.",
    "projects": "Some of my notable projects include a Check-in App, Movie Ticket Booking system, and Moghe Empire platform. You can view them in my projects section.",
    "contact": "You can reach me via email at mogererubil@gmail.com or phone at +254759261022. I'm based in Nairobi, Kenya.",
    "default": "I'm Rubil's AI assistant. You can ask me about his skills, experience, projects, or how to contact him."
};

aiToggle.addEventListener('click', () => {
    aiChat.classList.toggle('hidden');
});

aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && aiInput.value.trim()) {
        const userMessage = aiInput.value.trim().toLowerCase();
        let response = aiResponses.default;
        
        // Check for keywords in the question
        if (userMessage.includes('skill') || userMessage.includes('technology')) {
            response = aiResponses.skills;
        } else if (userMessage.includes('experience') || userMessage.includes('background')) {
            response = aiResponses.experience;
        } else if (userMessage.includes('project') || userMessage.includes('work')) {
            response = aiResponses.projects;
        } else if (userMessage.includes('contact') || userMessage.includes('reach') || userMessage.includes('email') || userMessage.includes('phone')) {
            response = aiResponses.contact;
        }
        
        // Add user message to chat
        const userMsgElement = document.createElement('div');
        userMsgElement.className = 'mb-2 text-right';
        userMsgElement.innerHTML = `<span class="inline-block bg-purple-500 text-white px-3 py-2 rounded-lg">${aiInput.value}</span>`;
        aiMessages.appendChild(userMsgElement);
        
        // Add AI response to chat
        const aiMsgElement = document.createElement('div');
        aiMsgElement.className = 'mb-2 text-left';
        aiMsgElement.innerHTML = `<span class="inline-block bg-gray-700 text-white px-3 py-2 rounded-lg">${response}</span>`;
        aiMessages.appendChild(aiMsgElement);
        
        // Clear input and scroll to bottom
        aiInput.value = '';
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
});