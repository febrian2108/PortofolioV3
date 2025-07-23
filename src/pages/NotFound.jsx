import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0.8, 1, 0.9, 1],
      x: [0, -2, 2, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut"
      }
    }
  }

  const textShadowVariants = {
    animate: {
      textShadow: [
        "0 0 0 transparent",
        "2px 0 0 #ff0000, -2px 0 0 #00ff00",
        "0 0 0 transparent",
        "1px 0 0 #0000ff, -1px 0 0 #ffff00",
        "0 0 0 transparent"
      ],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 dengan efek glitch menggunakan framer-motion */}
          <div className="space-y-4">
            <motion.h1
              variants={glitchVariants}
              initial="hidden"
              animate="visible"
              className="text-8xl lg:text-9xl font-bold text-white relative"
              style={{
                fontFamily: 'monospace',
                filter: 'contrast(1.2) brightness(1.1)'
              }}
            >
              <motion.span
                variants={textShadowVariants}
                animate="animate"
                className="relative z-10"
              >
                404
              </motion.span>
            </motion.h1>
            
            <motion.h2
              variants={glitchVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl text-gray-300 font-mono"
            >
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1, 0.8, 1],
                  scale: [1, 1.02, 1, 0.98, 1]
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                NOT FOUND
              </motion.span>
            </motion.h2>
          </div>

          {/* Deskripsi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-lg text-gray-400 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound

