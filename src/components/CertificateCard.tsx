import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Calendar, Award, Clock, Share2, Download, Eye, EyeOff } from 'lucide-react';

export interface CertificateProps {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl: string;
  image: string;
  skills: string[];
  description?: string;
  credentialId?: string;
  hours?: number;
  verified?: boolean;
}

interface CertificateCardProps {
  certificate: CertificateProps;
  index: number;
  onShare?: (certificate: CertificateProps) => void;
  onDownload?: (certificate: CertificateProps) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ 
  certificate, 
  index,
  onShare,
  onDownload 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]));
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setShowActions(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const isExpired = certificate.expiryDate && new Date(certificate.expiryDate) < new Date();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setShowActions(true)}
      className="relative bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-600 transition-all duration-500 group cursor-pointer"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(139, 92, 246, 0.1)"
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Front of card */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative backface-hidden"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {/* Status indicators */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {certificate.verified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-green-600/20 border border-green-500 rounded-full p-1.5"
            >
              <Award className="w-3 h-3 text-green-400" />
            </motion.div>
          )}
          {isExpired && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-red-600/20 border border-red-500 rounded-full p-1.5"
            >
              <Clock className="w-3 h-3 text-red-400" />
            </motion.div>
          )}
        </div>

        {/* Action buttons */}
        <motion.div
          animate={{ 
            opacity: showActions ? 1 : 0,
            scale: showActions ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 right-3 z-10 flex gap-2"
        >
          {onShare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(certificate);
              }}
              className="bg-dark-900/80 backdrop-blur-sm border border-dark-600 rounded-full p-2 hover:bg-primary-600/20 hover:border-primary-500 transition-all"
            >
              <Share2 className="w-3 h-3 text-dark-100" />
            </button>
          )}
          {onDownload && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(certificate);
              }}
              className="bg-dark-900/80 backdrop-blur-sm border border-dark-600 rounded-full p-2 hover:bg-primary-600/20 hover:border-primary-500 transition-all"
            >
              <Download className="w-3 h-3 text-dark-100" />
            </button>
          )}
        </motion.div>

        {/* Image container with loading state */}
        <div className="relative overflow-hidden aspect-video bg-dark-700">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full"
              />
            </div>
          )}
          <motion.img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
        </div>
        
        <div className="p-6 relative">
          {/* Title with truncation */}
          <motion.h3 
            className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors"
            layoutId={`title-${certificate.id}`}
          >
            {certificate.title}
          </motion.h3>
          
          <motion.p 
            className="text-dark-100 mb-4 font-medium"
            layoutId={`issuer-${certificate.id}`}
          >
            {certificate.issuer}
          </motion.p>
          
          {/* Date information */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-dark-100 text-sm">
              <Calendar className="w-4 h-4 text-primary-500" />
              <span>Issued: {formatDate(certificate.issueDate)}</span>
            </div>
            
            {certificate.expiryDate && (
              <div className="flex items-center gap-2 text-dark-100 text-sm">
                <Clock className={`w-4 h-4 ${isExpired ? 'text-red-400' : 'text-primary-500'}`} />
                <span className={isExpired ? 'text-red-400' : ''}>
                  {isExpired ? 'Expired' : 'Expires'}: {formatDate(certificate.expiryDate)}
                </span>
              </div>
            )}
            
            {certificate.hours && (
              <div className="flex items-center gap-2 text-dark-100 text-sm">
                <Clock className="w-4 h-4 text-primary-500" />
                <span>{certificate.hours} hours</span>
              </div>
            )}
          </div>
          
          {/* Skills with animation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {certificate.skills.slice(0, 4).map((skill, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                className="text-xs bg-dark-700 text-dark-100 px-3 py-1.5 rounded-full border border-dark-600 hover:border-primary-600 hover:bg-primary-600/10 transition-all"
              >
                {skill}
              </motion.span>
            ))}
            {certificate.skills.length > 4 && (
              <span className="text-xs bg-dark-700 text-dark-100 px-3 py-1.5 rounded-full border border-dark-600">
                +{certificate.skills.length - 4}
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-white bg-primary-600 hover:bg-primary-700 px-4 py-2.5 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Certificate</span>
            </a>
            
            <button
              className="flex items-center gap-2 text-sm text-dark-100 hover:text-primary-400 transition-colors"
            >
              {isFlipped ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isFlipped ? 'Front' : 'Details'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Back of card */}
      <motion.div
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="absolute inset-0 backface-hidden p-6 bg-dark-800"
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
        }}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary-400">Certificate Details</h3>
            <button
              onClick={() => setIsFlipped(false)}
              className="text-dark-100 hover:text-primary-400 transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {certificate.description && (
              <div>
                <h4 className="text-sm font-semibold text-dark-100 mb-2">Description</h4>
                <p className="text-sm text-dark-200 leading-relaxed">{certificate.description}</p>
              </div>
            )}
            
            {certificate.credentialId && (
              <div>
                <h4 className="text-sm font-semibold text-dark-100 mb-2">Credential ID</h4>
                <p className="text-sm text-dark-200 font-mono bg-dark-700 px-3 py-2 rounded border">{certificate.credentialId}</p>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-semibold text-dark-100 mb-2">All Skills ({certificate.skills.length})</h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-dark-700 text-dark-100 px-2 py-1 rounded border border-dark-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-dark-700">
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-white bg-primary-600 hover:bg-primary-700 px-4 py-2.5 rounded-lg transition-all w-full"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Full Certificate</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificateCard;