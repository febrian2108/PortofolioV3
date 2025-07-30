import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getSkills } from '../services/supabase'
import SkillCategorization from '../components/SkillCategorization'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('view')
  const [selectedSkills, setSelectedSkills] = useState([])

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const { data, error } = await getSkills()
      if (error) {
        console.error('Error fetching skills:', error)
      } else {
        setSkills(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSkillsChange = (newSkills) => {
    setSelectedSkills(newSkills)
  }

  const displaySkills = skills

  const categories = [...new Set(displaySkills.map(skill => skill.category))]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto space-y-16"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants} 
            className="text-center space-y-4"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-gray-900"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: "linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b, #8b5cf6)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              My Skills
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Technologies and tools I use to bring ideas to life
            </motion.p>
          </motion.div>

          {/* Tabs for View/Add Skills */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="view">View Skills</TabsTrigger>
                <TabsTrigger value="add">Add Skills</TabsTrigger>
              </TabsList>
              
              <TabsContent value="view" className="mt-8">
                {/* Skills by Category */}
                <div className="space-y-12">
                  {categories.map((category, categoryIndex) => (
                    <motion.div
                      key={category}
                      variants={categoryVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-4">
                        <motion.h2 
                          className="text-2xl font-bold text-gray-900"
                          whileHover={{ scale: 1.05, color: "#8b5cf6" }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {category}
                        </motion.h2>
                        <motion.div 
                          className="flex-1 h-px bg-gray-300"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          style={{ originX: 0 }}
                        />
                      </div>
                      
                      <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {displaySkills
                          .filter(skill => skill.category === category)
                          .map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              variants={cardVariants}
                              whileHover={{ 
                                scale: 1.1, 
                                y: -10,
                                rotateY: 5,
                                transition: { type: "spring", stiffness: 300 }
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="group perspective-1000"
                            >
                              <Card className="h-full hover:shadow-xl transition-all duration-500 group-hover:border-purple-300 bg-white/80 backdrop-blur-sm transform-gpu">
                                <CardContent className="p-6 flex flex-col items-center space-y-4">
                                  <motion.div 
                                    className="w-16 h-16 flex items-center justify-center"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                  >
                                    <img 
                                      src={skill.image} 
                                      alt={skill.name}
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                      }}
                                    />
                                    <motion.div 
                                      className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg items-center justify-center text-white font-bold text-lg hidden"
                                      whileHover={{ scale: 1.1 }}
                                    >
                                      {skill.name.charAt(0)}
                                    </motion.div>
                                  </motion.div>
                                  
                                  <div className="text-center">
                                    <motion.h3 
                                      className="font-semibold text-gray-900 text-sm"
                                      whileHover={{ color: "#8b5cf6" }}
                                    >
                                      {skill.name}
                                    </motion.h3>
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                    >
                                      <Badge variant="secondary" className="mt-1 text-xs">
                                        {skill.category}
                                      </Badge>
                                    </motion.div>
                                  </div>
                                  
                                  {skill.description && (
                                    <motion.p 
                                      className="text-xs text-gray-600 text-center line-clamp-2"
                                      initial={{ opacity: 0 }}
                                      whileHover={{ opacity: 1 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {skill.description}
                                    </motion.p>
                                  )}
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="add" className="mt-8">
                <SkillCategorization 
                  onSkillsChange={handleSkillsChange}
                  initialSkills={selectedSkills}
                />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            variants={itemVariants} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Skills

