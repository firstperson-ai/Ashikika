import { useState } from 'react';
import { useSupabase } from '../../utils/supabase';
import ResumeEditor from '../../components/resume/ResumeEditor';
import ATSScoreMeter from '../../components/resume/ATSScoreMeter';
import PaymentModal from '../../components/payment/PaymentModal';
import MotionButton from '../../components/common/MotionButton';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function ResumeBuilderPage() {
  const { user } = useSupabase();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [resumeData, setResumeData] = useState({ content: '' });
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptimize = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/optimize-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resumeData.content, jobDescription }),
      });
      if (!response.ok) throw new Error('Failed to optimize resume');
      const { optimizedResume, atsScore } = await response.json();
      setResumeData({ ...resumeData, content: optimizedResume });
      setScore(atsScore);
    } catch (error) {
      setError('Preview mode: Optimization failed (mock data used).');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const hasActive = true; // Mock active subscription for preview
      if (!hasActive) setShowPaymentModal(true);
      else {
        setScore(85); // Mock ATS score on download
        const blob = new Blob(['Your ATS-optimized resume PDF (Preview Mode)'], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ats-optimized-resume-preview.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      setError('Preview mode: Download failed (mock data used).');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-8"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-red-500 mb-4 bg-red-100 dark:bg-red-900 p-4 rounded-xl"
          role="alert"
        >
          {error}
        </motion.div>
      )}
      <div className="mb-12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mb-6"
        >
          <button
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = (event) => setResumeData({ ...resumeData, content: event.target.result });
              reader.readAsText(file);
            }}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 rounded-xl p-4 w-full font-semibold shadow-md hover:shadow-lg"
            aria-label="Upload Resume"
          >
            Upload Resume
          </button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mb-6"
        >
          <textarea
            value={jobDescription}
            placeholder="Paste your job description here to optimize... (Preview Mode)"
            rows={5}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300"
            aria-label="Job Description Input"
          />
        </motion.div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <MotionButton
            onClick={handleOptimize}
            className="w-full"
            aria-label="Optimize Resume with AI (Preview)"
          >
            Optimize Resume with AI (Preview)
          </MotionButton>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} onOptimize={handleOptimize} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/3"
        >
          <ATSScoreMeter score={score} />
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
            className="mt-8"
          >
            <MotionButton
              onClick={handleDownload}
              className="w-full"
              aria-label="Download ATS-Optimized PDF (Preview)"
            >
              Download ATS-Optimized PDF (Preview)
            </MotionButton>
          </motion.div>
          {showPaymentModal && (
            <PaymentModal
              onClose={() => setShowPaymentModal(false)}
              onSuccess={() => {
                setScore(90); // Mock score on payment success
                handleDownload(); // Trigger mock download
              }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function WrappedResumeBuilderPage() {
  return <DashboardLayout><ResumeBuilderPage /></DashboardLayout>;
}