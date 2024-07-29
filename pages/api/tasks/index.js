import fs from 'fs';
import path from 'path';
import { tasks as sampleTasks } from '../../../data'; // Import sample data

const filePath = path.join(process.cwd(), 'tasks.json');

// Function to read tasks from the JSON file or return sample tasks if file reading fails
function readTasks() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const tasks = JSON.parse(data);
    return tasks.length ? tasks : sampleTasks; // Return tasks from file or sample data
  } catch (error) {
    return sampleTasks; // Return sample tasks if file reading fails
  }
}

// API handler function
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request to fetch tasks
    const tasks = readTasks();
    const { q } = req.query; // Extract search query from request query parameters

    if (q) {
      // Filter tasks based on the search query
      const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(q.toLowerCase())
      );
      return res.status(200).json(filteredTasks); // Send filtered tasks as JSON
    }

    // If no query, return all tasks
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    // Handle POST request to add a new task
    const tasks = readTasks();
    const newTask = req.body; // Extract new task data from request body

    tasks.push(newTask); // Add new task to the tasks array
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2)); // Save updated tasks to file

    res.status(201).json(newTask); // Send the new task data as JSON
  } else {
    // If method is not GET or POST, respond with method not allowed
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

