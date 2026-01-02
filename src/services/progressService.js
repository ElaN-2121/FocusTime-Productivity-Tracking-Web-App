// src/services/progressService.js
import { database } from "./firebase/firebaseConfig"; //
import { doc, onSnapshot } from "firebase/firestore";

/**
 * Syncs user-specific progress data from Firestore in real-time.
 * @param {string} userId - The UID of the logged-in user.
 * @param {function} callback - Function to handle the retrieved data.
 */
export const syncUserProgress = (userId, callback) => {
  if (!userId) {
    console.error("No userId provided to syncUserProgress");
    return null;
  }

  // Reference to the specific stats document for this user
  const progressRef = doc(database, "userStats", userId);

  // Set up real-time listener
  return onSnapshot(progressRef, (snapshot) => {
    if (snapshot.exists()) {
      callback({ id: snapshot.id, ...snapshot.data() });
    } else {
      console.warn("No progress document found for this user.");
      callback(null);
    }
  }, (error) => {
    console.error("Error syncing user progress:", error);
  });
};