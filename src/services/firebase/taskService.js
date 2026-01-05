import { database } from "./firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

/* ===================== STAGES ===================== */

const stagesCollection = collection(database, "stages");

export const addStageToDb = async (stageName) => {
  return await addDoc(stagesCollection, {
    name: stageName,
    createdAt: serverTimestamp(),
    order: Date.now(),
  });
};

export const syncStages = (callback) => {
  const q = query(stagesCollection, orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const stages = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(stages);
  });
};

export const deleteStageFromDb = async (stageName) => {
  const q = query(stagesCollection, where("name", "==", stageName));
  const snapshot = await getDocs(q);
  const deletes = snapshot.docs.map((d) => deleteDoc(d.ref));
  return Promise.all(deletes);
};

/* ===================== TASKS ===================== */

const tasksCollection = collection(database, "tasks");

export const addTask = async (userId, taskData) => {
  if (!userId) throw new Error("addTask: Missing userId");

  return await addDoc(tasksCollection, {
    ...taskData,
    userId,
    createdAt: serverTimestamp(),
  });
};

export const syncTasks = (userId, callback) => {
  if (!userId) return () => {};

  const q = query(
    tasksCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(tasks);
  });
};

export const updateTask = async (userId, taskId, data) => {
  if (!taskId) throw new Error("updateTask: Missing taskId");
  const ref = doc(database, "tasks", taskId);
  return await updateDoc(ref, data);
};

export const deleteTask = async (userId, taskId) => {
  if (!taskId) throw new Error("deleteTask: Missing taskId");
  const ref = doc(database, "tasks", taskId);
  return await deleteDoc(ref);
};
