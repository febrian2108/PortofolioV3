import { useState, useEffect } from 'react'
import { useAuth } from '../context/SupabaseContext'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, Edit, Trash2, User, LogOut, Eye, ExternalLink, Github } from 'lucide-react'
import ProjectForm from '../components/ProjectForm'
import SkillForm from '../components/SkillForm'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from '../services/supabase'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingProject, setEditingProject] = useState(null)
  const [editingSkill, setEditingSkill] = useState(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showSkillForm, setShowSkillForm] = useState(false)
  const [newSkill, setNewSkill] = useState({
    name: '',
    skill_category: 'Other',
    description: '',
    icon_url: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projectsResult, skillsResult] = await Promise.all([
        getProjects(),
        getSkills()
      ])

      if (projectsResult.error) {
        setError(projectsResult.error.message)
      } else {
        setProjects(projectsResult.data || [])
      }

      if (skillsResult.error) {
        setError(skillsResult.error.message)
      } else {
        setSkills(skillsResult.data || [])
      }
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (projectData) => {
    try {
      const { data, error } = await createProject({
        ...projectData,
        user_id: user.id
      })

      if (error) {
        setError(error.message)
      } else {
        setProjects([...projects, data[0]])
        setShowProjectForm(false)
      }
    } catch (err) {
      setError('Failed to create project')
    }
  }

  const handleUpdateProject = async (projectData) => {
    try {
      const { data, error } = await updateProject(editingProject.id, projectData)

      if (error) {
        setError(error.message)
      } else {
        setProjects(projects.map(p => p.id === editingProject.id ? data[0] : p))
        setEditingProject(null)
      }
    } catch (err) {
      setError('Failed to update project')
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      const { error } = await deleteProject(id)

      if (error) {
        setError(error.message)
      } else {
        setProjects(projects.filter(p => p.id !== id))
      }
    } catch (err) {
      setError('Failed to delete project')
    }
  }

  const handleCreateSkill = async (skillData) => {
    try {
      const { data, error } = await createSkill({
        ...skillData,
        user_id: user.id
      })

      if (error) {
        setError(error.message)
      } else {
        setSkills([...skills, data[0]])
        setShowSkillForm(false)
      }
    } catch (err) {
      setError('Failed to create skill')
    }
  }

  const handleUpdateSkill = async (skillData) => {
    try {
      const { data, error } = await updateSkill(editingSkill.id, skillData)

      if (error) {
        setError(error.message)
      } else {
        setSkills(skills.map(s => s.id === editingSkill.id ? data[0] : s))
        setEditingSkill(null)
      }
    } catch (err) {
      setError('Failed to update skill')
    }
  }

  const handleDeleteSkill = async (id) => {
    try {
      const { error } = await deleteSkill(id)

      if (error) {
        setError(error.message)
      } else {
        setSkills(skills.filter(s => s.id !== id))
      }
    } catch (err) {
      setError('Failed to delete skill')
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.email}
                </h1>
                <p className="text-gray-600">Manage your portfolio content</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Projects ({projects.length})</CardTitle>
                  <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setShowProjectForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                      </DialogHeader>
                      <ProjectForm
                        onSave={handleCreateProject}
                        onCancel={() => setShowProjectForm(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-xl">{project.title}</h3>
                            {project.featured && (
                              <Badge variant="default">Featured</Badge>
                            )}
                            {project.project_status && (
                              <Badge variant="outline">{project.project_status}</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{project.description}</p>
                          
                          {project.long_description && (
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                              {project.long_description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies?.map((tech, index) => (
                              <Badge key={index} variant="secondary">
                                {tech.trim()}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {project.category && (
                              <span>Category: {project.category}</span>
                            )}
                            {project.client_name && (
                              <span>Client: {project.client_name}</span>
                            )}
                            {project.start_date && (
                              <span>Started: {new Date(project.start_date).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          {project.github_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-1" />
                                Code
                              </a>
                            </Button>
                          )}
                          {project.link_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.link_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Live
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProject(project)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      {project.image && (
                        <div className="mt-4">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {projects.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No projects yet</p>
                      <Button onClick={() => setShowProjectForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Project
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Edit Project Dialog */}
            {editingProject && (
              <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                  </DialogHeader>
                  <ProjectForm
                    project={editingProject}
                    onSave={handleUpdateProject}
                    onCancel={() => setEditingProject(null)}
                  />
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Skills ({skills.length})</CardTitle>
                  <Dialog open={showSkillForm} onOpenChange={setShowSkillForm}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setShowSkillForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Skill</DialogTitle>
                      </DialogHeader>
                      <SkillForm
                        onSave={async (skillData) => {
                          await handleCreateSkill(skillData)
                        }}
                        onCancel={() => setShowSkillForm(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Skills grouped by category */}
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    const category = skill.skill_category || 'Other'
                    if (!acc[category]) acc[category] = []
                    acc[category].push(skill)
                    return acc
                  }, {})
                ).map(([category, categorySkills]) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      {category === 'Web Development' && '🌐'}
                      {category === 'Mobile Development' && '📱'}
                      {category === 'AI/ML & Data Science' && '🤖'}
                      {category === 'Backend Development' && '⚙️'}
                      {category === 'Database & Cloud' && '☁️'}
                      {category === 'DevOps & Tools' && '🛠️'}
                      {category === 'Other' && '📋'}
                      {category} ({categorySkills.length})
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {skill.icon_url && (
                                <img 
                                  src={skill.icon_url} 
                                  alt={skill.name}
                                  className="w-6 h-6 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                  }}
                                />
                              )}
                              <h4 className="font-semibold">{skill.name}</h4>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingSkill(skill)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSkill(skill.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          {skill.description && (
                            <p className="text-sm text-gray-600">{skill.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {skills.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No skills yet</p>
                    <Button onClick={() => setShowSkillForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Skill
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Edit Skill Dialog */}
            {editingSkill && (
              <Dialog open={!!editingSkill} onOpenChange={() => setEditingSkill(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Skill</DialogTitle>
                  </DialogHeader>
                  <SkillForm
                    skill={editingSkill}
                    onSave={handleUpdateSkill}
                    onCancel={() => setEditingSkill(null)}
                  />
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Dashboard

