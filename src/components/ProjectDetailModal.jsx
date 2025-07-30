import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react'

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!project) return null

  // Mock multiple images for demonstration - in real app, this would come from project data
  const projectImages = [
    project.image || '/project-image/default.png',
    '/project-image/screenshot1.png',
    '/project-image/screenshot2.png',
    '/project-image/screenshot3.png'
  ].filter(Boolean)

  // Mock skills used in project - in real app, this would come from project data
  const projectSkills = project.technologies?.map(tech => ({
    name: tech,
    icon: getSkillIcon(tech),
    category: getSkillCategory(tech)
  })) || []

  function getSkillIcon(skillName) {
    const iconMap = {
      'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      'Dart': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
      'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    }
    return iconMap[skillName] || 'https://via.placeholder.com/32x32?text=' + skillName.charAt(0)
  }

  function getSkillCategory(skillName) {
    const categoryMap = {
      'JavaScript': 'Web Development',
      'TypeScript': 'Web Development',
      'React': 'Web Development',
      'Vue.js': 'Web Development',
      'Angular': 'Web Development',
      'Node.js': 'Backend Development',
      'Python': 'AI/ML & Data Science',
      'Flutter': 'Mobile Development',
      'Dart': 'Mobile Development',
      'Java': 'Backend Development',
      'HTML5': 'Web Development',
      'CSS3': 'Web Development',
      'Tailwind CSS': 'Web Development',
      'Bootstrap': 'Web Development',
      'MySQL': 'Database & Cloud',
      'PostgreSQL': 'Database & Cloud',
      'MongoDB': 'Database & Cloud',
      'Docker': 'DevOps & Tools',
      'Git': 'DevOps & Tools'
    }
    return categoryMap[skillName] || 'Other'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  }

  const imageVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {project.title}
                </DialogTitle>
              </DialogHeader>

              {/* Image Gallery */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Project Gallery</h3>
                <div className="relative">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-video bg-gray-100">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImageIndex}
                            src={projectImages[currentImageIndex]}
                            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            onError={(e) => {
                              e.target.src = '/project-image/default.png'
                            }}
                          />
                        </AnimatePresence>
                        
                        {/* Navigation Arrows */}
                        {projectImages.length > 1 && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                              onClick={prevImage}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                              onClick={nextImage}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        {/* Image Counter */}
                        {projectImages.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                            {currentImageIndex + 1} / {projectImages.length}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Thumbnail Navigation */}
                  {projectImages.length > 1 && (
                    <div className="flex space-x-2 mt-4 overflow-x-auto">
                      {projectImages.map((image, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-blue-500 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/project-image/default.png'
                            }}
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">About This Project</h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description || 'No description available for this project.'}
                </p>
                {project.long_description && (
                  <p className="text-gray-600 leading-relaxed">
                    {project.long_description}
                  </p>
                )}
              </div>

              {/* Skills Used */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span>🛠️</span>
                  Technologies Used
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {projectSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3 flex items-center space-x-3">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-8 h-8"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs hidden">
                            {skill.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {skill.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {skill.category}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex flex-wrap gap-4 pt-4 border-t">
                {project.github_url && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Source Code
                      </a>
                    </Button>
                  </motion.div>
                )}
                {project.Link_url && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild>
                      <a href={project.Link_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default ProjectDetailModal

