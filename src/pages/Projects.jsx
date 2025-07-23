import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import { getProjects } from '../services/supabase'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await getProjects()
      if (error) {
        console.error('Error fetching projects:', error)
      } else {
        setProjects(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const displayProjects = projects

  const categories = ['All', ...new Set(displayProjects.map(project => project.category))]
  
  const filteredProjects = filter === 'All' 
    ? displayProjects 
    : displayProjects.filter(project => project.category === filter)

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16 overflow-hidden">
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
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: "linear-gradient(45deg, #10b981, #3b82f6, #6366f1, #10b981)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              My Projects
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              A showcase of my recent work and personal projects
            </motion.p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            variants={filterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className="transition-all duration-300 hover:shadow-lg"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Projects */}
          {filter === 'All' && (
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-900 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Featured Projects
              </motion.h2>
              <motion.div 
                className="grid lg:grid-cols-2 gap-8"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {displayProjects
                  .filter(project => project.featured)
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      variants={cardVariants}
                      whileHover={{ 
                        scale: 1.03,
                        y: -10,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      className="group perspective-1000"
                    >
                      <Card className="h-full hover:shadow-2xl transition-all duration-500 overflow-hidden transform-gpu">
                        <motion.div 
                          className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div 
                            className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"
                            animate={{
                              background: [
                                "linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))",
                                "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))",
                                "linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))"
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <div className="absolute bottom-4 left-4">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Badge className="bg-white/20 text-white border-white/30">
                                Featured
                              </Badge>
                            </motion.div>
                          </div>
                        </motion.div>
                        <CardHeader>
                          <motion.div
                            whileHover={{ color: "#3b82f6" }}
                            transition={{ duration: 0.2 }}
                          >
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                          </motion.div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <motion.p 
                            className="text-gray-600"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {project.description}
                          </motion.p>
                          
                          <motion.div 
                            className="flex flex-wrap gap-2"
                            variants={{
                              hidden: {},
                              visible: {
                                transition: {
                                  staggerChildren: 0.05
                                }
                              }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                          >
                            {project.technologies.map((tech, index) => (
                              <motion.div
                                key={tech}
                                variants={{
                                  hidden: { opacity: 0, scale: 0.8 },
                                  visible: { opacity: 1, scale: 1 }
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <Badge variant="secondary">
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </motion.div>
                          
                          <div className="flex space-x-4 pt-4">
                            {project.github_url && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button variant="outline" size="sm" asChild>
                                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4 mr-2" />
                                    Code
                                  </a>
                                </Button>
                              </motion.div>
                            )}
                            {project.Link_url && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button size="sm" asChild>
                                  <a href={project.Link_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Live Demo
                                  </a>
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          )}

          {/* All Projects Grid */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {filter === 'All' ? 'All Projects' : `${filter} Projects`}
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group perspective-1000"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-500 overflow-hidden transform-gpu">
                    <motion.div 
                      className="aspect-video bg-gradient-to-br from-gray-400 to-gray-600 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"
                        animate={{
                          background: [
                            "linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))",
                            "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))",
                            "linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </motion.div>
                    <CardHeader>
                      <motion.div
                        whileHover={{ color: "#3b82f6" }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.p 
                        className="text-gray-600 text-sm line-clamp-3"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {project.description}
                      </motion.p>
                      
                      <motion.div 
                        className="flex flex-wrap gap-1"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.03
                            }
                          }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Badge variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                        {project.technologies.length > 3 && (
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          </motion.div>
                        )}
                      </motion.div>
                      
                      <div className="flex space-x-2 pt-2">
                        {project.github_url && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                <Github className="h-3 w-3" />
                              </a>
                            </Button>
                          </motion.div>
                        )}
                        {project.Link_url && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button size="sm" asChild>
                              <a href={project.Link_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects

