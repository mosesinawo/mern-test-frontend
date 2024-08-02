import { configureStore } from '@reduxjs/toolkit'
import tastReducer from "./features/tasks/taskSlice"

export const store = configureStore({
  reducer: {
    tasks:tastReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch