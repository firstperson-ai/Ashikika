import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';

function ProfilePage() {
  const mockUser = { email: 'user@example.com', name: 'John Doe' };
  const mockSubscriptions = [{ plan: 'Pro', active: true, created_at: new Date().toISOString() }];
  const mockResumes = [
    { name: 'Sample Resume 1', atsScore: 85, created_at: new Date().toISOString() },
    { name: 'Sample Resume 2', atsScore: 92, created_at: new Date().toISOString() },
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
      className="p-8"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text" aria-label="User Profile">User Profile</h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-800 dark:text-white"><strong>Name:</strong> {mockUser.name}</p>
            <p className="text-lg text-gray-800 dark:text-white"><strong>Email:</strong> {mockUser.email}</p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text" aria-label="Subscriptions">Subscriptions</h2>
          {mockSubscriptions.length > 0 ? (
            <div className="space-y-4">
              {mockSubscriptions.map((subscription, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md"
                >
                  <p className="text-lg text-gray-800 dark:text-white"><strong>Plan:</strong> {subscription.plan}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Status:</strong> {subscription.active ? 'Active' : 'Inactive'}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Started:</strong> {new Date(subscription.created_at).toLocaleDateString()}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No active subscriptions.</p>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text" aria-label="Resume History">Resume History</h2>
          {mockResumes.length > 0 ? (
            <div className="space-y-4">
              {mockResumes.map((resume, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(74, 144, 226, 0.3)' }}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <p className="text-lg text-gray-800 dark:text-white"><strong>Resume:</strong> {resume.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><strong>ATS Score:</strong> {resume.atsScore}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Created:</strong> {new Date(resume.created_at).toLocaleDateString()}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No resumes created yet.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function WrappedProfilePage() {
  return <DashboardLayout><ProfilePage /></DashboardLayout>;
}