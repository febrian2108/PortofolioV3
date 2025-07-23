import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const About = () => {
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

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const slideInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const experiences = [
    {
      title: "Coding Camp 2025 Powered By DBS Foundation",
      company: "Dicoding",
      period: "Feb 2025 - Jul 2025",
      description: `
      - Selected as one of the cohort members among thousands of applicants for the 5 month frontend backend program. 
      - Involved in live projects involving Service Oriented Programming in loading web to solve existing problems. 
      - Collaborate on a capstone project with the machine learning team. 
      - Develop technical and non-technical skills, including communication, problem solving, and teamwork in a professional development environment.
      `
    },
    {
      title: "Mentor of Technocrat's AI Programming division",
      company: "Technocrat Indonesia Student Activity Unit for Programming",
      period: "Sep 2024 - Feb 2025",
      description: `
      - Participated in various national-level competitions, including Hackathons
      - Assisted in conducting AI training to teach new students the fundamentals of Python programming.
      - Develop learning resources for new students
      `
    },
    {
      title: "Head of Infrastructure Facilities",
      company: "Technocrat Indonesia Student Activity Unit for Programming",
      period: "Jan 2024 - Feb 2025",
      description: `
      - Maintain, inventory, and ensure that UKM equipment is in good condition. 
      - Collaborate with other committee members and the university to fulfill facility needs. 
      - Prepare and ensure equipment is ready for use during UKM activities. 
      - Record equipment usage and report facility conditions to the committee.
      `
    },
    {
      title: "Fullstack Golang & AI by Ruangguru CAMP",
      company: "Ruangguru",
      period: "Sep 2024 - Dec 2024",
      description: `
      - Participant in the Independent Study program (MSIB Batch 7) at Ruangguru Fullstack Development with Golang & AI
      - Worked on designing and developing end to end solutions using javascript for frontend and Golang for backend services. 
      - Enhanced skills in software development, database management, and teamwork. 
      - Collaborated with a team of industry professionals to deliver high - quality, scalable applications. 
      - Enhanced skills in software development, database management, and teamwork. 
      - Collaborated with a team of industry professionals to deliver high-quality, scalable applications.
      `
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-16"
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
                background: "linear-gradient(45deg, #1f2937, #3b82f6, #8b5cf6, #1f2937)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              About Me
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Passionate developer with a love for creating digital experiences
              that make a difference.
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h2
                  className="text-3xl font-bold text-gray-900"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  My Story
                </motion.h2>
                <motion.div
                  className="space-y-4 text-gray-600 leading-relaxed text-justify"
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
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    I am a Software Engineering student with a strong interest in software development, particularly using JavaScript and Golang. I have participated in various professional development programs such as Ruangguru CAMP and Coding Camp 2025, supported by the DBS Foundation. I was involved in real-world projects, building comprehensive solutions, and working in cross-disciplinary professional teams.
                  </motion.p>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    I am also active in student organizations as a Mentor for the AI Programming Division and Head of Facilities & Infrastructure, where I honed my leadership, management, and collaboration skills. Through these experiences, I remain committed to creating impactful and sustainable technology solutions for both the community and the industry.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              {/* Profile Image Placeholder */}
              <motion.div
                className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/foto-profile/Foto-Profile-Fahri-Febrian.png"
                  alt="Foto-Profile-Fahri-Febrian"
                  className="w-full h-full object-cover rounded-2xl shadow-lg z-10 relative"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div
            variants={scaleIn}
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
              Experience
            </motion.h2>
            <motion.div
              className="space-y-6"
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
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 12
                      }
                    }
                  }}
                  className="relative"
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <motion.h3
                          className="text-xl font-bold text-gray-900"
                          whileHover={{ color: "#3b82f6" }}
                        >
                          {exp.title}
                        </motion.h3>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Badge variant="secondary">{exp.period}</Badge>
                        </motion.div>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-600 whitespace-pre-line">{exp.description}</p>
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

export default About

