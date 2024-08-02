import { FormEvent, useEffect, useState } from "react";
import TaskForm from "./TaskForm";

import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loader from "../assets/loader.gif";

import { Task } from "../stories/Task";
import { useDispatch } from "react-redux";
import { addTask, getAllTask,  } from "../state/features/tasks/taskSlice";
//http://localhost:5000/api/tasks

interface ITask {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [filterTask, setFilterTask] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    completed: false,
  });

  const { title } = formData;
  const dispatch =useDispatch()

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks?completed=${filterTask}`);
      setTasks(data);
      dispatch(getAllTask(data))
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, [filterTask]);

  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (title === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      const res = await axios.post(`${URL}/api/tasks`, formData);
      setFormData({ ...formData, title: "" });
      dispatch(addTask({
        id: res.data._id,
        title: res.data.title,
        completed: res.data.completed,
        
      }))
      getTasks();
      
      toast.success("Task added sucessfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
  
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
  
    }
  };
  useEffect(() => {
    const cTask = tasks.filter((task:ITask) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);

  const getSingleTask = async (task: ITask) => {
    setFormData({
      title: task.title,
      completed: false,
    });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e: FormEvent) => {
    e.preventDefault();
    if (title === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      console.log(taskID);
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, title: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
          if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred.');
    }

    }
  };

  const setToComplete = async (task: ITask) => {
    const newFormData = {
      title: task.title,
      completed: true,
    };
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
          if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred.');
    }

    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        title={title}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--my2">
        <select name="" id="" className="task-select" onChange={(e) => setFilterTask(e.target.value)}>
          <option value="">All Tasks</option>
          <option value="true">Completed Tasks</option>
          <option value="false">Uncompleted Tasks</option>
        </select>
      </div>
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Task:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Task:</b> {completedTasks.length}
          </p>
        </div>
      )}
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loader} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task: ITask, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
     
    </div>
  );
};

export default TaskList;
