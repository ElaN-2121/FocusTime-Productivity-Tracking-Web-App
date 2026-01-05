// Main TaskBoard logic and state management
// Handles add, edit, move, delete tasks and stages

import { useState, useEffect } from "react";
import { createTask } from "./FocusTime-Productivity-Tracking-Web-App/src/features/tasks/TaskModel";
import {
  getTasks,
  addTask as saveTask,
  updateTask,
  deleteTask as removeTask,
  getStages,
  saveStages,
} from "./taskService";

export function useTaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [stages, setStages] = useState([]);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [storedTasks, storedStages] = await Promise.all([
          getTasks(),
          getStages(),
        ]);

        setTasks(Array.isArray(storedTasks) ? storedTasks : []);

        if (Array.isArray(storedStages) && storedStages.length > 0) {
          setStages(storedStages);
        } else {
          const defaultStages = ["To-Do", "In Progress", "Done"];
          setStages(defaultStages);
          await saveStages(defaultStages);
        }
      } catch (error) {
        console.error("Failed to load task board data:", error);
      }
    }

    loadInitialData();
  }, []);

  // ------------------ STAGES ------------------

  const addStage = async (stageName) => {
    if (!stageName || stages.includes(stageName)) return;

    try {
      const newStages = [...stages, stageName];
      setStages(newStages);
      await saveStages(newStages);
    } catch (error) {
      console.error("Failed to add stage:", error);
    }
  };

  const removeStage = async (stageName) => {
    const protectedStages = ["To-Do", "In Progress", "Done"];

    if (protectedStages.includes(stageName)) {
      alert("This is a core column and cannot be deleted.");
      return;
    }

    try {
      // Move tasks in deleted stage back to "To-Do"
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.status === stageName
            ? { ...task, status: "To-Do" }
            : task
        )
      );

      const newStages = stages.filter((stage) => stage !== stageName);
      setStages(newStages);
      await saveStages(newStages);
    } catch (error) {
      console.error("Failed to remove stage:", error);
    }
  };

  // ------------------ TASKS ------------------

  const addTask = async (taskData) => {
    try {
      const newTask = createTask(taskData);
      const savedTask = await saveTask(newTask);
      setTasks((prev) => [...prev, savedTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const editTask = async (taskId, updateData) => {
    try {
      await updateTask(taskId, updateData);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...updateData } : task
        )
      );
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await removeTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const moveTask = async (taskId, newStage) => {
    try {
      await updateTask(taskId, { status: newStage });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStage } : task
        )
      );
    } catch (error) {
      console.error("Failed to move task:", error);
    }
  };

  // ------------------ PUBLIC API ------------------

  return {
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
