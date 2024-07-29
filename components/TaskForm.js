// components/TaskForm.js
import { useState, useEffect } from 'react';
import styles from '../styles/TaskForm.module.css';

export default function TaskForm({ addTask, editTask, editTaskId, setEditTaskId }) {
  // State to manage form inputs and editing mode
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch the task details if an edit is being performed
  useEffect(() => {
    if (editTaskId !== null) {
      const fetchTask = async () => {
        try {
          const res = await fetch(`/api/tasks/${editTaskId}`);
          if (!res.ok) throw new Error('Task not found');
          const task = await res.json();
          setTitle(task.title);
          setDescription(task.description);
          setIsEditing(true);
        } catch (error) {
          console.error('Failed to fetch task:', error);
        }
      };

      fetchTask();
    } else {
      // Reset form for adding a new task
      setTitle('');
      setDescription('');
      setIsEditing(false);
    }
  }, [editTaskId]);

  // Handle form submission for adding or updating tasks
  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, completed: false, lastUpdated: new Date() };
    
    try {
      if (isEditing) {
        // Update existing task
        await editTask(editTaskId, task);
        setEditTaskId(null); // Clear edit task ID after submission
      } else {
        // Add new task
        await addTask({ ...task, id: Date.now() });
      }
      // Clear form fields after submission
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to submit task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
        required
      />
      <button type="submit" className={styles.button}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
