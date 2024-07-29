// components/TaskItem.js
import { useState } from 'react';
import styles from '../styles/TaskItem.module.css';

export default function TaskItem({ task, toggleTask, setEditTaskId }) {
  // State to manage the expanded/collapsed state of the task details
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  return (
    <div className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.checkboxLabel}>
        {/* Checkbox to show if the task is completed */}
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={task.completed}
          readOnly
        />
        <h2>{task.title || 'No Title'}</h2>
      </div>
      {/* Button to toggle the display of additional task details */}
      <button className={styles.button} onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
      {isExpanded && (
        <div className={styles.details}>
          <p>{task.description || 'No Description'}</p>
          <p>Last updated: {formatDate(task.lastUpdated)}</p>
        </div>
      )}
      <div className={styles.buttonContainer}>
        {/* Button to toggle the task's completion status */}
        <button
          className={styles.button}
          onClick={() => toggleTask(task.id, { ...task, completed: !task.completed })}
        >
          {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
        </button>
        {/* Button to set the task for editing */}
        <button
          className={styles.button}
          onClick={() => setEditTaskId(task.id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}



