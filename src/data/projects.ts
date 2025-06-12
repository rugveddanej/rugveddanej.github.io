import { Project } from '../types/project'; // Adjust path if needed
import p1 from '../assets/projects/project1.jpg';
import p2 from '../assets/projects/project2.jpg';

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
    demoUrl: 'https://rugveddanej.vercel.app', // Replace with your actual URL
    category: 'web',
    status: 'completed',
    completionDate: '2025-04-28' // Assuming you're completing it now!
  },
  {
    id: 2,
    slug: 'elevate-habits',
    title: 'Elevate - Advanced Habit Tracker', // Updated title for consistency with README
    description: 'An advanced, AI-powered habit tracker with gamification, smart insights, and beautiful visualizations built with React and TypeScript.',
    longDescription: `
      Elevate is more than just a habit tracker; it's a personal growth companion.
      Leveraging AI, it provides personalized insights and recommendations to help users build and maintain positive habits.
      The app incorporates gamification elements to make habit tracking engaging and rewarding,
      while stunning data visualizations offer a clear overview of progress over time.
      Built with React and TypeScript, Elevate offers a robust, scalable, and intuitive user experience.

      Key features include:
      - Smart Habit Management: Flexible scheduling, habit categories, smart reminders, and templates.
      - Advanced Analytics & Insights: 365-day heatmap, trend analysis, completion patterns, AI-powered success predictions, and comparative analytics.
      - Gamification System: Achievement system (15+ unique achievements), streak challenges, level progression, and habit mastery.
      - AI-Powered Features: Personalized habit recommendations, optimal timing suggestions, difficulty adjustment, pattern recognition, and predictive analytics.
      - Premium Design Experience: Apple-level aesthetics, micro-interactions, dark/light themes, responsive design, and accessibility-first approach.
      - Advanced User Experience: Offline-first functionality, data portability, custom goals, and habit dependencies.
    `, // Expanded longDescription based on README
    image: p2,
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'AI/ML Integration', 'Gamification'],
    features: [ // Detailed features based on README
      'AI-powered personalized insights and recommendations',
      'Gamified progress tracking with achievements and streaks',
      'Interactive data visualizations including 365-day heatmap',
      'Customizable habit creation and flexible scheduling',
      'Cross-device synchronization (offline-first with smart sync)',
      'Smart reminders and optimal timing suggestions',
      'Dark/Light theme support and responsive design',
      'Data import/export for portability',
      'WCAG 2.1 AA compliant accessibility'
    ],
    stats: {
      uptime: '99.9%',
      bundleSize: '< 1MB gzipped' // Added bundle size from README
    },
    demoUrl: 'https://elevatehabits.vercel.app', // Replace with your actual URL
    githubUrl: 'https://github.com/rugveddanej/elevate-habit-tracker', // Replace with your actual GitHub repo
    category: 'web',
    status: 'completed',
    completionDate: '2025-06-10' // Assuming you're completing it now!
  }
];

export default projects;
