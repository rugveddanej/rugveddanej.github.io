// src/data/feedbacks.ts
import fav1 from '../assets/feedbacks/ava_max.jpeg';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ava Max",
    position: "Owner",
    company: "Dialga's Empire",
    message: "Rugved developed a Discord bot for my server, and the results were outstanding. His attention to detail, clean coding practices, and timely delivery made the entire process seamless.",
    longMessage: "Rugved developed a Discord bot for my server, and the results were outstanding. His attention to detail, clean coding practices, and timely delivery made the entire process seamless. The bot has significantly improved our server's productivity and automated several key functions, which has enhanced user experience and efficiency.",
    rating: 5.0,
    image: fav1,
    project: "Discord Bot",
    projectType: "bot",
    completionDate: "2024-05-05",
    technologies: ["Discord.js", "Node.js", "MongoDB"],
    impact: {
      metric: "Productivity Boost",
      value: "+120%"
    },
    onTimeDelivery: true
  }
];
