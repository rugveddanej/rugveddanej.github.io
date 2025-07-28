import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import CertificateCard from '../components/CertificateCard';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { loadCertificatesFromApi } from '../data/certificates';
import { CertificateProps } from '../components/CertificateCard';

const Certificates: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [certificates, setCertificates] = useState<CertificateProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setLoading(true);
        setError(null);
        const certificatesData = await loadCertificatesFromApi();
        setCertificates(certificatesData);
      } catch (err) {
        console.error('Failed to load certificates:', err);
        setError('Failed to load certificates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadCertificates();
  }, []);

  useEffect(() => {
    const filteredCertificates = certificates.filter((certificate) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        certificate.title.toLowerCase().includes(searchLower) ||
        certificate.issuer.toLowerCase().includes(searchLower) ||
        certificate.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    });

    // Only update if we're not loading and have certificates
    if (!loading && certificates.length > 0) {
      setCertificates(filteredCertificates);
    }
  }, [searchQuery, certificates, loading]);

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
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-red-400 font-semibold mb-2">Error Loading Certificates</h3>
              <p className="text-red-300 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-100">No certificates found matching your search.</p>
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
