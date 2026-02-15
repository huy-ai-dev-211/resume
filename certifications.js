(function () {
    // Certifications data
    const certifications = [
        {
            id: 1,
            title: "JavaScript Programming with React, Node & MongoDB Specialization (IBM)",
            issuer: "IBM",
            date: "March 18, 2025",
            duration: "2 months (10 hours/week)",
            badge: "assets/certificates/ibm-js-cert.png",
            courses: [
                "JavaScript Programming Essentials",
                "Developing Front-End Apps with React",
                "Developing Back-End Apps with Node.js and Express",
                "Node.js & MongoDB: Developing Back-end Database Applications"
            ],
            skills: [
                "Node.js",
                "Computer Programming",
                "Web Development",
                "Express",
                "React",
                "MongoDB",
                "JavaScript"
            ],
            certificateUrl: "https://coursera.org/share/30a1543dd6ea5a23d55640841f169fa1"
        },
        {
            id: 2,
            title: "Advanced Django: Mastering Django and Django Rest Framework Specialization (Codio)",
            issuer: "Codio",
            date: "March 18, 2025",
            duration: "1 month (10 hours/week)",
            badge: "assets/certificates/codio-django-cert.png",
            courses: [
                "Advanced Django: Building a Blog",
                "Advanced Django: Introduction to Django Rest Framework",
                "Advanced Django: Advanced Django Rest Framework",
                "Advanced Django: External APIs and Task Queuing"
            ],
            skills: [
                "Django",
                "React",
                "Web Development",
                "Python Programming"
            ],
            certificateUrl: "https://coursera.org/share/4c47425b6021282944cabf7bdb18527d"
        },
        {
            id: 3,
            title: "ASP.NET for Experienced Developers Specialization (Board Infinity)",
            issuer: "Board Infinity",
            date: "March 4, 2025",
            duration: "3 months (5 hours/week)",
            badge: "assets/certificates/board-infinity-aspnet-cert.png",
            courses: [
                "C# for .NET Developers",
                "Backend Development using ASP.Net",
                "Microservices and Deployment by using ASP.NET"
            ],
            skills: [
                "C#",
                "ASP.NET",
                "ASP.NET Core",
                "RESTful APIs",
                "MVC",
                "Object-Oriented Programming (OOP)",
                "Front And Back Ends",
                "Microservices Architecture",
                "Heterogeneous Database System",
                "DevOps",
                "Docker",
                "Dockerfile Creation"
            ],
            certificateUrl: "https://coursera.org/share/343d86035d7276bf0f1c986ea1eb5688"
        },
        {
            id: 4,
            title: "Microsoft Full-Stack Developer(Microsoft)",
            issuer: "Microsoft",
            date: "July 4, 2025",
            duration: "9 months (10 hours/week)",
            badge: "assets/certificates/MSFT-stacked-logo_FINAL.png",
            courses: [
                "Foundations of Coding Full-Stack",
                "Introduction to Programming With C#",
                "Introduction to Web Development",
                "Blazor for Front-End Development",
                "Back-End Development with .NET",
                "Database Integration and Management",
                "Full-Stack Integration",
                "Security and Authentication",
                "Performance Optimization and Scalability",
                "Data Structures and Algorithms",
                "Deployment and DevOps",
                "Full-Stack Developer Capstone Project"
            ],
            skills: [
                "Continuous Integration",
                "GitHub",
                "Load Balancing",
                "Graph Theory",
                "Git (Version Control System)",
                "CI/CD",
                "Full-Stack Web Development",
                "Scalability",
                "Authentications",
                "SQL",
                "Object Oriented Programming (OOP)",
                "ASP.NET"
            ],
            certificateUrl: "https://coursera.org/share/c91756ee16bc6b9d812ed963110c4468"
        }
    ];

    // Function to create certification card
    function createCertCard(cert) {
        return `
            <div class="cert-card">
                <div class="cert-header">
                    <div class="badge-wrapper">
                        <img src="${cert.badge}" alt="${cert.issuer} Certification">
                    </div>
                    <div class="cert-title">
                        <h3 style="margin-bottom: 0.5rem">${cert.title}</h3>
                        <p class="date">Issued ${cert.date}</p>
                        <p class="duration">${cert.duration}</p>
                    </div>
                    <a href="${cert.certificateUrl}" target="_blank" class="btn">View certificate</a>
                </div>
                <div class="cert-details">
                    <div class="skills-gained">
                        <!-- <h4>Skills I Gained</h4> -->
                        <div class="skill-tags">
                            ${cert.skills.map(skill => `<span>${skill}</span>`).join('')}
                        </div>
                    </div>
                    <div class="expansion-panel">
                        <div class="expansion-content">
                            <ul class="courses">
                                ${cert.courses.map(course => `<li>${course}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="expansion-header">
                            <button class="btn">
                             <span class="chevron-icon">
                                <span class="icon-bar left"></span>
                                <span class="icon-bar right"></span>
                            </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to render certifications
    function renderCertifications() {
        const certGrid = document.querySelector('.cert-grid');
        console.log('Cert Grid Element:', certGrid); // Debug log

        if (certGrid) {
            console.log('Rendering certifications...'); // Debug log
            certGrid.innerHTML = certifications.map(cert => createCertCard(cert)).join('');
            console.log('Certifications rendered successfully'); // Debug log
        } else {
            console.error('Cert Grid element not found!'); // Error log
        }
    }

    // Initialize certifications when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content Loaded'); // Debug log
        renderCertifications();

        document.querySelectorAll('.expansion-header button').forEach(button => {
            button.addEventListener('click', function () {
                const panel = this.closest('.expansion-panel');
                panel.classList.toggle('active');
            });
        });
    });
})(); 