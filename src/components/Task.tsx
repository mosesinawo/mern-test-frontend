import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

interface TaskProps {
  task: string;
}

const Task = ({ task }: TaskProps) => {
  return (
    <div className={"task"}>
      <p>
       
       {task}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" />
        <FaEdit color="purple" />
        <FaRegTrashAlt color="red" />
      </div>
    </div>
  );
};

export default Task;
