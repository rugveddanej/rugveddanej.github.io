import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import projects from '../data/projects';

const Projects: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    setFilteredProjects(filtered);
  }, [searchQuery, selectedCategory]);

  const categories = ['all', 'web', 'api', 'bot'];

  return (
    <PageTransition>
      <section className="section-container">
        <SectionTitle 
          title="My Projects" 
          subtitle="Explore my latest work and side projects"
          centered
        />

        <div className="mb-8 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search projects by name, description, or technology..."
          />

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-dark-100 hover:bg-dark-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader type="project" count={6} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </section>
    </PageTransition>
  );
};

export default Projects;