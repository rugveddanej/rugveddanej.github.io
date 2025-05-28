import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Mail, MoreHorizontal, MessageSquareText, MessageSquareCode, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useDragControls, PanInfo } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { path: '/about', label: 'About', icon: <User className="w-5 h-5" /> },
  { path: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
];

const moreMenuItems = [
  { 
    path: '/testimonials', 
    label: 'Testimonials', 
    icon: <MessageSquareText className="w-5 h-5" />,
    description: 'What people say about working with me'
  },
  { 
    path: '/feedback', 
    label: 'Feedback', 
    icon: <MessageSquareCode className="w-5 h-5" />,
    description: 'Technical feedback from clients'
  },
  { 
    path: '/certificates', 
    label: 'Certificates', 
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Certifications & Achievements'
  },
];

// Haptic feedback simulation
const simulateHapticFeedback = (type = 'light') => {
  if (navigator.vibrate) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 10, 10],
      error: [100, 50, 100]
    };
    navigator.vibrate(patterns[type] || patterns.light);
  }
};

// Advanced magnetic interaction hook
const useMagneticEffect = (strength = 0.2) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x, y, handleMouseMove, handleMouseLeave };
};

// Advanced ripple effect
const useRippleEffect = () => {
  const [ripples, setRipples] = useState([]);

  const createRipple = useCallback((event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random()
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  return { ripples, createRipple };
};

// Gesture recognition hook
const useGestureRecognition = (onSwipeUp, onSwipeDown) => {
  const startY = useRef(0);
  const startTime = useRef(0);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    startTime.current = Date.now();
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const endTime = Date.now();
    const deltaY = startY.current - endY;
    const deltaTime = endTime - startTime.current;
    
    if (deltaTime < 300 && Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        onSwipeUp?.();
      } else {
        onSwipeDown?.();
      }
    }
  };

  return { handleTouchStart, handleTouchEnd };
};

