import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-600 transition-all duration-500"
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-dark-800/90 border border-dark-700">
          {project.status === 'completed' && (
            <span className="text-green-400">Completed</span>
          )}
          {project.status === 'in-progress' && (
            <span className="text-yellow-400">In Progress</span>
          )}
          {project.status === 'planned' && (
            <span className="text-blue-400">Planned</span>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Title and Category */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <span className="flex items-center gap-1 text-xs text-dark-100">
            <Tag className="w-3 h-3" />
            {project.category.toUpperCase()}
          </span>
        </div>

        {/* Description */}
        <p className="text-dark-100 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-dark-700 text-dark-100 px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Completion Date */}
        <div className="flex items-center gap-2 text-dark-100 text-sm mb-4">
          <Calendar className="w-4 h-4" />
          <span>
            Completed: {new Date(project.completionDate).toLocaleDateString()}
          </span>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between">
          <Link
            to={`/project/${project.slug}`}
            className="text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            View Details
            <ExternalLink className="w-4 h-4" />
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-100 hover:text-white p-2 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;