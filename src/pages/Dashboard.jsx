import { useState, useEffect } from 'react'
import { useAuth } from '../context/SupabaseContext'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, Edit, Trash2, User, LogOut, Save, X } from 'lucide-react'
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
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    link_url: '',
    image: ''
  })
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    level: 'Beginner',
    description: ''
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

  const handleCreateProject = async () => {
    try {
      const technologies = newProject.technologies.split(',').map((tech) => tech.trim() )

      const { data, error } = await createProject({
        ...newProject,
        technologies,
        user_id: user.id
      })

      if (error) {
        setError(error.message)
      } else {
        setProjects([...projects, data[0]])
        setNewProject({
          title: '',
          description: '',
          technologies: '',
          github_url: '',
          link_url: '',
          image: ''
        })
      }
    } catch (err) {
      setError('Failed to create project')
    }
  }

  const handleUpdateProject = async (id, updates) => {
    try {
      const { data, error } = await updateProject(id, updates)

      if (error) {
        setError(error.message)
      } else {
        setProjects(projects.map(p => p.id === id ? data[0] : p))
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

  const handleCreateSkill = async () => {
    try {
      const { data, error } = await createSkill({
        ...newSkill,
        user_id: user.id
      })

      if (error) {
        setError(error.message)
      } else {
        setSkills([...skills, data[0]])
        setNewSkill({
          name: '',
          category: '',
          level: 'Beginner',
          description: ''
        })
      }
    } catch (err) {
      setError('Failed to create skill')
    }
  }

  const handleUpdateSkill = async (id, updates) => {
    try {
      const { data, error } = await updateSkill(id, updates)

      if (error) {
        setError(error.message)
      } else {
        setSkills(skills.map(s => s.id === id ? data[0] : s))
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
                  <CardTitle>Projects</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 box-border">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="technologies">Technologies</Label>
                          <Input
                            id="technologies"
                            value={newProject.technologies}
                            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>
                        <div>
                          <Label htmlFor="github_url">GitHub URL</Label>
                          <Input
                            id="github_url"
                            value={newProject.github_url}
                            onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="link_url">Link URL</Label>
                          <Input
                            id="link_url"
                            value={newProject.link_url}
                            onChange={(e) => setNewProject({ ...newProject, link_url: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            value={newProject.image}
                            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>

                        <Button onClick={handleCreateProject} className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          Save Project
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <p className="text-gray-600 mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies?.map((tech, index) => (
                              <Badge key={index} variant="secondary">
                                {tech.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProject(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Skills</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Skill</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="skill-name">Name</Label>
                          <Input
                            id="skill-name"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                            placeholder="Frontend, Backend, Database"
                          />
                        </div>
                        <div>
                          <Label htmlFor="skill-description">Description</Label>
                          <Textarea
                            id="skill-description"
                            value={newSkill.description}
                            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleCreateSkill} className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          Save Skill
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{skill.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{skill.category}</Badge>
                            <Badge>{skill.level}</Badge>
                          </div>
                          <p className="text-gray-600 mt-2">{skill.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSkill(skill)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSkill(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Dashboard

