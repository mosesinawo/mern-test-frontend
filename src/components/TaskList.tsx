import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = () => {
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm />

      <div className="--flex-between --pb">
        <p>
          <b>Total Task:</b> 5
        </p>
        <p>
          <b>Completed Task:</b> 8
        </p>
      </div>

      <hr />

      <Task task="Task 1" />
      <Task task="Task 2" />
      <Task task="Task 3" />
      <Task task="Task 4" />
      <Task task="Task 5" />
    </div>
  );
};

export default TaskList;
