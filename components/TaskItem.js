import { useState } from 'react';
import styles from '../styles/TaskItem.module.css';

export default function TaskItem({ task, toggleTask, setEditTaskId }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  return (
    <div className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.checkboxLabel}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={task.completed}
          readOnly
        />
        <h2>{task.title || 'No Title'}</h2>
      </div>
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
        <button
          className={styles.button}
          onClick={() => toggleTask(task.id, { ...task, completed: !task.completed })}
        >
          {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
        </button>
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









