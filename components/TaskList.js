// import TaskItem from './TaskItem';

// export default function TaskList({ tasks, toggleTask, setEditTaskId }) {
//   return (
//     <div>
//       {tasks.map(task => (
//         <TaskItem
//           key={task.id}
//           task={task}
//           toggleTask={toggleTask}
//           setEditTaskId={setEditTaskId} // Pass the setEditTaskId function
//         />
//       ))}
//     </div>
//   );
// }


// components/TaskList.js
import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleTask, setEditTaskId }) {
  return (
    <div>
      {/* Map through the list of tasks and render a TaskItem for each */}
      {tasks.map(task => (
        <TaskItem
          key={task.id} // Unique key for each TaskItem component to help React identify which items have changed
          task={task} // Pass the current task object to the TaskItem component
          toggleTask={toggleTask} // Pass the function to toggle the task's completion status
          setEditTaskId={setEditTaskId} // Pass the function to set the task ID for editing
        />
      ))}
    </div>
  );
}
