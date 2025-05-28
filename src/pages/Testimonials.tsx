import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Code2, Calendar, Award, TrendingUp, Quote } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SkeletonLoader from '../components/SkeletonLoader';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  message: string;
  rating: number;
  image: string;
  project: string;
  projectType: 'web' | 'api' | 'bot';
  completionDate: string;
  technologies: string[];
  impact: {
    metric: string;
    value: string;
  };
  longMessage?: string;
  onTimeDelivery: boolean;
}

// Custom Star Component for fractional ratings
const FractionalStar: React.FC<{
  fillPercentage: number;
  size?: string;
  index?: number;
  animationDelay?: number;
}> = ({ fillPercentage, size = "w-4 h-4", index = 0, animationDelay = 0 }) => {
  const clipId = `star-clip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: animationDelay, type: "spring", stiffness: 200 }}
      className="relative inline-block"
    >
      <svg className={`${size}`} viewBox="0 0 24 24" fill="none">
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={`${fillPercentage}%`} height="100%" />
          </clipPath>
        </defs>

        {/* Background star (unfilled) */}
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="rgba(21,21,21,255)"
          stroke="rgba(34,34,34,255)"
          strokeWidth="1"
        />
        
        {/* Filled star (clipped based on percentage) */}
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="rgba(238,68,68,255)"
          stroke="rgba(238,68,68,255)"
          strokeWidth="1"
          clipPath={`url(#${clipId})`}
        />
      </svg>
    </motion.div>
  );
};

