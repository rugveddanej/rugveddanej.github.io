import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SkeletonLoader from '../components/SkeletonLoader';
import Skills from '../components/Skills';
import Timeline from '../components/Timeline';
import skillsData from '../data/skills';
import experiencesData from '../data/experiences';
import avatarImage from '../assets/avatar/avatar_circle.png';


const About: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);
  const [showMoreSkills, setShowMoreSkills] = useState<boolean>(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');

  // Calculate experience years
  useEffect(() => {
    const calculateExperienceYears = (startDate: string): number => {
      const start = new Date(startDate);
      const now = new Date();
      return now.getFullYear() - start.getFullYear() + 
             (now.getMonth() - start.getMonth()) / 12;
    };

    setYearsOfExperience(parseFloat(calculateExperienceYears('2020-07-31').toFixed(1)));
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Skill categories with icons
  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: '🧰' },
    { id: 'frontend', name: 'Frontend', icon: '🖥️' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'tools', name: 'DevOps', icon: '🔧' },
  ];

  const getFilteredSkills = () => {
    if (activeSkillCategory === 'all') return skillsData;
    
    const categoryMap: Record<string, string[]> = {
      frontend: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML/CSS', 'Tailwind'],
      backend: ['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL', 'GraphQL'],
      tools: ['Docker', 'Git', 'AWS', 'CI/CD'],
      design: ['Figma', 'UI/UX', 'Adobe XD']
    };

    return skillsData.filter(skill => 
      categoryMap[activeSkillCategory]?.includes(skill.name)
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const hoverVariants = {
    hover: { 
      y: -5,
      transition: { 
        type: "spring",
        stiffness: 300
      } 
    }
  };

  return (
    <PageTransition>
      <section className="section-container py-12">
        <SectionTitle 
          title="About Me" 
          subtitle="My journey in code & design"
          className="mb-16"
        />
        
        {loading ? (
          <div className="space-y-8">
            <SkeletonLoader type="avatar" />
            <SkeletonLoader type="text" count={3} />
            <SkeletonLoader type="title" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkeletonLoader type="text" count={5} />
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Bio Section */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-center"
            >
              <div className="lg:col-span-2 order-2 lg:order-1">
              <SectionTitle 
                title="Who am I?" 
                className="mb-5"
              />
                
                <div className="space-y-5 text-dark-200 leading-relaxed">
                  <motion.p variants={itemVariants}>
                    Hey, I'm Rugved! A {yearsOfExperience}+ year full-stack developer who began by crafting Discord bots at 11. What started as curiosity evolved into a passion for solving complex problems through code.
                  </motion.p>
                  
                  <motion.p variants={itemVariants}>
                    I specialize in <span className="text-white font-medium">React ecosystems</span> and <span className="text-white font-medium">Node.js backends</span>, with a keen eye for <span className="text-white font-medium">performance optimization</span> and <span className="text-white font-medium">scalable architecture</span>.
                  </motion.p>
                  
                  <motion.p variants={itemVariants}>
                    When not coding, you'll find me <span className="text-accent-400">photographing landscapes</span>, experimenting with <span className="text-accent-400">new recipes</span>, or <span className="text-accent-400">hiking trails</span>. These creative outlets fuel my technical work.
                  </motion.p>
                </div>
              </div>
              
              <motion.div 
                className="order-1 lg:order-2 flex justify-center relative"
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 group">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-primary-500/30 group-hover:border-primary-500/70 transition-all duration-500"
                    animate={{
                      rotate: 360,
                      transition: {
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={avatarImage}
                    alt="Rugved Danej"
                    className="relative rounded-full w-full h-full object-cover border-4 border-dark-800 z-10"
                  />
                  <motion.div 
                    className="absolute -bottom-4 -right-4 bg-dark-900 border border-dark-700 px-4 py-2 rounded-full shadow-lg z-20"
                    variants={hoverVariants}
                  >
                    <span className="text-primary-400 font-bold">{yearsOfExperience} Years</span>
                    <span className="text-dark-300 ml-1">Experience</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Skills Section */}
            <motion.div 
              variants={itemVariants}
              className="mb-20"
            >
              <SectionTitle 
                title="Technical Toolkit" 
                subtitle="Languages, frameworks & tools I work with"
                className="mb-10"
              />

              <motion.div className="flex flex-wrap gap-3 mb-8">
                {skillCategories.map((category, i) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveSkillCategory(category.id)}
                    className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                      activeSkillCategory === category.id
                        ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
                        : 'bg-dark-800 text-dark-200 hover:bg-dark-700 border border-dark-700'
                    }`}
                    variants={itemVariants}
                    custom={i * 0.1}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div className="relative">
                <Skills 
                  skills={showMoreSkills ? getFilteredSkills() : getFilteredSkills().slice(0, 8)} 
                  variants={itemVariants}
                />
               
                {getFilteredSkills().length > 8 && (
                  <motion.button
                    className="mt-6 px-6 py-2 rounded-full border border-dark-700 bg-dark-900 hover:bg-dark-800 transition-colors flex items-center gap-2 mx-auto"
                    onClick={() => setShowMoreSkills(!showMoreSkills)}
                    whileHover={{ scale: 1.03 }}
                  >
                    <span>{showMoreSkills ? '▲ Collapse' : '▼ Show All'}</span>
                    <span className="text-xs bg-dark-700 px-2 py-1 rounded-full">
                      {getFilteredSkills().length} skills
                    </span>
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
            
            {/* Timeline Section */}
            <motion.div variants={itemVariants}>
              <SectionTitle 
                title="My Journey" 
                subtitle="Professional milestones"
                className="mb-10"
              />
              
              <Timeline 
                items={experiencesData}
                variants={itemVariants}
              />
            </motion.div>

          </motion.div>
        )}
      </section>
    </PageTransition>
  );
};

export default About;