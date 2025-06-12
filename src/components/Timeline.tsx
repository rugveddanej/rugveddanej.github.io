import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineItemProps {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItemProps[];
}

const TimelineItem: React.FC<{ item: TimelineItemProps; index: number }> = ({ 
  item, 
  index 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8 relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-600"
    >
      <div className="absolute left-0 top-1.5 w-3 h-3 bg-primary-600 rounded-full transform -translate-x-1/2 z-10"></div>
      <div className="mb-1 text-xs text-dark-100 font-semibold uppercase tracking-wider">
        {item.period}
      </div>
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <div className="text-primary-500 mb-2">{item.organization}</div>
      <p className="text-dark-100">{item.description}</p>
    </motion.div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default Timeline;