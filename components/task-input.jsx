"use client"

import { useState } from "react"
import PropTypes from 'prop-types'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { Card } from "@/components/ui/card"

export function TaskInput({ onAddTask }) {
  const [newTask, setNewTask] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      onAddTask(newTask)
      setNewTask("")
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </form>
    </Card>
  )
}

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired
}

