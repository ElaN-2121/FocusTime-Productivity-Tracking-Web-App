const STORAGE_KEY = "my_task_board_data";
const STAGES_KEY = "my_task_board_stages"

const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error reading localStorage", e);
    return [];
  }
};

//Initializing mockTasks from localStorage
let mockTasks = getStoredTasks();
//Saving data to local storage
const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));
  } catch (e) {
    console.error("Error while writing to localStoage", e);
  }
};

//-------------Service Functions------------------------
export async function getTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockTasks]);
    }, 300);
  });
}

export async function addTask(task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTasks.push(task);
      saveToStorage();
      resolve(task);
    }, 300);
  });
}

export async function updateTask(taskId, updateData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTasks.findIndex((t) => t.id === taskId);
      if (index === -1) {
        reject(new Error("Task not found"));
        return;
      }
      mockTasks[index] = { ...mockTasks[index], ...updateData };
      saveToStorage();
      resolve(mockTasks[index]);
    }, 300);
  });
}

export async function deleteTask(taskId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTasks = mockTasks.filter((task) => task.id !== taskId);
      saveToStorage();
      resolve();
    }, 300);
  });
}
export async function getStages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(STAGES_KEY);
      // Default stages if none are saved
      const defaultStages = ["To-Do", "In Progress", "Done"];
      resolve(stored ? JSON.parse(stored) : defaultStages);
    }, 200);
  });
}

export async function saveStages(stages) {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(STAGES_KEY, JSON.stringify(stages));
      resolve(stages);
    }, 200);
  });
}
