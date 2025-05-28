import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter, Instagram } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import PageTransition from '../components/PageTransition';
import SkeletonLoader from '../components/SkeletonLoader';
import LinkTransition from '../components/LinkTransition';

const socialLinks = [
  { 
    icon: <Github className="w-5 h-5" />, 
    url: 'https://github.com/rugveddanej', 
    label: 'GitHub' 
  },
  { 
    icon: <Instagram className="w-5 h-5" />, 
    url: 'https://instagram.com/_rugved_danej_', 
    label: 'Instagram' 
  },
  { 
    icon: <FaXTwitter className="w-5 h-5" />, 
    url: 'https://twitter.com/_rugved_danej_', 
    label: 'Twitter' 
  }
];

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = "I create captivating digital solutions through clean code and innovative design. Specializing in full stack development with an emphasis on performance, security, and scalability for diverse applications.";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }
  }, [loading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <PageTransition>
      <section className="section-container flex flex-col justify-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        {loading ? (
          <div className="space-y-8">
            <SkeletonLoader type="title" />
            <SkeletonLoader type="text" count={2} />
            <div className="flex space-x-4">
              <div className="h-10 w-36 bg-dark-700 rounded-full shimmer" />
              <div className="h-10 w-36 bg-dark-700 rounded-full shimmer" />
            </div>
            <div className="flex space-x-4">
              <div className="h-10 w-10 bg-dark-700 rounded-full shimmer" />
              <div className="h-10 w-10 bg-dark-700 rounded-full shimmer" />
              <div className="h-10 w-10 bg-dark-700 rounded-full shimmer" />
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl relative"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hello, I'm <span className="gradient-text red-glow">Rugved Danej</span>
              </h1>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Full-Stack Developer
              </h2>
              
              <p className="text-dark-100 text-lg md:text-xl mb-8 leading-relaxed min-h-[96px]">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 bg-primary-600 ml-1"
                />
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Link 
                  to="/projects"
                  className="group relative overflow-hidden flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full transition-all duration-300"
                >
                  <span className="relative z-10">View My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary-500 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <Link 
                  to="/contact"
                  className="group relative overflow-hidden flex items-center gap-2 bg-dark-800 hover:bg-dark-700 text-white border border-dark-700 hover:border-primary-600 px-6 py-3 rounded-full transition-all duration-300"
                >
                  <span>Contact Me</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex gap-4"
            >
              {socialLinks.map((link, index) => (
                <LinkTransition
                  key={index}
                  href={link.url}
                  label={link.label}
                >
                  {link.icon}
                </LinkTransition>
              ))}
            </motion.div>
          </motion.div>
        )}
      </section>
    </PageTransition>
  );
};

export default Home;