import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [autherInfo,setAutherInfo] = useState([]);
  
  useEffect( () => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
      }

      const getAutherContactInfo = async () => {
        const res = await fetch('http://localhost:5000/copyrights');
        const contactInfo = await res.json();
        const data = [contactInfo['auther'], contactInfo['website']];
        setAutherInfo(data);
      }

      getAutherContactInfo();
      getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // const

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const task = await res.json();
    return task;
  }

  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers:{
        'content-type':'application/json',
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'});
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder};
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) => task.id === id 
      ? { ...task, reminder: data.reminder } : task 
      )
    )
  }

  const showToggle = () => {
    setShowAddTask(!showAddTask);
  }

  const name = 'Task tracker';

  return (
    <div className="container">
      <Header title={name} onAdd={showToggle} showAddTask={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleReminder}/>:'No Tasks to show'}
      <Footer autherInfo={autherInfo} />
    </div>
  );
}

export default App; 