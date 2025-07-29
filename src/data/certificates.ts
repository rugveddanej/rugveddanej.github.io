import { CertificateProps } from '../components/CertificateCard';
import c1 from '../assets/certificates/responsive-web-design.png';
import c2 from '../assets/certificates/javascript-algorithms-and-data-structures.png';
import c3 from '../assets/certificates/front-end-development-libraries.png';
import c4 from '../assets/certificates/data-visualization.png';
import c5 from '../assets/certificates/relational-database-v8.png';
import c6 from '../assets/certificates/foundational-c-sharp-with-microsoft.png';
import c7 from '../assets/certificates/legacy-front-end.png';
import c8 from '../assets/certificates/javascript-algorithms-and-data-structures-v8.png';

const certificates: CertificateProps[] = [
  {
    id: 1,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issueDate: "2025-06-19",
    credentialUrl: "https://www.freecodecamp.org/certification/rugved_danej/responsive-web-design",
    image: c1,
    skills: ["HTML", "CSS", "Responsive Design", "Flexbox", "Grid Layout", "Media Queries"],
    description: "Comprehensive certification covering modern responsive web design principles, including HTML5 semantic elements, CSS3 advanced features, and mobile-first design methodologies.",
    hours: 300,
    verified: true
  },
  {
    id: 2,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp", 
    issueDate: "2025-06-13",
    credentialUrl: "https://www.freecodecamp.org/certification/rugved_danej/javascript-algorithms-and-data-structures",
    image: c2,
    skills: ["JavaScript ES6+", "Algorithms", "Data Structures", "Object-Oriented Programming", "Functional Programming"],
    description: "New project-based certification focusing on modern JavaScript development, algorithmic thinking, and data structure implementation through hands-on projects.",
    hours: 300,
    verified: true
  },
  {
    id: 3,
    title: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    issueDate: "2025-06-13",
    credentialUrl: "https://www.freecodecamp.org/certification/rugved_danej/front-end-development-libraries",
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
    credentialUrl: "https://www.freecodecamp.org/certification/rugved_danej/data-visualization",
    image: c4,
    skills: ["D3.js", "JSON", "APIs", "Data Structures", "SVG"],
    description: "Certification focused on representing data visually using D3.js and other tools, including working with APIs and various data formats.",
    hours: 300,
    verified: true
  },
  {
    id: 5,
    title: "Relational Database",
    issuer: "freeCodeCamp",
    issueDate: "2025-06-13", // Update with actual date
    credentialUrl: "https://www.freecodecamp.org/certification/rugved_danej/relational-database-v8",
    image: c5,
    skills: ["SQL", "PostgreSQL", "Bash", "Git", "Database Design", "Linux Commands"],
    description: "Project-based certification covering relational database concepts, SQL queries, database design, and command line tools. Built using PostgreSQL, Bash, and Git.",
    hours: 300,
    verified: true
  },
  {
    id: 6,
    title: "Foundational C# with Microsoft",
    issuer: "freeCodeCamp & Microsoft",
    issueDate: "2025-06-13", // Update with actual date
    credentialUrl: "https://www.freecodecamp.org/certification/rugved_danej/foundational-c-sharp-with-microsoft",
    image: c6,
    skills: ["C#", ".NET", "Object-Oriented Programming", "Variables", "Methods", "Classes"],
    description: "Foundational certification in C# programming language in partnership with Microsoft, covering core programming concepts, syntax, and basic application development.",
    hours: 35,
    verified: true
  },
  {
    id: 7,
    title: "Legacy Front End",
    issuer: "freeCodeCamp",
    issueDate: "2025-06-13", // Update with actual date
    credentialUrl: "https://www.freecodecamp.org/certification/rugved_danej/legacy-front-end",
    image: c7,
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "Sass"],
    description: "Legacy certification covering traditional front-end development technologies and frameworks, including jQuery, Bootstrap, and Sass preprocessing.",
    hours: 400,
    verified: true
  },
  {
    id: 8,
    title: "Legacy JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    issueDate: "2025-06-13",
    credentialUrl: "https://www.freecodecamp.org/certification/rugved_danej/legacy-javascript-algorithms-and-data-structures",
    image: c8,
    skills: ["JavaScript ES6+", "Algorithms", "Data Structures", "Object-Oriented Programming", "Functional Programming"],
    description: "Legacy version of the JavaScript certification focusing on fundamental programming concepts, algorithmic thinking, and data structure implementation through coding challenges.",
    hours: 300,
    verified: true
  }
];

export default certificates;
