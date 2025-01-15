"use client"

import { useState } from "react"
import PropTypes from 'prop-types'
import { Pencil, Trash2, X, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  const startEditing = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id) => {
    onEditTask(id, editText)
    setEditingId(null)
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center gap-2 p-2 rounded-lg border ${
            task.completed ? "bg-muted" : "bg-card"
          }`}
        >
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleTask(task.id)}
          />
          {editingId === task.id ? (
            <div className="flex-1 flex gap-2">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1"
              />
              <Button size="icon" variant="ghost" onClick={() => saveEdit(task.id)}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.text}
              </span>
              <Button size="icon" variant="ghost" onClick={() => startEditing(task)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDeleteTask(task.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired
}

