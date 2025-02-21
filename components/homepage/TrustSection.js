import { motion } from 'framer-motion';

function TrustSection() {
  const logos = ['/logos/amazon.svg', '/logos/google.svg', '/logos/flipkart.svg'];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delay: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-16 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-12 gradient-text"
          aria-label="Trusted by Top Companies"
        >
          Trusted by Top Companies
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-12">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="w-20 h-20 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <img src={logo} alt={`Logo ${index + 1}`} className="w-full h-full object-contain" aria-label={`Trusted by ${logo.split('/').pop().split('.')[0]}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default TrustSection;