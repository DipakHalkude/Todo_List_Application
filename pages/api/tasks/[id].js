// // import fs from 'fs';
// // import path from 'path';

// // const filePath = path.join(process.cwd(), 'tasks.json');

// // export default function handler(req, res) {
// //   const { id } = req.query;

// //   if (req.method === 'GET') {
// //     const data = fs.readFileSync(filePath, 'utf8');
// //     const tasks = JSON.parse(data);
// //     const task = tasks.find(task => task.id === parseInt(id, 10));

// //     if (task) {
// //       res.status(200).json(task);
// //     } else {
// //       res.status(404).json({ error: 'Task not found' });
// //     }
// //   } else if (req.method === 'PUT') {
// //     const data = fs.readFileSync(filePath, 'utf8');
// //     const tasks = JSON.parse(data);
// //     const taskIndex = tasks.findIndex(task => task.id === parseInt(id, 10));

// //     if (taskIndex === -1) {
// //       return res.status(404).json({ error: 'Task not found' });
// //     }

// //     tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
// //     fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

// //     res.status(200).json(tasks[taskIndex]);
// //   } else {
// //     res.setHeader('Allow', ['GET', 'PUT']);
// //     res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }
// // }


// import fs from 'fs';
// import path from 'path';
// import { tasks as sampleTasks } from '../../../data'; // Import sample data

// const filePath = path.join(process.cwd(), 'tasks.json');

// function readTasks() {
//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     const tasks = JSON.parse(data);
//     return tasks.length ? tasks : sampleTasks;
//   } catch (error) {
//     return sampleTasks; // Return sample tasks if file reading fails
//   }
// }

// export default function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === 'GET') {
//     const tasks = readTasks();
//     const task = tasks.find(task => task.id === parseInt(id, 10));

//     if (task) {
//       res.status(200).json(task);
//     } else {
//       res.status(404).json({ error: 'Task not found' });
//     }
//   } else if (req.method === 'PUT') {
//     const tasks = readTasks();
//     const taskIndex = tasks.findIndex(task => task.id === parseInt(id, 10));

//     if (taskIndex === -1) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
//     fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

//     res.status(200).json(tasks[taskIndex]);
//   } else {
//     res.setHeader('Allow', ['GET', 'PUT']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


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
  const { id } = req.query; // Extract task ID from query parameters

  if (req.method === 'GET') {
    // Handle GET request to fetch a specific task
    const tasks = readTasks(); // Read tasks from file or sample data
    const task = tasks.find(task => task.id === parseInt(id, 10)); // Find task by ID

    if (task) {
      res.status(200).json(task); // Send task data as JSON
    } else {
      res.status(404).json({ error: 'Task not found' }); // Task not found
    }
  } else if (req.method === 'PUT') {
    // Handle PUT request to update a specific task
    const tasks = readTasks(); // Read tasks from file or sample data
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id, 10)); // Find index of task

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' }); // Task not found
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body }; // Update task with new data
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2)); // Save updated tasks to file

    res.status(200).json(tasks[taskIndex]); // Send updated task data as JSON
  } else {
    res.setHeader('Allow', ['GET', 'PUT']); // Allow only GET and PUT methods
    res.status(405).end(`Method ${req.method} Not Allowed`); // Method not allowed
  }
}
