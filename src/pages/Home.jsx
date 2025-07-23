import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import CompanyLogos from '../components/CompanyLogos'
import AnimatedBackground from '../components/AnimatedBackground'
import { FadeInSection, SlideInSection, ParallaxSection } from '../components/ScrollAnimations'
import { HoverCard, FloatingButton, TypewriterText, MagneticButton, GlowEffect } from '../components/InteractiveElements'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin, Mail, Download, Code } from 'lucide-react'

const Model = () => {
  const gltf = useGLTF('/logo/coba-coba1.glb')
  return <primitive object={gltf.scene} scale={0.5} />
}

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Hi, I'm{' '}
                <motion.span
                  className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Fahri Febrian
                </motion.span>
              </h4>

              <TypewriterText
                text="Software Engineer Student "
                className="text-2xl lg:text-3xl text-gray-300 font-light"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              I craft digital experiences that blend beautiful design with powerful functionality.
              Passionate about creating solutions that make a difference.
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute center-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <a href="/cv-fahri-febrian/CV_Fahri Febriandika Pamungkas_MagangBerdampak.pdf">
                <MagneticButton className="group">
                  <GlowEffect>
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg">
                      <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      Download CV
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </GlowEffect>
                </MagneticButton>
              </a>

              <a href="/Projects">
                <MagneticButton>
                  <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                    <Code className="mr-2 h-4 w-4" />
                    View Projects
                  </Button>
                </MagneticButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex space-x-6"
            >
              {[
                { icon: Github, href: "https://github.com/febrian2108", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/fahri-febriandika-pamungkas/", label: "LinkedIn" },
                { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=febrian2104@gmail.com", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Scene */}
          <div className="w-screen h-screen">
            <Canvas camera={{ position: [25, 10, 10], fov: 20 }}>
              <Suspense fallback={null}>
                <Model scale={2} />
                <OrbitControls enableZoom={true} />
                <Environment preset="studio" />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* Stats Section */}
        <FadeInSection>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "3+", label: "Years Experience" },
              { number: "20+", label: "Happy Clients" },
              { number: "100%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center"
              >
                <HoverCard>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <motion.div
                      className="text-3xl font-bold text-white mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </motion.div>
        </FadeInSection>

        {/* Company Logos Section */}
        <SlideInSection direction="up">
          <div className="mt-10">
            <CompanyLogos />
          </div>
        </SlideInSection>
      </div>
    </div>
  )
}

export default Home

