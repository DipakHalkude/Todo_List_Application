import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleTask, setEditTaskId }) {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          setEditTaskId={setEditTaskId} // Pass the setEditTaskId function
        />
      ))}
    </div>
  );
}
