"use client";

import { useState } from "react";
import { TaskInput } from "@/components/task-input";
import { TaskList } from "@/components/task-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="h-screen bg">
      <div className="container max-w-2xl mx-auto p-4 space-y-4">
        <h1 className="text-3xl font-bold text-center mb-8">Prioritask</h1>

        <TaskInput onAddTask={addTask} />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedTasks.length})
            </TabsTrigger>
            <TabsTrigger value="incomplete">
              Incomplete ({incompleteTasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <TaskList
              tasks={completedTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          </TabsContent>

          <TabsContent value="incomplete" className="mt-4">
            <TaskList
              tasks={incompleteTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          </TabsContent>
        </Tabs>

        {tasks.length > 0 && (
          <div className="flex justify-center">
            <Button variant="destructive" onClick={clearAllTasks}>
              Clear All Tasks
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
