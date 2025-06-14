import { CertificateProps } from '../components/CertificateCard';
import c1 from '../assets/certificates/www.freecodecamp.org_certification_rugveddanej_responsive-web-design.png';
import c2 from '../assets/certificates/www.freecodecamp.org_certification_rugveddanej_javascript-algorithms-and-data-structures.png';
import c3 from '../assets/certificates/www.freecodecamp.org_certification_rugveddanej_front-end-development-libraries.png';
import c4 from '../assets/certificates/www.freecodecamp.org_certification_rugveddanej_data-visualization.png';

const certificates: CertificateProps[] = [
  {
    id: 1,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issueDate: "2025-05-23",
    credentialUrl: "https://www.freecodecamp.org/certification/rugveddanej/responsive-web-design",
    image: c1,
    skills: ["HTML", "CSS", "Responsive Design", "Flexbox", "Grid Layout", "Media Queries"],
    description: "Comprehensive certification covering modern responsive web design principles, including HTML5 semantic elements, CSS3 advanced features, and mobile-first design methodologies.",
    hours: 300,
    verified: true
  },
   {
    id: 2,
    title: "Legacy JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    issueDate: "2025-06-13",
    credentialUrl: "https://www.freecodecamp.org/certification/rugveddanej/javascript-algorithms-and-data-structures",
    image: c2,
    skills: ["JavaScript ES6+", "Algorithms", "Data Structures", "Object-Oriented Programming", "Functional Programming"],
    description: "Mastering fundamental JavaScript concepts, including advanced algorithms, various data structures, and problem-solving techniques essential for complex programming challenges.",
    hours: 300,
    verified: true
  },
  {
    id: 3,
    title: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    issueDate: "2025-06-13",
    credentialUrl: "https://www.freecodecamp.org/certification/rugveddanej/front-end-development-libraries",
    image: c3,
    skills: ["React", "Redux", "Sass", "Bootstrap", "jQuery"],
    description: "Certification in building complex front-end applications using popular libraries and frameworks, focusing on React, Redux, and component-based architecture.",
    hours: 300,
    verified: true
  },
  {
    id: 4,
    title: "Data Visualization",
    issuer: "freeCodeCamp",
    issueDate: "2025-06-13",
    credentialUrl: "https://www.freecodecamp.org/certification/rugveddanej/data-visualization",
    image: c4,
    skills: ["D3.js", "JSON", "APIs", "Data Structures", "SVG"],
    description: "Certification focused on representing data visually using D3.js and other tools, including working with APIs and various data formats.",
    hours: 300,
    verified: true
  }
];

export default certificates;
