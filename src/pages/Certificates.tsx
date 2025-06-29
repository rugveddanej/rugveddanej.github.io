import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import CertificateCard from '../components/CertificateCard';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import certificatesData from '../data/certificates';

const Certificates: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [certificates, setCertificates] = useState(certificatesData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filteredCertificates = certificatesData.filter((certificate) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        certificate.title.toLowerCase().includes(searchLower) ||
        certificate.issuer.toLowerCase().includes(searchLower) ||
        certificate.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    });

    setCertificates(filteredCertificates);
  }, [searchQuery]);

  return (
    <PageTransition>
      <section className="section-container">
        <SectionTitle 
          title="Certificates & Courses" 
          subtitle="A collection of my professional certifications and completed courses"
          centered
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search certificates by title, issuer, or skills..."
          />
        </motion.div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader type="project" count={3} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </section>
    </PageTransition>
  );
};

export default Certificates;
