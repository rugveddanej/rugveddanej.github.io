export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  stats: {
    [key: string]: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  category: 'web' | 'api' | 'bot' ;
  status: 'completed' | 'in-progress' | 'planned';
  completionDate: string;
}