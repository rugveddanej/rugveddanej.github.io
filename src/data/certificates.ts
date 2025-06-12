import { CertificateProps } from '../components/CertificateCard';
import c1 from '../assets/certificates/certificate1.jpg';

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
  }
];

export default certificates;