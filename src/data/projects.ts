import { Project } from '../types/project'; // Adjust path if needed
import p1 from '../assets/projects/website.jpg';
const projects: Project[] = [
  {
    id: 1,
    slug: 'portfolio-website',
    title: 'Personal Portfolio Website',
    description: 'A sleek and modern portfolio website showcasing my projects, skills, and experience.',
    longDescription: `
      This very website! Designed to be responsive, fast, and visually appealing, 
      it serves as a central hub for my professional online presence. 
      It's built with modern web technologies to ensure a smooth user experience.
    `,
    image: p1,
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    features: [
      'Responsive design for all devices',
      'Optimized for performance and SEO',
      'Dynamic project filtering',
      'Contact form integration'
    ],
        stats: {
      uptime: '99.9%'
    },
    demoUrl: 'https://yourportfolio.com', // Replace with your actual URL
    githubUrl: '404', // Replace with your actual GitHub repo
    category: 'web',
    status: 'completed',
    completionDate: '2025-04-28' // Assuming you're completing it now!
  }
];

export default projects;
