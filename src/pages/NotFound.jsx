import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full blur-xl"></div>
          <div className="relative w-24 h-24 mx-auto bg-white dark:bg-surface-800 rounded-full flex items-center justify-center shadow-neu-light dark:shadow-neu-dark">
            <span className="text-6xl font-bold text-primary">4</span>
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center absolute -top-2 -right-2">
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center absolute -bottom-2 -left-2">
              <span className="text-3xl font-bold text-white">4</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 btn btn-primary"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
      </div>
    </motion.div>
  )
}

export default NotFound