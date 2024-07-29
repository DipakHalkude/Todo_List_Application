// import fs from 'fs';
// import path from 'path';

// const filePath = path.join(process.cwd(), 'tasks.json');

// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     const data = fs.readFileSync(filePath, 'utf8');
//     const tasks = JSON.parse(data);

//     const { q } = req.query;
//     if (q) {
//       const filteredTasks = tasks.filter(task =>
//         task.title.toLowerCase().includes(q.toLowerCase())
//       );
//       return res.status(200).json(filteredTasks);
//     }
//     res.status(200).json(tasks);
//   } else if (req.method === 'POST') {
//     const data = fs.readFileSync(filePath, 'utf8');
//     const tasks = JSON.parse(data);
//     const newTask = req.body;
//     tasks.push(newTask);
//     fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
//     res.status(201).json(newTask);
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import fs from 'fs';
import path from 'path';
import { tasks as sampleTasks } from '../../../data'; // Import sample data

const filePath = path.join(process.cwd(), 'tasks.json');

function readTasks() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const tasks = JSON.parse(data);
    return tasks.length ? tasks : sampleTasks;
  } catch (error) {
    return sampleTasks; // Return sample tasks if file reading fails
  }
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const tasks = readTasks();
    const { q } = req.query;
    if (q) {
      const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(q.toLowerCase())
      );
      return res.status(200).json(filteredTasks);
    }
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const tasks = readTasks();
    const newTask = req.body;
    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

