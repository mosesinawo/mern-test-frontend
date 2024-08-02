import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/TaskList";
import { store } from './state/store';

export const URL = import.meta.env.VITE_BASE_URL

function App() {
  return (
    <Provider store={store}>

    <div className="app">
      <div className="task-container">
        <TaskList /> 
      </div>
      <ToastContainer />
    </div>
    </Provider>
  );
}

export default App;
