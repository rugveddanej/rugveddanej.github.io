import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import CertificateCard from '../components/CertificateCard';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { CertificateProps } from '../components/CertificateCard';

// API service with better error handling and typing
const certificatesAPI = {
  baseURL: 'https://rugvedapi.onrender.com/api',
  
  async fetchCertificates(): Promise<CertificateProps[]> {
    try {
      const response = await fetch(`${this.baseURL}/certificates`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        return result.data.map((cert: any) => ({
          ...cert,
          // Ensure all required fields are present
          id: cert.id || 0,
          title: cert.title || '',
          issuer: cert.issuer || '',
          issueDate: cert.issueDate || '',
          credentialUrl: cert.credentialUrl || '',
          image: cert.image || '',
          skills: Array.isArray(cert.skills) ? cert.skills : [],
          description: cert.description || '',
          hours: cert.hours || 0,
          verified: cert.verified || false
        }));
      }
      throw new Error(result.error || 'Invalid data format received');
    } catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  }
};

const Certificates: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [certificates, setCertificates] = useState<CertificateProps[]>([]);
  const [allCertificates, setAllCertificates] = useState<CertificateProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetch function
  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await certificatesAPI.fetchCertificates();
      
      setAllCertificates(data);
      setCertificates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load certificates');
      console.error('Failed to load certificates:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch certificates from API
  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  // Filter certificates based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setCertificates(allCertificates);
      return;
    }

    const searchLower = searchQuery.toLowerCase();
    const filteredCertificates = allCertificates.filter((certificate) => {
      return (
        certificate.title.toLowerCase().includes(searchLower) ||
        certificate.issuer.toLowerCase().includes(searchLower) ||
        certificate.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    });

    setCertificates(filteredCertificates);
  }, [searchQuery, allCertificates]);

  // Error state component
  const renderErrorState = () => (
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
          className="text-center py-12"
        >
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-red-800 dark:text-red-400 font-semibold mb-2">
              Failed to Load Certificates
            </h3>
            <p className="text-red-600 dark:text-red-300 text-sm">
              {error}
            </p>
            <button 
              onClick={fetchCertificates}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );

  // Loading state component
  const renderLoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonLoader type="project" count={3} />
    </div>
  );

  // Empty state component
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full text-center py-12"
    >
      <div className="text-gray-500 dark:text-gray-400">
        <p className="text-lg font-medium mb-2">No certificates found</p>
        <p className="text-sm">
          {searchQuery ? 'Try adjusting your search terms.' : 'No certificates available at the moment.'}
        </p>
      </div>
    </motion.div>
  );

  // Main content component
  const renderContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {certificates.length === 0 ? 
        renderEmptyState() : 
        certificates.map((certificate, index) => (
          <CertificateCard
            key={`${certificate.id}-${index}`}
            certificate={certificate}
            index={index}
          />
        ))
      }
    </motion.div>
  );

  if (error && !loading) {
    return renderErrorState();
  }

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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certificates by title, issuer, or skills..."
            disabled={loading}
          />
        </motion.div>
        
        {loading ? renderLoadingState() : renderContent()}
      </section>
    </PageTransition>
  );
};

export default Certificates;