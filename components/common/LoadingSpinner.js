import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-8 h-8 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full"
      aria-label="Loading Spinner"
    />
  );
}

export default LoadingSpinner;