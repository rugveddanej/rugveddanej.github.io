import React from 'react';
import { motion } from 'framer-motion';

interface SkillItemProps {
  name: string;
  level: number;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ name, level, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-white font-medium">{name}</span>
        <span className="text-dark-100 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-dark-700 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          className="h-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
        ></motion.div>
      </div>
    </motion.div>
  );
};

interface SkillsProps {
  skills: Array<{ name: string; level: number }>;
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map((skill, index) => (
        <SkillItem
          key={skill.name}
          name={skill.name}
          level={skill.level}
          index={index}
        />
      ))}
    </div>
  );
};

export default Skills;