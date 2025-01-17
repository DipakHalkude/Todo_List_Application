// pages/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import styles from '../styles/Home.module.css';

// Fetch data on the server side
export async function getServerSideProps({ query }) {
  // Fetch tasks from the API
  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();
  // Extract search query from URL
  const searchQuery = query.q || '';
  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    props: {
      initialTasks: filteredTasks,
      searchQuery
    }
  };
}

// Main component for the home page
export default function Home({ initialTasks, searchQuery }) {
  const [tasks, setTasks] = useState(initialTasks); // State to manage tasks
  const [search, setSearch] = useState(searchQuery); // State to manage search query
  const [editTaskId, setEditTaskId] = useState(null); // State to manage task being edited
  const router = useRouter(); // Hook to manage URL routing

  // Function to add a new task
  const addTask = async (task) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  // Function to edit an existing task
  const editTask = async (id, updatedTask) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks(tasks.map(task => (task.id === id ? updated : task)));
      setEditTaskId(null);
    }
  };

  // Function to toggle task completion status
  const toggleTask = async (id, updatedTask) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });
    if (res.ok) {
      const updatedTasks = tasks.map(task => (task.id === id ? updatedTask : task));
      setTasks(updatedTasks);
    }
  };

  // Function to handle search input changes
  const handleSearch = (event) => {
    setSearch(event.target.value);
    router.push(`/?q=${event.target.value}`, undefined, { shallow: true });
  };

  // Fetch tasks based on search query
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`/api/tasks?q=${search}`);
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, [search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Todo List</h1>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
          className={styles.search}
        />
        <TaskForm
          addTask={addTask}
          editTask={editTask}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          setEditTaskId={setEditTaskId}
        />
      </main>
    </div>
  );
}