const AdvancedNavItem = ({ item, isActive, onClick }) => {
  const magnetic = useMagneticEffect(0.15);
  const { ripples, createRipple } = useRippleEffect();
  const scale = useSpring(1, { stiffness: 400, damping: 17 });
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e) => {
    createRipple(e);
    simulateHapticFeedback('light');
    onClick?.(e);
  };

  return (
    <motion.div
      ref={magnetic.ref}
      style={{ x: magnetic.x, y: magnetic.y, scale }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={magnetic.handleMouseLeave}
      onTapStart={() => {
        setIsPressed(true);
        scale.set(0.95);
      }}
      onTap={() => {
        setIsPressed(false);
        scale.set(1);
      }}
      onTapCancel={() => {
        setIsPressed(false);
        scale.set(1);
      }}
      className="relative overflow-hidden"
    >
      <NavLink
        to={item.path}
        onClick={handleClick}
        className={`nav-item relative ${isActive ? 'active' : 'text-dark-100 hover:text-white'}`}
      >
        <motion.div
          animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
        <motion.span 
          className="text-xs mt-1"
          animate={isActive ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {item.label}
        </motion.span>
        
        {/* Advanced ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
        
        {/* Active indicator with morphing animation */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary-500 rounded-full"
              layoutId="activeIndicator"
              initial={{ scale: 0, x: "-50%" }}
              animate={{ 
                scale: [1, 1.5, 1], 
                x: "-50%",
                boxShadow: ["0 0 0px rgba(59, 130, 246, 0.5)", "0 0 8px rgba(59, 130, 246, 0.8)", "0 0 0px rgba(59, 130, 246, 0.5)"]
              }}
              exit={{ scale: 0, x: "-50%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </NavLink>
    </motion.div>
  );
};

const AdvancedMoreButton = ({ onClick, isActive, showMenu }) => {
  const magnetic = useMagneticEffect(0.2);
  const { ripples, createRipple } = useRippleEffect();
  const rotate = useSpring(0, { stiffness: 300, damping: 20 });
  const scale = useSpring(1, { stiffness: 400, damping: 17 });

  useEffect(() => {
    rotate.set(showMenu ? 135 : 0);
  }, [showMenu, rotate]);

  const handleClick = (e) => {
    createRipple(e);
    simulateHapticFeedback('medium');
    onClick(e);
  };

  return (
    <motion.div
      ref={magnetic.ref}
      style={{ x: magnetic.x, y: magnetic.y, scale }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={magnetic.handleMouseLeave}
      onTapStart={() => scale.set(0.9)}
      onTap={() => scale.set(1)}
      onTapCancel={() => scale.set(1)}
      className="relative overflow-hidden"
    >
      <button
        onClick={handleClick}
        className={`nav-item relative text-dark-100 hover:text-white ${isActive ? 'active' : ''}`}
      >
        <motion.div style={{ rotate }}>
          {showMenu ? <X className="w-5 h-5" /> : <MoreHorizontal className="w-5 h-5" />}
        </motion.div>
        <span className="text-xs mt-1">More</span>
        
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
        
        {/* Pulsing indicator when menu is open */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="absolute inset-0 border border-primary-500/50 rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1], 
                opacity: [0, 0.6, 0.3],
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

const AdvancedMoreMenu = ({ isOpen, onClose, items }) => {
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 100], [1, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  const gestureHandlers = useGestureRecognition(null, onClose);

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: 15,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -30,
      rotateY: -15
    },
    visible: { 
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0,
      x: 30,
      rotateY: 15,
      transition: {
        duration: 0.15
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Advanced backdrop with blur and grain effect */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/80 z-40"
            onClick={onClose}
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`
            }}
          />
          
          {/* Enhanced modal container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ y, opacity }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            {...gestureHandlers}
          >
            <div className="w-full max-w-md bg-dark-800/95 backdrop-blur-xl rounded-2xl p-6 border border-dark-700/50 shadow-2xl relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                    radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                    backgroundSize: "24px 24px, 16px 16px"
                  }}
                />
              </div>

              {/* Drag indicator */}
              <motion.div 
                className="w-10 h-1 bg-dark-600 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing"
                animate={isDragging ? { scaleY: 1.5 } : { scaleY: 1 }}
                onPointerDown={(e) => dragControls.start(e)}
              />
              
              {/* Header with advanced typography */}
              <motion.h2 
                className="text-xl font-semibold mb-6 gradient-text text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              >
                Explore More
              </motion.h2>
              
              {/* Menu items with advanced interactions */}
              <motion.div 
                className="space-y-3"
                variants={modalVariants}
              >
                {items.map((item, i) => (
                  <motion.div
                    key={item.path}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      x: 8,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        simulateHapticFeedback('success');
                        onClose();
                      }}
                      className={({ isActive }) =>
                        `flex items-start gap-4 p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                          isActive
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                            : 'hover:bg-dark-700/80 backdrop-blur-sm'
                        }`
                      }
                    >
                      {/* Hover effect background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      
                      {/* Icon container with morphing effect */}
                      <motion.div 
                        className="p-2 bg-dark-700/50 rounded-lg relative z-10 group-hover:bg-dark-600/50 transition-colors duration-300"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        {item.icon}
                      </motion.div>
                      
                      {/* Content with staggered animation */}
                      <div className="relative z-10 flex-1">
                        <motion.h3 
                          className="font-medium mb-1"
                          layoutId={`title-${item.path}`}
                        >
                          {item.label}
                        </motion.h3>
                        <motion.p 
                          className="text-sm text-dark-100 group-hover:text-dark-50 transition-colors duration-300"
                          initial={{ opacity: 0.7 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {item.description}
                        </motion.p>
                      </div>
                      
                      {/* Arrow indicator */}
                      <motion.div
                        className="text-dark-400 group-hover:text-dark-200 transition-colors duration-300"
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        →
                      </motion.div>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Close button with magnetic effect */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [navScale, setNavScale] = useState(1);
  const isMoreActive = moreMenuItems.some(item => item.path === location.pathname);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Advanced scroll detection with scale effect
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;
      const scrollDiff = Math.abs(scrollY - lastScrollY);
      
      if (scrollDiff > 5) {
        setNavScale(scrollY > lastScrollY ? 0.95 : 1);
        lastScrollY = scrollY;
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showMoreMenu) {
        setShowMoreMenu(false);
        simulateHapticFeedback('light');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showMoreMenu]);

  return (
    <>
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 backdrop-blur-lg bg-opacity-90 z-50"
        style={{ scale: navScale }}
        animate={{ scale: navScale }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => (
              <AdvancedNavItem
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
              />
            ))}
            
            <AdvancedMoreButton
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              isActive={isMoreActive}
              showMenu={showMoreMenu}
            />
          </div>
        </div>
      </motion.nav>

      <AdvancedMoreMenu
        isOpen={showMoreMenu}
        onClose={() => setShowMoreMenu(false)}
        items={moreMenuItems}
      />
    </>
  );
};

export default Navbar;