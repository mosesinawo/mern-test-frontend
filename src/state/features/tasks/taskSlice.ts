import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskState {
  tasks: ITask[];
}

const initialState: TaskState = {
  tasks: []
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const { id, title, completed } = action.payload;
      const existingTask = state.tasks.find(task => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.completed = completed;
      }
    },
    getAllTask: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    }
  },
})


export const { addTask, removeTask, updateTask, getAllTask } = taskSlice.actions

export default taskSlice.reducer
