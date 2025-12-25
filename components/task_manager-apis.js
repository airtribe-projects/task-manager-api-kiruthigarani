const tasks = require("../task.json");
const fs = require("fs");
const allTasks = (req, res) => {
  return res.json(tasks);
};

const taskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    return res.json(task);
  } else {
    return res.json({ message: "Task not found" });
  }
};

const createTask = (req, res) => {
  // Logic to create a new task
  const newTask = req.body;
  console.log("New Task Data:", typeof newTask.completed);
  if (
    !newTask.id ||
    !newTask.title ||
    !newTask.description ||
    typeof newTask.completed !== "boolean"
  ) {
    return res.status(400).json({
      message:
        "Title and Description are required, Completed should be boolean",
    });
  } else {
    tasks.push(newTask);
    //how to add the new task into file aswell
    try {
      return res.json({ message: "Task created successfully", newTask });
    } catch (error) {
      console.error("Error ", error);
    }
  }
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const params = req.body;
  console.log("Update Task Data:", typeof params.completed);
  if (
    !params.id ||
    !params.title ||
    !params.description ||
    typeof params.completed !== "boolean"
  ) {
    return res.status(400).json({
      message:
        "Title and Description are required, Completed should be boolean",
    });
  } else {
    const task = tasks.find((t) => t.id === id);

    if (task) {
      const index = tasks.findIndex((t) => t.id === id);
      tasks[index] = { ...tasks[index], ...params };
      // console.log("Updated Task:", tasks[index], tasks);
      return res.json({ message: "Task updated successfully", tasks });
    } else {
      return res.json({ message: "Task not found" });
    }
  }
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (task) {
    const index = tasks.findIndex((t) => t.id === id);
    tasks.splice(index, 1);
    return res.json({ message: "Task deleted successfully", tasks });
  } else {
    return res.json({ message: "Task not found" });
  }
};

const filterTasks = (req, res) => {
  if (req.query.completed !== "true" && req.query.completed !== "false") {
  
    return res.json({ message: "completed query param is required and should be true or false" });
  }

  const completed_status = req.query.completed === "true" ? true : false;
  const filteredTasks = tasks.filter((t) => t.completed === completed_status);
  if (filteredTasks.length === 0) {
    return res.json({ message: "No tasks found" });
  } else {
    return res.json(filteredTasks);
  }
};

const taskBasedOnPriority = (req, res) => {
  const priority = req.params.priority;
  const filterTasksBasedOnPriority = tasks.filter(
    (t) => t.priority === priority
  );
  if(filterTasksBasedOnPriority .length ===0){
    return res.json({ message: "No tasks found for the given priority" });
  } else {  
  return res.json(filterTasksBasedOnPriority);
    }
};

module.exports = {
  allTasks,
  taskById,
  createTask,
  updateTask,
  deleteTask,
  filterTasks,
  taskBasedOnPriority
};
