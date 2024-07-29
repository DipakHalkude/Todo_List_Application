// components/TaskForm.js
import { useState, useEffect } from 'react';
import styles from '../styles/TaskForm.module.css';

export default function TaskForm({ addTask, editTask, editTaskId, setEditTaskId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editTaskId !== null) {
      // Fetch the task details based on editTaskId
      const fetchTask = async () => {
        const res = await fetch(`/api/tasks/${editTaskId}`);
        const task = await res.json();
        setTitle(task.title);
        setDescription(task.description);
        setIsEditing(true);
      };

      fetchTask();
    } else {
      setTitle('');
      setDescription('');
      setIsEditing(false);
    }
  }, [editTaskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, completed: false, lastUpdated: new Date() };
    if (isEditing) {
      // Edit existing task
      await editTask(editTaskId, task);
      setEditTaskId(null); // Clear edit task ID after submission
    } else {
      // Add new task
      await addTask({ ...task, id: Date.now() });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
