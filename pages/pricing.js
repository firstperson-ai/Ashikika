import MotionButton from '../components/common/MotionButton';
import { motion } from 'framer-motion';

function PricingPage() {
  const plans = [
    { name: 'Basic', price: 0, features: ['1 ATS-Optimized Resume', 'Free Download', 'Email Support'], popular: false },
    { name: 'Pro', price: 99, features: ['1 ATS-Optimized Resume', 'PDF Download', 'Priority Support', 'ATS Score Tracking'], popular: true },
    { name: 'Premium', price: 189, features: ['3 ATS-Optimized Resumes', 'PDF Downloads', 'Priority Support', 'ATS Score Tracking'], popular: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delay: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold mb-12 gradient-text text-center"
          aria-label="Pricing Plans"
        >
          Pricing Plans
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(74, 144, 226, 0.3)' }}
              className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 ${plan.popular ? 'ring-4 ring-blue-500' : ''}`}
            >
              <h3 className="text-2xl font-semibold mb-4 gradient-text text-center">{plan.name}</h3>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">₹{plan.price} <span className="text-lg text-gray-600 dark:text-gray-400">/ {plan.name === 'Basic' ? 'Forever' : 'Month'}</span></p>
              <ul className="space-y-4 mb-6 text-gray-700 dark:text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95, rotate: -2 }}
                className="text-center"
              >
                <MotionButton
                  onClick={() => alert(`Purchasing ${plan.name} plan for ₹${plan.price}`)} // Mock for preview
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-all duration-200 rounded-xl shadow-md hover:shadow-lg p-2 px-6 py-3`}
                  aria-label={`Purchase ${plan.name} Plan`}
                >
                  Get Started
                </MotionButton>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PricingPage;