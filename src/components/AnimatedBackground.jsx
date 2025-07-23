import { motion } from 'framer-motion'

const AnimatedBackground = ({ children, variant = 'default' }) => {
  const variants = {
    default: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      particles: 50
    },
    dark: {
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      particles: 30
    },
    light: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      particles: 40
    }
  }

  const currentVariant = variants[variant]

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: currentVariant.background }}>
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(currentVariant.particles)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            <div 
              className="w-20 h-20 border-2 border-white/30"
              style={{
                borderRadius: i % 2 === 0 ? '50%' : '0%',
                transform: `scale(${Math.random() * 2 + 0.5})`
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default AnimatedBackground

