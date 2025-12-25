export function createTask({
  title,
  description = "",
  status = "To-Do",
  type = "task",
  course = "",
  dueDate = "",
  goal = "",
}) {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).substr(2);

  return {
    id,
    title,
    description,
    status,
    type,
    course,
    dueDate,
    goal,
    createdAt: Date.now(),
  };
}
