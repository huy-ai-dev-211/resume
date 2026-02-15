# Modern Portfolio Website

A clean, responsive, and modern portfolio website built with HTML5, CSS3, and JavaScript. Features include dark mode, smooth scrolling, project filtering, and beautiful animations.

## Features

- 🎨 Modern and clean design
- 🌓 Dark mode support
- 📱 Fully responsive
- ⚡ Smooth scrolling
- 🎯 Project filtering
- ✨ Scroll animations
- 📝 Contact form
- 🔗 Social media integration

## Setup Instructions

1. Clone this repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Create an `assets` folder and add your images:
- Profile picture: `assets/profile.jpg`
- Project images: `assets/project1.jpg`, `assets/project2.jpg`, etc.
- Certification badges: `assets/cert1.png`, `assets/cert2.png`, etc.
- Resume: `assets/resume.pdf`

3. Customize the content:
- Update `index.html` with your personal information
- Modify project data in `script.js`
- Update certification information in `script.js`
- Add your social media links in `index.html`

4. Customize the styling:
- Modify colors in `styles.css` (look for the `:root` variables)
- Adjust animations and transitions
- Update fonts if desired

## Customization Guide

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --text-color: #1f2937;
    --bg-color: #ffffff;
    --section-bg: #f3f4f6;
}
```

### Projects
Update the projects array in `script.js`:
```javascript
const projects = [
    {
        id: 1,
        title: 'Your Project',
        description: 'Project description',
        image: 'assets/project1.jpg',
        category: 'frontend',
        github: 'your-github-link',
        demo: 'your-demo-link'
    },
    // Add more projects...
];
```

### Certifications
Update the certifications array in `script.js`:
```javascript
const certifications = [
    {
        id: 1,
        title: 'Your Certification',
        issuer: 'Issuing Institution',
        date: 'Year',
        badge: 'assets/cert1.png',
        link: 'verification-link'
    },
    // Add more certifications...
];
```

### Contact Form
To make the contact form functional:
1. Set up a backend service (e.g., Formspree, Netlify Forms)
2. Update the form action in `index.html`
3. Modify the form submission handler in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 