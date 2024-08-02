import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
import "./task.css"

export interface ITask{
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
 
}

export interface TaskProps{
  task:ITask;
  index: number;
  deleteTask: (taskId: string) => void;
  getSingleTask: (task: ITask) => void;
  setToComplete: (task: ITask) => void;
 
}


export const Task = ({ task, index, deleteTask, getSingleTask, setToComplete }:TaskProps) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {task.title}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setToComplete(task)} />
        <FaEdit color="purple" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};


