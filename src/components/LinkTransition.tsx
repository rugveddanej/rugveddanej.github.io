import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Loader2, ExternalLink, ArrowUpRight, Zap, Globe, Lock } from 'lucide-react';

interface LinkTransitionProps {
  href: string;
  children: React.ReactNode;
  label: string;
  variant?: 'default' | 'glow' | 'magnetic' | 'ripple' | 'portal';
  loadingDuration?: number;
  openInNewTab?: boolean;
  showPreview?: boolean;
  customLoadingIcon?: React.ReactNode;
  onLoadingStart?: () => void;
  onLoadingComplete?: () => void;
  className?: string;
  disabled?: boolean;
  requiresAuth?: boolean;
  customPath?: string; // New prop for custom URL path
}

const LinkTransition: React.FC<LinkTransitionProps> = ({
  href,
  children,
  label,
  variant = 'default',
  loadingDuration = 1800,
  openInNewTab = true,
  showPreview = false,
  customLoadingIcon,
  onLoadingStart,
  onLoadingComplete,
  className = '',
  disabled = false,
  requiresAuth = false,
  customPath
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  // Magnetic effect springs
  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  
  // Transform springs for smooth animations
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

const generateCustomUrl = useCallback((targetHref: string, popupLabel: string) => {
  if (customPath) {
    return customPath;
  }
  
  // Keep URL lowercase
  const sanitizedLabel = popupLabel
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return sanitizedLabel;
}, [customPath]);

  // Enhanced loading popup with custom URL path
  const createAdvancedPopup = useCallback((targetHref: string, popupLabel: string) => {
    const customUrl = generateCustomUrl(targetHref, popupLabel);
    
    const popup = window.open(
      customUrl,
      '_blank',
      `width=700,height=500,left=${Math.max(0, window.innerWidth / 2 - 350)},top=${Math.max(0, window.innerHeight / 2 - 250)},scrollbars=no,resizable=yes,status=no,toolbar=no`
    );

    if (!popup) {
      // Fallback if popup is blocked
      window.open(targetHref, openInNewTab ? '_blank' : '_self');
      return;
    }

    const isSecure = targetHref.startsWith('https://');
    const domain = new URL(targetHref).hostname;

    // Wait for the popup to load, then write the content
    setTimeout(() => {
      try {
        popup.document.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Opening ${popupLabel}</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                
                body {
                  height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                  color: white;
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  overflow: hidden;
                }
                
                .container {
                  text-align: center;
                  position: relative;
                  z-index: 10;
                }
                
                .glow-orb {
                  position: absolute;
                  width: 300px;
                  height: 300px;
                  background: radial-gradient(circle, rgba(229, 57, 53, 0.3) 0%, transparent 70%);
                  border-radius: 50%;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  animation: pulse 2s ease-in-out infinite;
                }
                
                .spinner-container {
                  position: relative;
                  width: 80px;
                  height: 80px;
                  margin: 0 auto 30px;
                }
                
                .spinner {
                  width: 60px;
                  height: 60px;
                  border: 3px solid rgba(255, 255, 255, 0.1);
                  border-top: 3px solid #E53935;
                  border-radius: 50%;
                  animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                
                .spinner-outer {
                  width: 80px;
                  height: 80px;
                  border: 2px solid rgba(229, 57, 53, 0.2);
                  border-radius: 50%;
                  animation: spin 2s linear infinite reverse;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                
                .title {
                  font-size: 24px;
                  font-weight: 600;
                  margin-bottom: 12px;
                  background: linear-gradient(45deg, #ffffff, #cccccc);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
                
                .subtitle {
                  font-size: 14px;
                  color: #888;
                  margin-bottom: 20px;
                }
                
                .domain-info {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                  font-size: 12px;
                  color: #666;
                  margin-top: 20px;
                }
                
                .security-badge {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  padding: 4px 8px;
                  border-radius: 12px;
                  background: ${isSecure ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
                  color: ${isSecure ? '#22c55e' : '#ef4444'};
                  font-size: 10px;
                }
                
                .progress-bar {
                  width: 200px;
                  height: 2px;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 1px;
                  margin: 20px auto 0;
                  overflow: hidden;
                }
                
                .progress-fill {
                  height: 100%;
                  background: linear-gradient(90deg, #E53935, #ff6b6b);
                  border-radius: 1px;
                  animation: progress ${loadingDuration}ms linear;
                }

                .url-display {
                  position: absolute;
                  top: 20px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: rgba(255, 255, 255, 0.1);
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  border-radius: 20px;
                  padding: 8px 16px;
                  font-size: 12px;
                  color: #ccc;
                  font-family: 'JetBrains Mono', 'Courier New', monospace;
                }
                
                @keyframes spin {
                  to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                @keyframes pulse {
                  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                  50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
                }
                
                @keyframes progress {
                  from { width: 0%; }
                  to { width: 100%; }
                }
                
                .particles {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  pointer-events: none;
                }
                
                .particle {
                  position: absolute;
                  width: 2px;
                  height: 2px;
                  background: #E53935;
                  border-radius: 50%;
                  animation: float 3s linear infinite;
                }
                
                @keyframes float {
                  0% {
                    opacity: 0;
                    transform: translateY(100vh) scale(0);
                  }
                  10% {
                    opacity: 1;
                    transform: translateY(90vh) scale(1);
                  }
                  90% {
                    opacity: 1;
                    transform: translateY(10vh) scale(1);
                  }
                  100% {
                    opacity: 0;
                    transform: translateY(0) scale(0);
                  }
                }
              </style>
            </head>
            <body>
              <div class="url-display">${customUrl}</div>
              <div class="glow-orb"></div>
              <div class="particles" id="particles"></div>
              
              <div class="container">
                <div class="spinner-container">
                  <div class="spinner-outer"></div>
                  <div class="spinner"></div>
                </div>
                
                <h1 class="title">Opening ${popupLabel.charAt(0).toUpperCase() + popupLabel.slice(1)}</h1>
                <p class="subtitle">Preparing secure connection...</p>
                
                <div class="domain-info">
                  <span>${domain}</span>
                  <div class="security-badge">
                    ${isSecure ? '🔒' : '🔓'} ${isSecure ? 'Secure' : 'Unsecure'}
                  </div>
                </div>
                
                <div class="progress-bar">
                  <div class="progress-fill"></div>
                </div>
              </div>
              
              <script>
                // Create floating particles
                function createParticle() {
                  const particle = document.createElement('div');
                  particle.className = 'particle';
                  particle.style.left = Math.random() * 100 + '%';
                  particle.style.animationDelay = Math.random() * 3 + 's';
                  document.getElementById('particles').appendChild(particle);
                  
                  setTimeout(() => {
                    particle.remove();
                  }, 3000);
                }
                
                // Generate particles
                setInterval(createParticle, 200);
                
                // Navigate after loading
                setTimeout(() => {
                  try {
                    window.location.href = '${targetHref}';
                  } catch (error) {
                    document.querySelector('.title').textContent = 'Redirecting...';
                    window.location.href = '${targetHref}';
                  }
                }, ${loadingDuration});
                
                // Handle popup close
                window.addEventListener('beforeunload', () => {
                  if (window.opener) {
                    try {
                      window.opener.postMessage('popup-closed', '*');
                    } catch (e) {}
                  }
                });
              </script>
            </body>
          </html>
        `);
        popup.document.close();
      } catch (error) {
        // If we can't write to the popup (e.g., cross-origin issues), redirect immediately
        popup.location.href = targetHref;
      }
    }, 100);
  }, [loadingDuration, openInNewTab, generateCustomUrl]);

  // Handle mouse movement for magnetic effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || variant !== 'magnetic') return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      x.set(deltaX * force * 0.3);
      y.set(deltaY * force * 0.3);
    }
    
    setMousePosition({ x: deltaX, y: deltaY });
  }, [variant, x, y]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPreviewVisible(false);
    if (variant === 'magnetic') {
      x.set(0);
      y.set(0);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [variant, x, y]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (showPreview) {
      timeoutRef.current = setTimeout(() => {
        setIsPreviewVisible(true);
      }, 500);
    }
  }, [showPreview]);

  // Handle click with ripple effect
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (disabled) return;
    
    // Create ripple effect
    if (variant === 'ripple' && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipplePosition({ x, y });
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }
    
    setIsLoading(true);
    onLoadingStart?.();
    
    // Simulate auth check if required
    if (requiresAuth) {
      setTimeout(() => {
        createAdvancedPopup(href, label);
        setTimeout(() => {
          setIsLoading(false);
          onLoadingComplete?.();
        }, loadingDuration + 500);
      }, 800);
    } else {
      createAdvancedPopup(href, label);
      setTimeout(() => {
        setIsLoading(false);
        onLoadingComplete?.();
      }, loadingDuration + 500);
    }
  }, [disabled, variant, href, label, requiresAuth, loadingDuration, onLoadingStart, onLoadingComplete, createAdvancedPopup]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Variant-specific styles and animations
  const getVariantStyles = () => {
    const baseStyles = "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300";
    
    switch (variant) {
      case 'glow':
        return `${baseStyles} bg-gray-900 border border-gray-700 shadow-lg hover:shadow-red-500/25 hover:shadow-2xl`;
      case 'magnetic':
        return `${baseStyles} bg-gray-800 border border-gray-600 hover:border-red-500`;
      case 'ripple':
        return `${baseStyles} bg-gray-900 border border-gray-700 overflow-hidden`;
      case 'portal':
        return `${baseStyles} bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600`;
      default:
        return `${baseStyles} bg-dark-800 hover:bg-primary-600 text-dark-100 hover:text-white border border-dark-700`;
    }
  };

  const getMotionProps = () => {
    const baseProps = {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
    };

    switch (variant) {
      case 'magnetic':
        return {
          ...baseProps,
          style: { x, y, rotateX, rotateY },
          whileHover: { scale: 1.1 }
        };
      case 'portal':
        return {
          ...baseProps,
          whileHover: { 
            scale: 1.1,
            rotateX: 5,
            rotateY: 5,
            transition: { type: "spring", stiffness: 300 }
          }
        };
      default:
        return baseProps;
    }
  };

  return (
    <div className="relative">
      <motion.a
        ref={buttonRef}
        href={href}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${getVariantStyles()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        aria-label={label}
        {...getMotionProps()}
      >
        {/* Glow effect */}
        {variant === 'glow' && isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500 opacity-20 blur-xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.3 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Ripple effect */}
        {variant === 'ripple' && showRipple && (
          <motion.div
            className="absolute rounded-full bg-red-500 opacity-30"
            style={{
              left: ripplePosition.x - 20,
              top: ripplePosition.y - 20,
              width: 40,
              height: 40
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}

        {/* Portal effect background */}
        {variant === 'portal' && isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #E53935, #ff6b6b, #E53935)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Content with loading state */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
              className="absolute inset-0 flex items-center justify-center"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {customLoadingIcon || (
                <div className="relative">
                  <Loader2 className="w-6 h-6 animate-spin text-red-400" />
                  {requiresAuth && (
                    <Lock className="w-3 h-3 absolute -top-1 -right-1 text-yellow-400" />
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
              className="relative z-10"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {children}
              {isHovered && variant === 'default' && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <ArrowUpRight className="w-3 h-3 text-red-400" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>

      {/* Preview tooltip */}
      <AnimatePresence>
        {isPreviewVisible && showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap shadow-xl z-50"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-gray-400" />
              <span>{label}</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LinkTransition;