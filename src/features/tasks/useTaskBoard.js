//Main Taskboard logic and state management, contains add, move, delete and edit features
import { useState, useEffect } from "react";
import { createTask } from "./TaskModel";
import {
  getTasks,
  addTask as saveTask,
  updateTask,
  deleteTask as removeTask,
  getStages,
  saveStages,
} from "./taskService";

export function useTaskBoard() {
  const [tasks, setTasks] = useState([]); // A list of tasks
  const [stages, setStages] = useState(() => {
    const saved = localStorage.getItem("my_task_board_stages"); // Use the key from taskService
    return saved ? JSON.parse(saved) : ["To-Do", "In Progress", "Done"];
  });
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [storedTasks, storedStages] = await Promise.all([
          getTasks(),
          getStages(),
        ]);
        setTasks(storedTasks);
        // Sync stages just in case localStorage changed elsewhere
        if (storedStages && storedStages.length > 0) {
          setStages(storedStages);
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }
    loadInitialData();
  }, []);

  const addStage = async (stageName) => {
    if (!stages.includes(stageName)) {
      const newStages = [...stages, stageName];
      setStages(newStages);
      await saveStages(newStages);
    }
  };

  const removeStage = async (stageName) => {
    const protectedStages = ["To-Do", "In Progress", "Done"];

    // If the stage is protected, exit the function immediately
    if (protectedStages.includes(stageName)) {
      alert("This is a core column and cannot be deleted.");
      return;
    }

    // Otherwise, proceed with deletion as normal
    const newStages = stages.filter((s) => s !== stageName);
    setStages(newStages);
    await saveStages(newStages);
  };
  async function addTask(taskData) {
    try {
      const newTask = createTask(taskData);
      const savedTask = await saveTask(newTask);
      setTasks((prev) => [...prev, savedTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  async function editTask(taskId, updateData) {
    await updateTask(taskId, updateData);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updateData } : task
      )
    );
  }
  async function deleteTask(taskId) {
    await removeTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }
  async function moveTask(taskId, newStage) {
    await updateTask(taskId, { status: newStage });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStage } : task
      )
    );
  }

  return {
    //input for TaskBoard.jsx
    tasks,
    stages,
    addTask,
    editTask,
    deleteTask,
    moveTask,
    addStage,
    removeStage,
  };
}
