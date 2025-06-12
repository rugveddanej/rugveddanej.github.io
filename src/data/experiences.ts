import { TimelineItemProps } from '../components/Timeline';

const currentYear = new Date().getFullYear();

const experiences: TimelineItemProps[] = [
  {
    id: 1,
    title: 'Full Stack Developer',
    period: `2023 - 2025`,
    description: `Learned and applied React, Node.js, MongoDB, Express.js, TypeScript, and RESTful API development while building full-stack web applications.`,
  },
  {
    id: 2, // Frontend Developer
    title: 'Frontend Developer',
    period: '2021 - 2023',
    description: `Gained proficiency in HTML, CSS, JavaScript, and Tailwind CSS, focusing on creating responsive and user-friendly interfaces.`,
  },
  {
    id: 3,
    title: 'Node.js Developer',
    period: '2020 - 2021',
    description: `Learned to develop server-side applications and RESTful APIs using Node.js, while also creating Discord bots, and managing deployments with Docker and Git.`,
  }
];

export default experiences;
