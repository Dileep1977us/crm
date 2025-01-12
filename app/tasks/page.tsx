"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, CheckCircle2, Clock, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "completed"
  dueDate: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Follow up with John Doe",
      description: "Discuss project proposal",
      status: "pending",
      dueDate: "2024-01-20",
    },
    {
      id: "2",
      title: "Send proposal to Jane Smith",
      description: "Prepare and send project quotation",
      status: "completed",
      dueDate: "2024-01-15",
    },
  ])

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "pending",
    dueDate: new Date().toISOString().split("T")[0],
  })

  const handleAddTask = () => {
    setIsAddingTask(true)
  }

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: Math.random().toString(36).substr(2, 9),
      },
    ])
    setIsAddingTask(false)
    setNewTask({
      title: "",
      description: "",
      status: "pending",
      dueDate: new Date().toISOString().split("T")[0],
    })
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onClick={handleAddTask}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{task.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Due: {task.dueDate}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleTaskStatus(task.id)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTaskSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </label>
              <Input
                id="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select
                value={newTask.status}
                onValueChange={(value: "pending" | "completed") =>
                  setNewTask({ ...newTask, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingTask(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}