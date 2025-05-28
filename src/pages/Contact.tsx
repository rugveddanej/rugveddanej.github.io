import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Calendar, MessageCircle, Globe, Zap, User, Coffee } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import SkeletonLoader from '../components/SkeletonLoader';

// Animated floating particles background
const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Social Proof Component
const SocialProof: React.FC = () => {
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);

  useEffect(() => {
    const calculateExperienceYears = (startDate: string): number => {
      const start = new Date(startDate);
      const now = new Date();
      return now.getFullYear() - start.getFullYear() + 
             (now.getMonth() - start.getMonth()) / 12;
    };

    setYearsOfExperience(parseFloat(calculateExperienceYears('2020-07-31').toFixed(1)));
  }, []);

  const stats = [
    { number: "15+", label: "Projects Completed" },
    { number: "10+", label: "Happy Clients" },
    { number: `${yearsOfExperience}+`, label: "Years Experience" },
    { number: "48h", label: "Avg Response Time" }
  ];

  return (
    <div className="bg-gradient-to-r from-dark-800 to-dark-700 rounded-lg p-6 border border-dark-600 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary-500 mb-1">
              {stat.number}
            </div>
            <div className="text-dark-100 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
      <section className="section-container relative">
        <FloatingParticles />
        
        <SectionTitle 
          title="Contact Me" 
          subtitle="Ready to bring your ideas to life? I'm here to help you create something amazing"
          centered
        />
        
        {loading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-dark-800 rounded-lg p-6 shimmer">
                  <div className="h-10 w-10 rounded-full bg-dark-700 mb-4"></div>
                  <div className="h-5 bg-dark-700 rounded w-20 mb-2"></div>
                  <div className="h-4 bg-dark-700 rounded w-40"></div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <SkeletonLoader type="title" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <SkeletonLoader type="text" />
                <SkeletonLoader type="text" />
              </div>
              <SkeletonLoader type="text" count={2} />
            </div>
          </div>
        ) : (
          <>
            <SocialProof />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            </div>
            
            <div className="grid grid-cols-1">
              <div className="bg-dark-800 rounded-lg p-8 border border-dark-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent"></div>
                <div className="relative">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Send me a message</h3>
                    <p className="text-dark-100">
                      I'm always interested in hearing about new projects and opportunities. 
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </PageTransition>
  );
};

export default Contact;