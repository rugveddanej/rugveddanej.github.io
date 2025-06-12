import tav1 from '../assets/testimonials/luna_foster.jpeg';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Luna Foster",
    position: "Project Manager",
    message: "Rugved turned our vision for a dynamic blogging platform into a sleek, high-performing product. His precision and technical skill made the process seamless and the outcome exceptional.",
    longMessage: "Rugved brought our idea of a feature-rich blogging platform to life with remarkable professionalism. His technical skills in React, Node.js, and MongoDB were instrumental in creating a smooth, responsive experience. He was proactive, always open to feedback, and delivered every milestone on time. Post-launch, we saw a +150% increase in user engagement—clear proof of the platform’s impact. Working with Rugved was a seamless and rewarding experience.",
    rating: 5.0,
    image: tav1,
    project: "Blogging Platform",
    projectType: "web",
    completionDate: "2024-07-15",
    technologies: ["React", "Node.js", "MongoDB"],
    impact: {
      metric: "User Engagement",
      value: "+150%"
    },
    onTimeDelivery: true
  },
];