import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  centered = false 
}) => {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold gradient-text red-glow mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-dark-100 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;