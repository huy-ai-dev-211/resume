// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Dispatch custom event for theme change
    document.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: newTheme }
    }));
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Project Data
const projects = [
    {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
        image: "assets/images/projects/ecommerce.svg",
        technologies: ["React", "Node.js", "Next.js", "Express", "MongoDB", "Stripe"],
        category: "Full Stack Engineer"
    },
    {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, task assignment, and progress tracking.",
        image: "assets/images/projects/task-management.svg",
        technologies: ["JavaScript", "TypeScript", "Vue.js", "Firebase", "C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
        category: "Full Stack Engineer"
    },
    {
        title: "Portfolio Website",
        description: "A responsive portfolio website showcasing projects, skills, and professional information.",
        image: "assets/images/projects/portfolio.svg",
        technologies: ["HTML5", "CSS3", "Tailwind CSS","JavaScript"],
        category: "Frontend Developer"
    },
    {
        title: "Weather App",
        description: "A weather application providing real-time weather data and forecasts using OpenWeather API.",
        image: "assets/images/projects/weather.svg",
        technologies: ["JavaScript", "OpenWeather API", "Python", "Django", "FastAPI", "PostgreSQL"],
        category: "Full Stack Engineer"
    },
    {
        title: "Recipe Finder",
        description: "A recipe search application with filtering options and detailed cooking instructions.",
        image: "assets/images/projects/recipe.svg",
        technologies: ["SaSS", "Tailwind CSS", "JavaScript", "Spoonacular API", "C#", "Blazor"],
        category: "Frontend Developer"
    },
    {
        title: "Chat Application",
        description: "A real-time chat application with user authentication and message history.",
        image: "assets/images/projects/chat.svg",
        technologies: ["JavaScript", "Socket.io", "Node.js", "Express", "MongoDB"],
        category: "Full Stack Engineer"
    }
];

// Certification Data
const certifications = [];

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectGrid = document.querySelector('.project-grid');

function filterProjects(category) {
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    displayProjects(filteredProjects);
}

function displayProjects(projectsToShow = projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';

    projectsToShow.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-category">${project.category}</div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

function getProjectTechStack(projectId) {
    const techStacks = {
        1: ['Python', 'TensorFlow', 'Flask', 'React', 'MongoDB'],
        2: ['Docker', 'Kubernetes', 'Node.js', 'Redis', 'PostgreSQL'],
        3: ['Vue.js', 'D3.js', 'Node.js', 'GraphQL', 'AWS'],
        4: ['Django', 'Redis', 'Swagger', 'PostgreSQL', 'Nginx']
    };
    
    return techStacks[projectId]
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterProjects(button.dataset.filter);
    });
});

// Display initial projects
displayProjects(projects);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-content, .about-content, .project-grid, .cert-grid').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
}); 