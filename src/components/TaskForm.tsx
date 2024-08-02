import { FormEvent } from "react";
import { Button } from "../stories/Button";


interface TaskFormProps{
    title: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createTask: (e: FormEvent) => void;
    isEditing: boolean;
    updateTask: (e: FormEvent) => void;
}

const TaskForm = ({createTask, title, handleInputChange,
    isEditing, updateTask}:TaskFormProps) => {
    return (
        <form className="task-form " onSubmit={isEditing ? updateTask : createTask}>
            <input type="text" placeholder="Add a Task"
                name="title" value={title} 
                onChange={handleInputChange} 
            />
            <Button type="submit"  label={isEditing? "Edit" : "Add"}/>
        </form>
    )
}

export default TaskForm