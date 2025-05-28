import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, Calendar, Tag, Users, Server, Clock } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SkeletonLoader from '../components/SkeletonLoader';
import projects from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!project && !loading) {
    navigate('/404');
    return null;
  }

  return (
    <PageTransition>
      <section className="section-container">
        {loading ? (
          <SkeletonLoader type="projectDetail" />
        ) : project ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-dark-100 hover:text-white mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>

            {/* Project Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent" />
            </div>

            {/* Project Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
                <div className="flex items-center gap-4 text-dark-100">
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {project.category.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.completionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>

            {/* Project Description */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">About the Project</h2>
              <p className="text-dark-100 leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {Object.entries(project.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center"
                >
                  <div className="text-2xl font-bold text-primary-400 mb-2">{value}</div>
                  <div className="text-dark-100 capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-full text-dark-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-dark-100"
                  >
                    <span className="w-2 h-2 bg-primary-600 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </section>
    </PageTransition>
  );
};

export default ProjectDetail;