// Star Rating Component
const StarRating: React.FC<{
  rating: number;
  size?: string;
  showAnimation?: boolean;
  animationDelay?: number;
}> = ({ rating, size = "w-4 h-4", showAnimation = true, animationDelay = 0 }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    let fillPercentage = 0;

    if (rating > i) {
      if (rating >= i + 1) {
        fillPercentage = 100;
      } else {
        fillPercentage = (rating - i) * 100;
      }
    }

    stars.push(
      <FractionalStar
        key={i}
        fillPercentage={fillPercentage}
        size={size}
        index={i}
        animationDelay={showAnimation ? animationDelay + i * 0.05 : 0}
      />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Luna Foster",
    position: "Project Manager",
    message: "Rugved turned our vision for a dynamic blogging platform into a sleek, high-performing product. His precision and technical skill made the process seamless and the outcome exceptional.",
    longMessage: "Rugved brought our idea of a feature-rich blogging platform to life with remarkable professionalism. His technical skills in React, Node.js, and MongoDB were instrumental in creating a smooth, responsive experience. He was proactive, always open to feedback, and delivered every milestone on time. Post-launch, we saw a +180% increase in user engagement—clear proof of the platform’s impact. Working with Rugved was a seamless and rewarding experience.",
    rating: 5.0,
    image: "https://images.pexels.com/photos/32046486/pexels-photo-32046486.jpeg",
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

const projectTypeIcons = {
  web: Code2,
  api: Code2,
  bot: Code2
};

const Testimonials: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Testimonial['projectType']>('all');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter testimonials
  const filteredTestimonials = testimonials.filter(
    testimonial => filter === 'all' || testimonial.projectType === filter
  );

  // Calculate statistics based on filtered testimonials
  const calculateStats = (testimonialsToCalculate: Testimonial[]) => {
    const totalTestimonials = testimonialsToCalculate.length;
    if (totalTestimonials === 0) {
      return {
        satisfactionRate: 0,
        happyClients: 0,
        averageRating: "0.0",
        onTimeDeliveryRate: 0
      };
    }

    const totalRating = testimonialsToCalculate.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    const averageRating = totalRating / totalTestimonials;

    const satisfactionRate = Math.round((averageRating / 5) * 100);
    const happyClients = testimonialsToCalculate.filter(t => t.rating >= 4).length;
    const onTimeDeliveryCount = testimonialsToCalculate.filter(t => t.onTimeDelivery).length;
    const onTimeDeliveryRate = Math.round((onTimeDeliveryCount / totalTestimonials) * 100);

    return {
      satisfactionRate,
      happyClients,
      averageRating: averageRating.toFixed(1),
      onTimeDeliveryRate
    };
  };

  const stats = calculateStats(filteredTestimonials);

  // Advanced animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 2,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    }
  };

  const ProjectTypeIcon = ({ type }: { type: Testimonial['projectType'] }) => {
    const Icon = projectTypeIcons[type];
    return <Icon className="w-4 h-4 sm:w-5 sm:h-5" />;
  };

  const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 bg-dark-700 p-2 sm:p-3 rounded-lg"
    >
      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-xs text-dark-100 truncate">{label}</div>
        <div className="font-semibold text-primary-400 text-sm truncate">{value}</div>
      </div>
    </motion.div>
  );

  return (
    <PageTransition>
      <section className="min-h-screen bg-dark-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Client Testimonials" 
            subtitle="Hear what our clients have to say about their experience working with us"
            centered
          />

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8"
          >
            {(['all', 'web', 'api', 'bot'] as const).map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(type)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  filter === type
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-dark-100 hover:bg-dark-600'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <SkeletonLoader type="text" count={6} />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-dark-800 p-4 sm:p-6 rounded-xl border border-dark-700 hover:border-primary-600 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                  onClick={() => setExpandedCard(expandedCard === testimonial.id ? null : testimonial.id)}
                >
                  {/* Subtle background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quote Icon */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-600/20 transform rotate-180" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-primary-600/20 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base truncate text-white">{testimonial.name}</h3>
                        <p className="text-xs sm:text-sm text-dark-100 truncate">
                          {testimonial.position}{testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-primary-600 min-w-0 flex-1">
                        <ProjectTypeIcon type={testimonial.projectType} />
                        <span className="text-xs sm:text-sm font-medium truncate">{testimonial.project}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <StarRating 
                        rating={testimonial.rating} 
                        size="w-3 h-3 sm:w-4 sm:h-4"
                        animationDelay={index * 0.1}
                      />
                    </div>
                    
                    <motion.p 
                      className="text-dark-100 mb-4 text-sm sm:text-base leading-relaxed"
                      animate={{
                        height: expandedCard === testimonial.id ? 'auto' : 'auto'
                      }}
                    >
                      {expandedCard === testimonial.id && testimonial.longMessage 
                        ? testimonial.longMessage 
                        : testimonial.message}
                    </motion.p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      <StatCard icon={Calendar} label="Completed" value={new Date(testimonial.completionDate).toLocaleDateString()} />
                      <StatCard icon={TrendingUp} label={testimonial.impact.metric} value={testimonial.impact.value} />
                    </div>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {testimonial.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-dark-700 text-xs rounded-md text-dark-200 truncate"
                        >
                          {tech}
                        </span>
                      ))}
                      {testimonial.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-primary-600/20 text-xs rounded-md text-primary-400">
                          +{testimonial.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {/* Expand indicator */}
                    {testimonial.longMessage && (
                      <div className="text-center mt-3">
                        <span className="text-xs text-primary-400">
                          {expandedCard === testimonial.id ? 'Click to collapse' : 'Click to read more'}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

{/* Client Satisfaction Stats Section */}
<motion.div 
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="mt-16 sm:mt-20 bg-dark-800 border border-dark-700 rounded-2xl p-6 sm:p-8"
>
  <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white">Client Satisfaction</h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors"
    >
      <div className="text-2xl sm:text-3xl font-bold text-primary-500 mb-2">{stats.satisfactionRate}%</div>
      <div className="text-sm sm:text-base text-dark-100">Satisfaction Rate</div>
    </motion.div>
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors"
    >
      <div className="text-2xl sm:text-3xl font-bold text-primary-500 mb-2">{stats.happyClients}+</div>
      <div className="text-sm sm:text-base text-dark-100">Happy Clients</div>
    </motion.div>
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors"
    >
      <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">{stats.averageRating}</div>
      <div className="text-sm sm:text-base text-dark-100">Average Rating</div>
    </motion.div>
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors"
    >
      <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">{stats.onTimeDeliveryRate}%</div>
      <div className="text-sm sm:text-base text-dark-100">On-Time Delivery</div>
    </motion.div>
  </div>
</motion.div>
            </div>
      </section>
    </PageTransition>
  );
};

export default Testimonials;